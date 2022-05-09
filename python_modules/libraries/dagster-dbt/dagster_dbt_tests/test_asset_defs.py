import json
from unittest.mock import MagicMock

import pytest
import psycopg2
from dagster_dbt import dbt_cli_resource
from dagster_dbt.asset_defs import load_assets_from_dbt_manifest, load_assets_from_dbt_project
from dagster_dbt.errors import DagsterDbtCliFatalRuntimeError
from dagster_dbt.types import DbtOutput

from dagster import (
    AssetGroup,
    AssetKey,
    MetadataEntry,
    ResourceDefinition,
    asset,
    repository,
    io_manager,
    IOManager,
)
from dagster.core.asset_defs import build_assets_job
from dagster.utils import file_relative_path


def test_load_from_manifest_json():
    manifest_path = file_relative_path(__file__, "sample_manifest.json")
    with open(manifest_path, "r", encoding="utf8") as f:
        manifest_json = json.load(f)

    run_results_path = file_relative_path(__file__, "sample_run_results.json")
    with open(run_results_path, "r", encoding="utf8") as f:
        run_results_json = json.load(f)

    dbt_assets = load_assets_from_dbt_manifest(manifest_json=manifest_json)
    assert_assets_match_project(dbt_assets)

    dbt = MagicMock()
    dbt.run.return_value = DbtOutput(run_results_json)
    assets_job = build_assets_job(
        "assets_job",
        dbt_assets,
        resource_defs={"dbt": ResourceDefinition.hardcoded_resource(dbt)},
    )
    assert assets_job.execute_in_process().success


def test_runtime_metadata_fn():
    manifest_path = file_relative_path(__file__, "sample_manifest.json")
    with open(manifest_path, "r", encoding="utf8") as f:
        manifest_json = json.load(f)

    run_results_path = file_relative_path(__file__, "sample_run_results.json")
    with open(run_results_path, "r", encoding="utf8") as f:
        run_results_json = json.load(f)

    def runtime_metadata_fn(context, node_info):
        return {"op_name": context.solid_def.name, "dbt_model": node_info["name"]}

    dbt_assets = load_assets_from_dbt_manifest(
        manifest_json=manifest_json, runtime_metadata_fn=runtime_metadata_fn
    )
    assert_assets_match_project(dbt_assets)

    dbt = MagicMock()
    dbt.run.return_value = DbtOutput(run_results_json)
    assets_job = build_assets_job(
        "assets_job",
        dbt_assets,
        resource_defs={"dbt": ResourceDefinition.hardcoded_resource(dbt)},
    )
    result = assets_job.execute_in_process()
    assert result.success

    materializations = [
        event.event_specific_data.materialization
        for event in result.events_for_node(dbt_assets[0].op.name)
        if event.event_type_value == "ASSET_MATERIALIZATION"
    ]
    assert len(materializations) == 4
    assert materializations[0].metadata_entries == [
        MetadataEntry("op_name", value=dbt_assets[0].op.name),
        MetadataEntry("dbt_model", value=materializations[0].asset_key.path[-1]),
    ]


def assert_assets_match_project(dbt_assets):
    assert len(dbt_assets) == 1
    assets_op = dbt_assets[0].op
    assert assets_op.tags == {"kind": "dbt"}
    assert len(assets_op.input_defs) == 0
    assert set(assets_op.output_dict.keys()) == {
        "sort_by_calories",
        "least_caloric",
        "sort_hot_cereals_by_calories",
        "sort_cold_cereals_by_calories",
    }
    for model_name in [
        "least_caloric",
        "sort_hot_cereals_by_calories",
        "sort_cold_cereals_by_calories",
    ]:
        assert dbt_assets[0].asset_keys_by_output_name[model_name] == AssetKey(
            ["test-schema", model_name]
        )
        assert dbt_assets[0].asset_deps[AssetKey(["test-schema", model_name])] == {
            AssetKey(["test-schema", "sort_by_calories"])
        }

    assert dbt_assets[0].asset_keys_by_output_name["sort_by_calories"] == AssetKey(
        ["test-schema", "sort_by_calories"]
    )
    assert not dbt_assets[0].asset_deps[AssetKey(["test-schema", "sort_by_calories"])]


def test_basic(
    dbt_seed, conn_string, test_project_dir, dbt_config_dir
):  # pylint: disable=unused-argument

    dbt_assets = load_assets_from_dbt_project(test_project_dir, dbt_config_dir)

    assert dbt_assets[0].op.name == "run_dbt_dagster_dbt_test_project"

    result = build_assets_job(
        "test_job",
        dbt_assets,
        resource_defs={
            "dbt": dbt_cli_resource.configured(
                {"project_dir": test_project_dir, "profiles_dir": dbt_config_dir}
            )
        },
    ).execute_in_process()

    assert result.success
    materializations = [
        event.event_specific_data.materialization
        for event in result.events_for_node(dbt_assets[0].op.name)
        if event.event_type_value == "ASSET_MATERIALIZATION"
    ]
    assert len(materializations) == 4


def test_select_from_project(
    dbt_seed, conn_string, test_project_dir, dbt_config_dir
):  # pylint: disable=unused-argument

    dbt_assets = load_assets_from_dbt_project(
        test_project_dir, dbt_config_dir, select="sort_by_calories subdir.least_caloric"
    )

    assert dbt_assets[0].op.name == "run_dbt_dagster_dbt_test_project_e4753"

    result = build_assets_job(
        "test_job",
        dbt_assets,
        resource_defs={
            "dbt": dbt_cli_resource.configured(
                {"project_dir": test_project_dir, "profiles_dir": dbt_config_dir}
            )
        },
    ).execute_in_process()

    assert result.success
    materializations = [
        event.event_specific_data.materialization
        for event in result.events_for_node(dbt_assets[0].op.name)
        if event.event_type_value == "ASSET_MATERIALIZATION"
    ]
    assert len(materializations) == 2


def test_multiple_select_from_project(
    dbt_seed, conn_string, test_project_dir, dbt_config_dir
):  # pylint: disable=unused-argument

    dbt_assets_a = load_assets_from_dbt_project(
        test_project_dir, dbt_config_dir, select="sort_by_calories subdir.least_caloric"
    )

    dbt_assets_b = load_assets_from_dbt_project(
        test_project_dir, dbt_config_dir, select="sort_by_calories"
    )

    @repository
    def foo():
        return [
            AssetGroup(dbt_assets_a, resource_defs={"dbt": dbt_cli_resource}).build_job("a"),
            AssetGroup(dbt_assets_b, resource_defs={"dbt": dbt_cli_resource}).build_job("b"),
        ]

    assert len(foo.get_all_jobs()) == 2


def test_dbt_ls_fail_fast():
    with pytest.raises(DagsterDbtCliFatalRuntimeError):
        load_assets_from_dbt_project("bad_project_dir", "bad_config_dir")


def test_select_from_manifest(
    dbt_seed, conn_string, test_project_dir, dbt_config_dir
):  # pylint: disable=unused-argument

    manifest_path = file_relative_path(__file__, "sample_manifest.json")
    with open(manifest_path, "r", encoding="utf8") as f:
        manifest_json = json.load(f)
    dbt_assets = load_assets_from_dbt_manifest(
        manifest_json,
        selected_unique_ids={
            "model.dagster_dbt_test_project.sort_by_calories",
            "model.dagster_dbt_test_project.least_caloric",
        },
    )

    result = build_assets_job(
        "test_job",
        dbt_assets,
        resource_defs={
            "dbt": dbt_cli_resource.configured(
                {"project_dir": test_project_dir, "profiles_dir": dbt_config_dir}
            )
        },
    ).execute_in_process()

    assert result.success
    materializations = [
        event.event_specific_data.materialization
        for event in result.events_for_node(dbt_assets[0].op.name)
        if event.event_type_value == "ASSET_MATERIALIZATION"
    ]
    assert len(materializations) == 2


def test_node_info_to_asset_key(
    dbt_seed, conn_string, test_project_dir, dbt_config_dir
):  # pylint: disable=unused-argument
    dbt_assets = load_assets_from_dbt_project(
        test_project_dir,
        dbt_config_dir,
        node_info_to_asset_key=lambda node_info: AssetKey(["foo", node_info["name"]]),
    )

    result = build_assets_job(
        "test_job",
        dbt_assets,
        resource_defs={
            "dbt": dbt_cli_resource.configured(
                {"project_dir": test_project_dir, "profiles_dir": dbt_config_dir}
            )
        },
    ).execute_in_process()

    assert result.success
    materializations = [
        event.event_specific_data.materialization
        for event in result.events_for_node(dbt_assets[0].op.name)
        if event.event_type_value == "ASSET_MATERIALIZATION"
    ]
    assert len(materializations) == 4
    assert materializations[0].asset_key == AssetKey(["foo", "sort_by_calories"])


@pytest.mark.parametrize(
    "job_selection,expected_asset_names",
    [
        (
            "*",
            "sort_by_calories,sort_cold_cereals_by_calories,sort_hot_cereals_by_calories,least_caloric,hanger1,hanger2",
        ),
        (
            "test-schema>sort_by_calories+",
            "sort_by_calories,least_caloric,sort_cold_cereals_by_calories,sort_hot_cereals_by_calories,hanger1",
        ),
        ("*test-schema>hanger2", "hanger2,least_caloric,sort_by_calories"),
        (
            ["test-schema>sort_cold_cereals_by_calories", "test-schema>least_caloric"],
            "sort_cold_cereals_by_calories,least_caloric",
        ),
    ],
)
def test_subsetting(
    dbt_build,
    conn_string,
    test_project_dir,
    dbt_config_dir,
    job_selection,
    expected_asset_names,
):  # pylint: disable=unused-argument

    dbt_assets = load_assets_from_dbt_project(test_project_dir, dbt_config_dir)

    @asset(namespace="test-schema")
    def hanger1(sort_by_calories):
        return None

    @asset(namespace="test-schema")
    def hanger2(least_caloric):
        return None

    result = (
        AssetGroup(
            dbt_assets + [hanger1, hanger2],
            resource_defs={
                "dbt": dbt_cli_resource.configured(
                    {"project_dir": test_project_dir, "profiles_dir": dbt_config_dir}
                )
            },
        )
        .build_job(name="dbt_job", selection=job_selection)
        .execute_in_process()
    )

    assert result.success
    all_keys = {
        event.event_specific_data.materialization.asset_key
        for event in result.all_events
        if event.event_type_value == "ASSET_MATERIALIZATION"
    }
    expected_keys = {AssetKey(["test-schema", name]) for name in expected_asset_names.split(",")}
    assert all_keys == expected_keys


def test_python_interleaving(
    conn_string, dbt_python_sources, test_python_project_dir, dbt_python_config_dir
):
    dbt_assets = load_assets_from_dbt_project(test_python_project_dir, dbt_python_config_dir)

    @io_manager
    def test_io_manager(context):
        class TestIOManager(IOManager):
            def handle_output(self, context, obj):
                # handling dbt output
                if obj is None:
                    return
                schema, table = context.asset_key.path
                try:
                    conn = psycopg2.connect(conn_string)
                    cur = conn.cursor()
                    cur.execute(
                        f'CREATE TABLE IF NOT EXISTS "{schema}"."{table}" (user_id integer, is_bot bool)'
                    )
                    cur.executemany(f'INSERT INTO "{schema}"."{table}"' + " VALUES(%s,%s)", obj)
                    conn.commit()
                    cur.close()
                except (Exception, psycopg2.DatabaseError) as error:
                    print(error)
                    raise (error)
                finally:
                    if conn is not None:
                        conn.close()

            def load_input(self, context):
                schema, table = context.asset_key.path
                result = None
                conn = None
                try:
                    conn = psycopg2.connect(conn_string)
                    cur = conn.cursor()
                    cur.execute(f'SELECT * FROM "{schema}"."{table}"')
                    result = cur.fetchall()
                except (Exception, psycopg2.DatabaseError) as error:
                    print(error)
                    raise error
                finally:
                    if conn is not None:
                        conn.close()
                return result

        return TestIOManager()

    @asset(namespace="test-python-schema")
    def bot_labeled_users(cleaned_users):
        # super advanced bot labeling algorithm
        return [(uid, uid % 5 == 0) for _, uid in cleaned_users]

    job = AssetGroup(
        [*dbt_assets, bot_labeled_users],
        resource_defs={
            "io_manager": test_io_manager,
            "dbt": dbt_cli_resource.configured(
                {"project_dir": test_python_project_dir, "profiles_dir": dbt_python_config_dir}
            ),
        },
    ).build_job("interleave_job")

    result = job.execute_in_process()
    assert result.success
    all_keys = {
        event.event_specific_data.materialization.asset_key
        for event in result.all_events
        if event.event_type_value == "ASSET_MATERIALIZATION"
    }
    expected_asset_names = [
        "cleaned_events",
        "cleaned_users",
        "daily_aggregated_events",
        "daily_aggregated_users",
        "bot_labeled_users",
        "bot_labeled_events",
    ]
    expected_keys = {AssetKey(["test-python-schema", name]) for name in expected_asset_names}
    assert all_keys == expected_keys
