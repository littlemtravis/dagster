import re
import warnings

import pytest

from dagster import (
    AssetKey,
    DagsterInvalidDefinitionError,
    DailyPartitionsDefinition,
    HourlyPartitionsDefinition,
    IOManager,
    Out,
    Output,
    ResourceDefinition,
    fs_asset_io_manager,
    graph,
    in_process_executor,
    io_manager,
    mem_io_manager,
    multiprocess_executor,
    repository,
    resource,
)
from dagster.core.asset_defs import AssetGroup, AssetIn, SourceAsset, asset, multi_asset
from dagster.core.errors import DagsterUnmetExecutorRequirementsError


@pytest.fixture(autouse=True)
def check_experimental_warnings():
    with warnings.catch_warnings(record=True) as record:
        yield

        raises_warning = False
        for w in record:
            if "build_assets_job" in w.message.args[0] or "root_input_manager" in w.message.args[0]:
                raises_warning = True
                break

        assert not raises_warning


def test_asset_group_from_list():
    @asset
    def asset_foo():
        return "foo"

    @asset
    def asset_bar():
        return "bar"

    @asset(ins={"asset_bar": AssetIn(asset_key=AssetKey("asset_foo"))})
    def last_asset(asset_bar):
        return asset_bar

    group = AssetGroup(assets=[asset_foo, asset_bar, last_asset])

    @repository
    def the_repo():
        return [group]

    assert len(the_repo.get_all_jobs()) == 1
    asset_group_underlying_job = the_repo.get_all_jobs()[0]
    assert AssetGroup.is_base_job_name(asset_group_underlying_job.name)

    result = asset_group_underlying_job.execute_in_process()
    assert result.success


def test_asset_group_source_asset():
    foo_fa = SourceAsset(key=AssetKey("foo"), io_manager_key="the_manager")

    @asset
    def asset_depends_on_source(foo):
        return foo

    class MyIOManager(IOManager):
        def handle_output(self, context, obj):
            pass

        def load_input(self, context):
            return 5

    @io_manager
    def the_manager():
        return MyIOManager()

    group = AssetGroup(
        assets=[asset_depends_on_source],
        source_assets=[foo_fa],
        resource_defs={"the_manager": the_manager},
    )

    @repository
    def the_repo():
        return [group]

    asset_group_underlying_job = the_repo.get_all_jobs()[0]
    assert AssetGroup.is_base_job_name(asset_group_underlying_job.name)

    result = asset_group_underlying_job.execute_in_process()
    assert result.success


def test_asset_group_with_resources():
    @asset(required_resource_keys={"foo"})
    def asset_foo(context):
        return context.resources.foo

    @resource
    def the_resource():
        return "foo"

    group = AssetGroup([asset_foo], resource_defs={"foo": the_resource})

    @repository
    def the_repo():
        return [group]

    asset_group_underlying_job = the_repo.get_all_jobs()[0]
    assert AssetGroup.is_base_job_name(asset_group_underlying_job.name)

    result = asset_group_underlying_job.execute_in_process()
    assert result.success
    assert result.output_for_node("asset_foo") == "foo"


def test_asset_group_missing_resources():
    @asset(required_resource_keys={"foo"})
    def asset_foo(context):
        return context.resources.foo

    with pytest.raises(
        DagsterInvalidDefinitionError,
        match=r"AssetGroup is missing required resource keys for asset 'asset_foo'. Missing resource keys: \['foo'\]",
    ):
        AssetGroup([asset_foo])

    source_asset_io_req = SourceAsset(key=AssetKey("foo"), io_manager_key="foo")

    with pytest.raises(
        DagsterInvalidDefinitionError,
        match=r"SourceAsset with key AssetKey\(\['foo'\]\) requires io manager with key 'foo', which was not provided on AssetGroup. Provided keys: \['io_manager'\]",
    ):
        AssetGroup([], source_assets=[source_asset_io_req])


def test_asset_group_with_executor():
    @asset
    def the_asset():
        pass

    @repository
    def the_repo():
        return [AssetGroup([the_asset], executor_def=in_process_executor)]

    asset_group_underlying_job = the_repo.get_all_jobs()[0]
    assert (
        asset_group_underlying_job.executor_def  # pylint: disable=comparison-with-callable
        == in_process_executor
    )


def test_asset_group_requires_root_manager():
    @asset(io_manager_key="blah")
    def asset_foo():
        pass

    with pytest.raises(
        DagsterInvalidDefinitionError,
        match=r"Output 'result' with AssetKey 'AssetKey\(\['asset_foo'\]\)' "
        r"requires io manager 'blah' but was not provided on asset group. "
        r"Provided resources: \['io_manager'\]",
    ):
        AssetGroup([asset_foo])


def test_resource_override():
    @resource
    def the_resource():
        pass

    with pytest.raises(
        DagsterInvalidDefinitionError,
        match="Resource dictionary included resource with key 'root_manager', "
        "which is a reserved resource keyword in Dagster. Please change this "
        "key, and then change all places that require this key to a new value.",
    ):
        AssetGroup([], resource_defs={"root_manager": the_resource})

    @repository
    def the_repo():
        return [AssetGroup([], resource_defs={"io_manager": mem_io_manager})]

    asset_group_underlying_job = the_repo.get_all_jobs()[0]
    assert (  # pylint: disable=comparison-with-callable
        asset_group_underlying_job.resource_defs["io_manager"] == mem_io_manager
    )


def asset_aware_io_manager():
    class MyIOManager(IOManager):
        def __init__(self):
            self.db = {}

        def handle_output(self, context, obj):
            self.db[context.asset_key] = obj

        def load_input(self, context):
            return self.db.get(context.asset_key)

    io_manager_obj = MyIOManager()

    @io_manager
    def _asset_aware():
        return io_manager_obj

    return io_manager_obj, _asset_aware


def test_asset_group_build_subset_job():
    @asset
    def start_asset():
        return "foo"

    @multi_asset(outs={"o1": Out(asset_key=AssetKey("o1")), "o2": Out(asset_key=AssetKey("o2"))})
    def middle_asset(start_asset):
        return (start_asset, start_asset)

    @asset
    def follows_o1(o1):
        return o1

    @asset
    def follows_o2(o2):
        return o2

    _, io_manager_def = asset_aware_io_manager()
    group = AssetGroup(
        [start_asset, middle_asset, follows_o1, follows_o2],
        resource_defs={"io_manager": io_manager_def},
    )

    full_job = group.build_job("full", selection="*")

    result = full_job.execute_in_process()

    assert result.success
    assert result.output_for_node("follows_o1") == "foo"
    assert result.output_for_node("follows_o2") == "foo"

    test_single = group.build_job(name="test_single", selection="follows_o2")
    assert len(test_single.all_node_defs) == 1
    assert test_single.all_node_defs[0].name == "follows_o2"

    result = test_single.execute_in_process()
    assert result.success
    assert result.output_for_node("follows_o2") == "foo"

    test_up_star = group.build_job(name="test_up_star", selection="*follows_o2")
    assert len(test_up_star.all_node_defs) == 3
    assert set([node.name for node in test_up_star.all_node_defs]) == {
        "follows_o2",
        "middle_asset",
        "start_asset",
    }

    result = test_up_star.execute_in_process()
    assert result.success
    assert result.output_for_node("middle_asset", "o1") == "foo"
    assert result.output_for_node("follows_o2") == "foo"
    assert result.output_for_node("start_asset") == "foo"

    test_down_star = group.build_job(name="test_down_star", selection="start_asset*")

    assert len(test_down_star.all_node_defs) == 4
    assert set([node.name for node in test_down_star.all_node_defs]) == {
        "follows_o2",
        "middle_asset",
        "start_asset",
        "follows_o1",
    }

    result = test_down_star.execute_in_process()
    assert result.success
    assert result.output_for_node("follows_o2") == "foo"

    test_both_plus = group.build_job(name="test_both_plus", selection=["+o1+", "o2"])

    assert len(test_both_plus.all_node_defs) == 4
    assert set([node.name for node in test_both_plus.all_node_defs]) == {
        "follows_o1",
        "follows_o2",
        "middle_asset",
        "start_asset",
    }

    result = test_both_plus.execute_in_process()
    assert result.success
    assert result.output_for_node("follows_o2") == "foo"

    test_selection_with_overlap = group.build_job(
        name="test_multi_asset_multi_selection", selection=["o1", "o2+"]
    )

    assert len(test_selection_with_overlap.all_node_defs) == 3
    assert set([node.name for node in test_selection_with_overlap.all_node_defs]) == {
        "follows_o1",
        "follows_o2",
        "middle_asset",
    }

    result = test_selection_with_overlap.execute_in_process()
    assert result.success
    assert result.output_for_node("follows_o2") == "foo"

    with pytest.raises(
        DagsterInvalidDefinitionError,
        match=r"When attempting to create job 'bad_subset', the clause "
        r"'doesnt_exist' within the asset key selection did not match any asset "
        r"keys. Present asset keys: ",
    ):
        group.build_job(name="bad_subset", selection="doesnt_exist")

    with pytest.raises(
        DagsterInvalidDefinitionError,
        match=r"When attempting to create job 'bad_query_arguments', the clause "
        r"follows_o1= within the asset key selection was invalid. Please review "
        r"the selection syntax here: "
        r"https://docs.dagster.io/concepts/ops-jobs-graphs/job-execution#op-selection-syntax.",
    ):
        group.build_job(name="bad_query_arguments", selection="follows_o1=")

    with pytest.raises(
        DagsterInvalidDefinitionError,
        match=r"When building job 'test_subselect_only_one_key', the asset "
        r"'middle_asset' contains asset keys \['o1', 'o2'\], but attempted to "
        r"select only \['o1'\]. Selecting only some of the asset keys for a "
        r"particular asset is not yet supported behavior. Please select all "
        r"asset keys produced by a given asset when subsetting.",
    ):
        group.build_job(name="test_subselect_only_one_key", selection="o1")


def test_asset_group_build_job_selection_multi_component():
    source_asset = SourceAsset(["apple", "banana"])

    @asset(namespace="abc")
    def asset1():
        ...

    group = AssetGroup([asset1], source_assets=[source_asset])
    assert group.build_job(name="something", selection="abc>asset1").asset_layer.asset_keys == {
        AssetKey(["abc", "asset1"])
    }

    with pytest.raises(DagsterInvalidDefinitionError, match="source asset"):
        group.build_job(name="something", selection="apple>banana")


def test_asset_group_from_package_name():
    from . import asset_package

    collection_1 = AssetGroup.from_package_name(asset_package.__name__)
    assert len(collection_1.assets) == 6

    assets_1 = [asset.op.name for asset in collection_1.assets]
    source_assets_1 = [source_asset.key for source_asset in collection_1.source_assets]

    collection_2 = AssetGroup.from_package_name(asset_package.__name__)
    assert len(collection_2.assets) == 6

    assets_2 = [asset.op.name for asset in collection_2.assets]
    source_assets_2 = [source_asset.key for source_asset in collection_2.source_assets]

    assert assets_1 == assets_2
    assert source_assets_1 == source_assets_2


def test_asset_group_from_package_module():
    from . import asset_package

    collection_1 = AssetGroup.from_package_module(asset_package)
    assert len(collection_1.assets) == 6

    assets_1 = [asset.op.name for asset in collection_1.assets]
    source_assets_1 = [source_asset.key for source_asset in collection_1.source_assets]

    collection_2 = AssetGroup.from_package_module(asset_package)
    assert len(collection_2.assets) == 6

    assets_2 = [asset.op.name for asset in collection_2.assets]
    source_assets_2 = [source_asset.key for source_asset in collection_2.source_assets]

    assert assets_1 == assets_2
    assert source_assets_1 == source_assets_2


def test_asset_group_from_modules(monkeypatch):
    from . import asset_package
    from .asset_package import module_with_assets

    collection_1 = AssetGroup.from_modules([asset_package, module_with_assets])

    assets_1 = [asset.op.name for asset in collection_1.assets]
    source_assets_1 = [source_asset.key for source_asset in collection_1.source_assets]

    collection_2 = AssetGroup.from_modules([asset_package, module_with_assets])

    assets_2 = [asset.op.name for asset in collection_2.assets]
    source_assets_2 = [source_asset.key for source_asset in collection_2.source_assets]

    assert assets_1 == assets_2
    assert source_assets_1 == source_assets_2

    with monkeypatch.context() as m:

        @asset
        def little_richard():
            pass

        m.setattr(asset_package, "little_richard_dup", little_richard, raising=False)
        with pytest.raises(
            DagsterInvalidDefinitionError,
            match=re.escape(
                "Asset key AssetKey(['little_richard']) is defined multiple times. "
                "Definitions found in modules: dagster_tests.core_tests.asset_defs_tests.asset_package."
            ),
        ):
            AssetGroup.from_modules([asset_package, module_with_assets])


@asset
def asset_in_current_module():
    pass


source_asset_in_current_module = SourceAsset(AssetKey("source_asset_in_current_module"))


def test_asset_group_from_current_module():
    group = AssetGroup.from_current_module()
    assert {asset.op.name for asset in group.assets} == {"asset_in_current_module"}
    assert len(group.assets) == 1
    assert {source_asset.key for source_asset in group.source_assets} == {
        AssetKey("source_asset_in_current_module")
    }
    assert len(group.source_assets) == 1


def test_default_io_manager():
    @asset
    def asset_foo():
        return "foo"

    group = AssetGroup(assets=[asset_foo])
    assert (
        group.resource_defs["io_manager"]  # pylint: disable=comparison-with-callable
        == fs_asset_io_manager
    )


def test_job_with_reserved_name():
    @graph
    def the_graph():
        pass

    the_job = the_graph.to_job(name="__ASSET_GROUP")
    with pytest.raises(
        DagsterInvalidDefinitionError,
        match="Attempted to provide job called __ASSET_GROUP to repository, which is a reserved name.",
    ):

        @repository
        def the_repo():  # pylint: disable=unused-variable
            return [the_job]


def test_materialize():
    @asset
    def asset_foo():
        return "foo"

    group = AssetGroup(assets=[asset_foo])

    result = group.materialize()
    assert result.success


def test_materialize_with_out_of_process_executor():
    @asset
    def asset_foo():
        return "foo"

    group = AssetGroup(assets=[asset_foo], executor_def=multiprocess_executor)

    with pytest.raises(
        DagsterUnmetExecutorRequirementsError,
        match="'materialize' can only be invoked on AssetGroups which have no executor or have "
        "the in_process_executor, but the AssetGroup had executor 'multiprocess'",
    ):
        group.materialize()


def test_materialize_with_selection():
    @asset
    def start_asset():
        return "foo"

    @multi_asset(outs={"o1": Out(asset_key=AssetKey("o1")), "o2": Out(asset_key=AssetKey("o2"))})
    def middle_asset(start_asset):
        return (start_asset, start_asset)

    @asset
    def follows_o1(o1):
        return o1

    @asset
    def follows_o2(o2):
        return o2

    _, io_manager_def = asset_aware_io_manager()
    group = AssetGroup(
        [start_asset, middle_asset, follows_o1, follows_o2],
        resource_defs={"io_manager": io_manager_def},
    )

    result = group.materialize(selection="*follows_o2")
    assert result.success
    assert result.output_for_node("middle_asset", "o1") == "foo"
    assert result.output_for_node("follows_o2") == "foo"
    assert result.output_for_node("start_asset") == "foo"


def test_multiple_partitions_defs():
    @asset(partitions_def=DailyPartitionsDefinition(start_date="2021-05-05"))
    def daily_asset():
        ...

    @asset(partitions_def=DailyPartitionsDefinition(start_date="2021-05-05"))
    def daily_asset2():
        ...

    @asset(partitions_def=DailyPartitionsDefinition(start_date="2020-05-05"))
    def daily_asset_different_start_date():
        ...

    @asset(partitions_def=HourlyPartitionsDefinition(start_date="2021-05-05-00:00"))
    def hourly_asset():
        ...

    @asset
    def unpartitioned_asset():
        ...

    group = AssetGroup(
        [
            daily_asset,
            daily_asset2,
            daily_asset_different_start_date,
            hourly_asset,
            unpartitioned_asset,
        ]
    )

    jobs = group.get_base_jobs()
    assert len(jobs) == 3
    assert {job_def.name for job_def in jobs} == {
        "__ASSET_GROUP_0",
        "__ASSET_GROUP_1",
        "__ASSET_GROUP_2",
    }
    assert {
        frozenset([node_def.name for node_def in job_def.all_node_defs]) for job_def in jobs
    } == {
        frozenset(["daily_asset", "daily_asset2", "unpartitioned_asset"]),
        frozenset(["hourly_asset", "unpartitioned_asset"]),
        frozenset(["daily_asset_different_start_date", "unpartitioned_asset"]),
    }


def test_assets_prefixed_single_asset():
    @asset
    def asset1():
        ...

    result = AssetGroup([asset1]).prefixed("my_prefix").assets
    assert result[0].asset_key == AssetKey(["my_prefix", "asset1"])


def test_assets_prefixed_internal_dep():
    @asset
    def asset1():
        ...

    @asset
    def asset2(asset1):
        del asset1

    result = AssetGroup([asset1, asset2]).prefixed("my_prefix").assets
    assert result[0].asset_key == AssetKey(["my_prefix", "asset1"])
    assert result[1].asset_key == AssetKey(["my_prefix", "asset2"])
    assert set(result[1].dependency_asset_keys) == {AssetKey(["my_prefix", "asset1"])}


def test_assets_prefixed_disambiguate():
    asset1 = SourceAsset(AssetKey(["core", "apple"]))

    @asset(name="apple")
    def asset2():
        ...

    @asset(ins={"apple": AssetIn(namespace="core")})
    def orange(apple):
        del apple

    @asset
    def banana(apple):
        del apple

    result = (
        AssetGroup([asset2, orange, banana], source_assets=[asset1]).prefixed("my_prefix").assets
    )
    assert len(result) == 3
    assert result[0].asset_key == AssetKey(["my_prefix", "apple"])
    assert result[1].asset_key == AssetKey(["my_prefix", "orange"])
    assert set(result[1].dependency_asset_keys) == {AssetKey(["core", "apple"])}
    assert result[2].asset_key == AssetKey(["my_prefix", "banana"])
    assert set(result[2].dependency_asset_keys) == {AssetKey(["my_prefix", "apple"])}


def test_assets_prefixed_source_asset():
    asset1 = SourceAsset(key=AssetKey(["upstream_prefix", "asset1"]))

    @asset(ins={"asset1": AssetIn(namespace="upstream_prefix")})
    def asset2(asset1):
        del asset1

    result = AssetGroup([asset2], source_assets=[asset1]).prefixed("my_prefix").assets
    assert len(result) == 1
    assert result[0].asset_key == AssetKey(["my_prefix", "asset2"])
    assert set(result[0].dependency_asset_keys) == {AssetKey(["upstream_prefix", "asset1"])}


def test_assets_prefixed_no_matches():
    @asset
    def orange(apple):
        del apple

    result = AssetGroup([orange]).prefixed("my_prefix").assets
    assert result[0].asset_key == AssetKey(["my_prefix", "orange"])
    assert set(result[0].dependency_asset_keys) == {AssetKey("apple")}


def test_add_asset_groups():
    @asset
    def asset1():
        ...

    @asset
    def asset2():
        ...

    source1 = SourceAsset(AssetKey(["source1"]))
    source2 = SourceAsset(AssetKey(["source2"]))

    group1 = AssetGroup(assets=[asset1], source_assets=[source1])
    group2 = AssetGroup(assets=[asset2], source_assets=[source2])

    assert (group1 + group2) == AssetGroup(
        assets=[asset1, asset2], source_assets=[source1, source2]
    )


def test_add_asset_groups_different_resources():
    @asset
    def asset1():
        ...

    @asset
    def asset2():
        ...

    source1 = SourceAsset(AssetKey(["source1"]))
    source2 = SourceAsset(AssetKey(["source2"]))

    group1 = AssetGroup(
        assets=[asset1],
        source_assets=[source1],
        resource_defs={"apple": ResourceDefinition.none_resource()},
    )
    group2 = AssetGroup(
        assets=[asset2],
        source_assets=[source2],
        resource_defs={"banana": ResourceDefinition.none_resource()},
    )

    with pytest.raises(DagsterInvalidDefinitionError):
        group1 + group2  # pylint: disable=pointless-statement


def test_add_asset_groups_different_executors():
    @asset
    def asset1():
        ...

    @asset
    def asset2():
        ...

    source1 = SourceAsset(AssetKey(["source1"]))
    source2 = SourceAsset(AssetKey(["source2"]))

    group1 = AssetGroup(assets=[asset1], source_assets=[source1], executor_def=in_process_executor)
    group2 = AssetGroup(
        assets=[asset2],
        source_assets=[source2],
    )

    with pytest.raises(DagsterInvalidDefinitionError):
        group1 + group2  # pylint: disable=pointless-statement


def test_to_source_assets():
    @asset
    def my_asset():
        ...

    @multi_asset(
        outs={
            "my_out_name": Out(asset_key=AssetKey("my_asset_name")),
            "my_other_out_name": Out(asset_key=AssetKey("my_other_asset")),
        }
    )
    def my_multi_asset():
        yield Output(1, "my_out_name")
        yield Output(2, "my_other_out_name")

    assert AssetGroup([my_asset, my_multi_asset]).to_source_assets() == [
        SourceAsset(AssetKey(["my_asset"])),
        SourceAsset(AssetKey(["my_asset_name"])),
        SourceAsset(AssetKey(["my_other_asset"])),
    ]
