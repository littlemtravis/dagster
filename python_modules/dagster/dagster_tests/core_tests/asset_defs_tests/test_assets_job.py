import os

import pytest

from dagster import (
    AssetGroup,
    AssetKey,
    AssetsDefinition,
    DagsterInvalidDefinitionError,
    DagsterInvariantViolationError,
    DependencyDefinition,
    GraphIn,
    GraphOut,
    IOManager,
    Out,
    Output,
    ResourceDefinition,
    StaticPartitionsDefinition,
    graph,
    io_manager,
    multi_asset,
    op,
)
from dagster.core.asset_defs import AssetIn, SourceAsset, asset, build_assets_job
from dagster.core.definitions.dependency import NodeHandle
from dagster.core.snap import DependencyStructureIndex
from dagster.core.snap.dep_snapshot import (
    OutputHandleSnap,
    build_dep_structure_snapshot_from_icontains_solids,
)
from dagster.utils import safe_tempfile_path


def _asset_keys_for_node(result, node_name):
    mats = result.asset_materializations_for_node(node_name)
    ret = {mat.asset_key for mat in mats}
    assert len(mats) == len(ret)
    return ret


def test_single_asset_pipeline():
    @asset
    def asset1():
        return 1

    job = build_assets_job("a", [asset1])
    assert job.graph.node_defs == [asset1.op]
    assert job.execute_in_process().success


def test_two_asset_pipeline():
    @asset
    def asset1():
        return 1

    @asset
    def asset2(asset1):
        assert asset1 == 1

    job = build_assets_job("a", [asset1, asset2])
    assert job.graph.node_defs == [asset1.op, asset2.op]
    assert job.dependencies == {
        "asset1": {},
        "asset2": {"asset1": DependencyDefinition("asset1", "result")},
    }
    assert job.execute_in_process().success


def test_fork():
    @asset
    def asset1():
        return 1

    @asset
    def asset2(asset1):
        assert asset1 == 1

    @asset
    def asset3(asset1):
        assert asset1 == 1

    job = build_assets_job("a", [asset1, asset2, asset3])
    assert job.graph.node_defs == [asset1.op, asset2.op, asset3.op]
    assert job.dependencies == {
        "asset1": {},
        "asset2": {"asset1": DependencyDefinition("asset1", "result")},
        "asset3": {"asset1": DependencyDefinition("asset1", "result")},
    }
    assert job.execute_in_process().success


def test_join():
    @asset
    def asset1():
        return 1

    @asset
    def asset2():
        return 2

    @asset
    def asset3(asset1, asset2):
        assert asset1 == 1
        assert asset2 == 2

    job = build_assets_job("a", [asset1, asset2, asset3])
    assert job.graph.node_defs == [asset1.op, asset2.op, asset3.op]
    assert job.dependencies == {
        "asset1": {},
        "asset2": {},
        "asset3": {
            "asset1": DependencyDefinition("asset1", "result"),
            "asset2": DependencyDefinition("asset2", "result"),
        },
    }
    result = job.execute_in_process()
    assert _asset_keys_for_node(result, "asset3") == {AssetKey("asset3")}


def test_asset_key_output():
    @asset
    def asset1():
        return 1

    @asset(ins={"hello": AssetIn(asset_key=AssetKey("asset1"))})
    def asset2(hello):
        return hello

    job = build_assets_job("boo", [asset1, asset2])
    result = job.execute_in_process()
    assert result.success
    assert result.output_for_node("asset2") == 1
    assert _asset_keys_for_node(result, "asset2") == {AssetKey("asset2")}


def test_asset_key_matches_input_name():
    @asset
    def asset_foo():
        return "foo"

    @asset
    def asset_bar():
        return "bar"

    @asset(
        ins={"asset_bar": AssetIn(asset_key=AssetKey("asset_foo"))}
    )  # should still use output from asset_foo
    def last_asset(asset_bar):
        return asset_bar

    job = build_assets_job("lol", [asset_foo, asset_bar, last_asset])
    result = job.execute_in_process()
    assert result.success
    assert result.output_for_node("last_asset") == "foo"
    assert _asset_keys_for_node(result, "last_asset") == {AssetKey("last_asset")}


def test_asset_key_and_inferred():
    @asset
    def asset_foo():
        return 2

    @asset
    def asset_bar():
        return 5

    @asset(ins={"foo": AssetIn(asset_key=AssetKey("asset_foo"))})
    def asset_baz(foo, asset_bar):
        return foo + asset_bar

    job = build_assets_job("hello", [asset_foo, asset_bar, asset_baz])
    result = job.execute_in_process()
    assert result.success
    assert result.output_for_node("asset_baz") == 7
    assert _asset_keys_for_node(result, "asset_baz") == {AssetKey("asset_baz")}


def test_asset_key_for_asset_with_namespace_list():
    @asset(namespace=["hell", "o"])
    def asset_foo():
        return "foo"

    @asset(
        ins={"foo": AssetIn(asset_key=AssetKey("asset_foo"))}
    )  # Should fail because asset_foo is defined with namespace, so has asset key ["hello", "asset_foo"]
    def failing_asset(foo):  # pylint: disable=unused-argument
        pass

    with pytest.raises(
        DagsterInvalidDefinitionError,
    ):
        build_assets_job("lol", [asset_foo, failing_asset])

    @asset(ins={"foo": AssetIn(asset_key=AssetKey(["hell", "o", "asset_foo"]))})
    def success_asset(foo):
        return foo

    job = build_assets_job("lol", [asset_foo, success_asset])

    result = job.execute_in_process()
    assert result.success
    assert result.output_for_node("success_asset") == "foo"
    assert _asset_keys_for_node(result, "hell__o__asset_foo") == {
        AssetKey(["hell", "o", "asset_foo"])
    }


def test_asset_key_for_asset_with_namespace_str():
    @asset(namespace="hello")
    def asset_foo():
        return "foo"

    @asset(ins={"foo": AssetIn(asset_key=AssetKey(["hello", "asset_foo"]))})
    def success_asset(foo):
        return foo

    job = build_assets_job("lol", [asset_foo, success_asset])

    result = job.execute_in_process()
    assert result.success
    assert result.output_for_node("success_asset") == "foo"
    assert _asset_keys_for_node(result, "hello__asset_foo") == {AssetKey(["hello", "asset_foo"])}


def test_source_asset():
    @asset
    def asset1(source1):
        assert source1 == 5
        return 1

    class MyIOManager(IOManager):
        def handle_output(self, context, obj):
            pass

        def load_input(self, context):
            assert context.resource_config["a"] == 7
            assert context.resources.subresource == 9
            assert context.upstream_output.resources.subresource == 9
            return 5

    @io_manager(config_schema={"a": int}, required_resource_keys={"subresource"})
    def my_io_manager(_):
        return MyIOManager()

    job = build_assets_job(
        "a",
        [asset1],
        source_assets=[SourceAsset(AssetKey("source1"), io_manager_key="special_io_manager")],
        resource_defs={
            "special_io_manager": my_io_manager.configured({"a": 7}),
            "subresource": ResourceDefinition.hardcoded_resource(9),
        },
    )
    assert job.graph.node_defs == [asset1.op]
    result = job.execute_in_process()
    assert result.success
    assert _asset_keys_for_node(result, "asset1") == {AssetKey("asset1")}


def test_source_op_asset():
    @asset(io_manager_key="special_io_manager")
    def source1():
        pass

    @asset
    def asset1(source1):
        assert source1 == 5
        return 1

    class MyIOManager(IOManager):
        def handle_output(self, context, obj):
            pass

        def load_input(self, context):
            return 5

    @io_manager
    def my_io_manager(_):
        return MyIOManager()

    job = build_assets_job(
        "a",
        [asset1],
        source_assets=[source1],
        resource_defs={"special_io_manager": my_io_manager},
    )
    assert job.graph.node_defs == [asset1.op]
    result = job.execute_in_process()
    assert result.success
    assert _asset_keys_for_node(result, "asset1") == {AssetKey("asset1")}


def test_non_argument_deps():
    with safe_tempfile_path() as path:

        @asset
        def foo():
            with open(path, "w", encoding="utf8") as ff:
                ff.write("yup")

        @asset(non_argument_deps={AssetKey("foo")})
        def bar():
            # assert that the foo asset already executed
            assert os.path.exists(path)

        job = build_assets_job("a", [foo, bar])
        result = job.execute_in_process()
        assert result.success
        assert _asset_keys_for_node(result, "foo") == {AssetKey("foo")}
        assert _asset_keys_for_node(result, "bar") == {AssetKey("bar")}


def test_multiple_non_argument_deps():
    @asset
    def foo():
        pass

    @asset(namespace="namespace")
    def bar():
        pass

    @asset
    def baz():
        return 1

    @asset(non_argument_deps={AssetKey("foo"), AssetKey(["namespace", "bar"])})
    def qux(baz):
        return baz

    job = build_assets_job("a", [foo, bar, baz, qux])

    dep_structure_snapshot = build_dep_structure_snapshot_from_icontains_solids(job.graph)
    index = DependencyStructureIndex(dep_structure_snapshot)

    assert index.get_invocation("foo")
    assert index.get_invocation("namespace__bar")
    assert index.get_invocation("baz")

    assert index.get_upstream_outputs("qux", "foo") == [
        OutputHandleSnap("foo", "result"),
    ]
    assert index.get_upstream_outputs("qux", "namespace_bar") == [
        OutputHandleSnap("namespace__bar", "result")
    ]
    assert index.get_upstream_outputs("qux", "baz") == [OutputHandleSnap("baz", "result")]

    result = job.execute_in_process()
    assert result.success
    assert result.output_for_node("qux") == 1
    assert _asset_keys_for_node(result, "namespace__bar") == {AssetKey(["namespace", "bar"])}
    assert _asset_keys_for_node(result, "qux") == {AssetKey("qux")}


def test_basic_graph_asset():
    @op
    def return_one():
        return 1

    @op
    def add_one(in1):
        return in1 + 1

    @graph
    def create_cool_thing():
        return add_one(add_one(return_one()))

    cool_thing_asset = AssetsDefinition(
        asset_keys_by_input_name={},
        asset_keys_by_output_name={"result": AssetKey("cool_thing")},
        node_def=create_cool_thing,
    )
    job = build_assets_job("graph_asset_job", [cool_thing_asset])

    result = job.execute_in_process()
    assert _asset_keys_for_node(result, "create_cool_thing.add_one_2") == {AssetKey("cool_thing")}


def test_input_mapped_graph_asset():
    @asset
    def a():
        return "a"

    @asset
    def b():
        return "b"

    @op
    def double_string(s):
        return s * 2

    @op
    def combine_strings(s1, s2):
        return s1 + s2

    @graph
    def create_cool_thing(a, b):
        da = double_string(double_string(a))
        db = double_string(b)
        return combine_strings(da, db)

    cool_thing_asset = AssetsDefinition(
        asset_keys_by_input_name={"a": AssetKey("a"), "b": AssetKey("b")},
        asset_keys_by_output_name={"result": AssetKey("cool_thing")},
        node_def=create_cool_thing,
    )

    job = build_assets_job("graph_asset_job", [a, b, cool_thing_asset])

    result = job.execute_in_process()
    assert result.success
    assert result.output_for_node("create_cool_thing.combine_strings") == "aaaabb"
    assert _asset_keys_for_node(result, "create_cool_thing") == {AssetKey("cool_thing")}
    assert _asset_keys_for_node(result, "create_cool_thing.combine_strings") == {
        AssetKey("cool_thing")
    }


def test_output_mapped_same_op_graph_asset():
    @asset
    def a():
        return "a"

    @asset
    def b():
        return "b"

    @op
    def double_string(s):
        return s * 2

    @op(out={"ns1": Out(), "ns2": Out()})
    def combine_strings_and_split(s1, s2):
        return (s1 + s2, s2 + s1)

    @graph(out={"o1": GraphOut(), "o2": GraphOut()})
    def create_cool_things(a, b):
        da = double_string(double_string(a))
        db = double_string(b)
        o1, o2 = combine_strings_and_split(da, db)
        return o1, o2

    @asset
    def out_asset1_plus_one(out_asset1):
        return out_asset1 + "one"

    @asset
    def out_asset2_plus_one(out_asset2):
        return out_asset2 + "one"

    complex_asset = AssetsDefinition(
        asset_keys_by_input_name={"a": AssetKey("a"), "b": AssetKey("b")},
        asset_keys_by_output_name={"o1": AssetKey("out_asset1"), "o2": AssetKey("out_asset2")},
        node_def=create_cool_things,
    )

    job = build_assets_job(
        "graph_asset_job", [a, b, complex_asset, out_asset1_plus_one, out_asset2_plus_one]
    )

    result = job.execute_in_process()
    assert result.success
    assert result.output_for_node("out_asset1_plus_one") == "aaaabbone"
    assert result.output_for_node("out_asset2_plus_one") == "bbaaaaone"

    assert _asset_keys_for_node(result, "create_cool_things") == {
        AssetKey("out_asset1"),
        AssetKey("out_asset2"),
    }
    assert _asset_keys_for_node(result, "create_cool_things.combine_strings_and_split") == {
        AssetKey("out_asset1"),
        AssetKey("out_asset2"),
    }


def test_output_mapped_different_op_graph_asset():
    @asset
    def a():
        return "a"

    @asset
    def b():
        return "b"

    @op
    def double_string(s):
        return s * 2

    @op(out={"ns1": Out(), "ns2": Out()})
    def combine_strings_and_split(s1, s2):
        return (s1 + s2, s2 + s1)

    @graph(out={"o1": GraphOut(), "o2": GraphOut()})
    def create_cool_things(a, b):
        ab, ba = combine_strings_and_split(a, b)
        dab = double_string(ab)
        dba = double_string(ba)
        return dab, dba

    @asset
    def out_asset1_plus_one(out_asset1):
        return out_asset1 + "one"

    @asset
    def out_asset2_plus_one(out_asset2):
        return out_asset2 + "one"

    complex_asset = AssetsDefinition(
        asset_keys_by_input_name={"a": AssetKey("a"), "b": AssetKey("b")},
        asset_keys_by_output_name={"o1": AssetKey("out_asset1"), "o2": AssetKey("out_asset2")},
        node_def=create_cool_things,
    )

    job = build_assets_job(
        "graph_asset_job", [a, b, complex_asset, out_asset1_plus_one, out_asset2_plus_one]
    )

    result = job.execute_in_process()
    assert result.success
    assert result.output_for_node("out_asset1_plus_one") == "ababone"
    assert result.output_for_node("out_asset2_plus_one") == "babaone"

    assert _asset_keys_for_node(result, "create_cool_things") == {
        AssetKey("out_asset1"),
        AssetKey("out_asset2"),
    }
    assert _asset_keys_for_node(result, "create_cool_things.double_string") == {
        AssetKey("out_asset1")
    }
    assert _asset_keys_for_node(result, "create_cool_things.double_string_2") == {
        AssetKey("out_asset2")
    }


def test_nasty_nested_graph_assets():
    @op
    def add_one(i):
        return i + 1

    @graph
    def add_three(i):
        return add_one(add_one(add_one(i)))

    @graph
    def add_five(i):
        return add_one(add_three(add_one(i)))

    @op
    def get_sum(a, b):
        return a + b

    @graph
    def sum_plus_one(a, b):
        return add_one(get_sum(a, b))

    @asset
    def zero():
        return 0

    @graph(out={"eight": GraphOut(), "five": GraphOut()})
    def create_eight_and_five(zero):
        return add_five(add_three(zero)), add_five(zero)

    @graph(out={"thirteen": GraphOut(), "six": GraphOut()})
    def create_thirteen_and_six(eight, five, zero):
        return add_five(eight), sum_plus_one(five, zero)

    @graph
    def create_twenty(thirteen, six):
        return sum_plus_one(thirteen, six)

    eight_and_five = AssetsDefinition(
        asset_keys_by_input_name={"zero": AssetKey("zero")},
        asset_keys_by_output_name={"eight": AssetKey("eight"), "five": AssetKey("five")},
        node_def=create_eight_and_five,
    )

    thirteen_and_six = AssetsDefinition(
        asset_keys_by_input_name={
            "eight": AssetKey("eight"),
            "five": AssetKey("five"),
            "zero": AssetKey("zero"),
        },
        asset_keys_by_output_name={"thirteen": AssetKey("thirteen"), "six": AssetKey("six")},
        node_def=create_thirteen_and_six,
    )

    twenty = AssetsDefinition(
        asset_keys_by_input_name={"thirteen": AssetKey("thirteen"), "six": AssetKey("six")},
        asset_keys_by_output_name={"result": AssetKey("twenty")},
        node_def=create_twenty,
    )

    job = build_assets_job("graph_asset_job", [zero, eight_and_five, thirteen_and_six, twenty])

    result = job.execute_in_process()
    assert result.success
    assert result.output_for_node("create_thirteen_and_six", "six") == 6
    assert result.output_for_node("create_twenty") == 20
    assert _asset_keys_for_node(result, "create_eight_and_five") == {
        AssetKey("eight"),
        AssetKey("five"),
    }
    assert _asset_keys_for_node(result, "create_thirteen_and_six") == {
        AssetKey("thirteen"),
        AssetKey("six"),
    }
    assert _asset_keys_for_node(result, "create_twenty") == {AssetKey("twenty")}


def test_fail_with_get_output_asset_key():
    @io_manager
    def my_io_manager(_context):
        class Mine(IOManager):
            def get_output_asset_key(self, _context):
                return AssetKey("hey")

            def handle_output(self, context, obj):
                pass

            def load_input(self, context):
                return None

        return Mine()

    @asset
    def foo():
        return 1

    @asset
    def bar(foo):
        return foo + 1

    job = build_assets_job("x", [foo, bar], resource_defs={"io_manager": my_io_manager})
    with pytest.raises(
        DagsterInvariantViolationError,
        match=r'The IOManager of output "result" on node "foo" associates it with asset key '
        r"\"AssetKey\(\['hey'\]\)\", but this output has already been defined to produce asset "
        r"\"AssetKey\(\['foo'\]\)\"",
    ):
        job.execute_in_process()


def test_internal_asset_deps():
    with pytest.raises(Exception, match="output_name non_exist_output_name"):

        @op
        def my_op(x, y):  # pylint: disable=unused-argument
            return x

        @graph(ins={"x": GraphIn()})
        def my_graph(x, y):
            my_op(x, y)

        AssetsDefinition.from_graph(
            graph_def=my_graph, internal_asset_deps={"non_exist_output_name": {AssetKey("b")}}
        )


def test_asset_def_from_graph_inputs():
    @op
    def my_op(x, y):  # pylint: disable=unused-argument
        return x

    @graph(ins={"x": GraphIn(), "y": GraphIn()})
    def my_graph(x, y):
        my_op(x, y)

    assets_def = AssetsDefinition.from_graph(
        graph_def=my_graph,
        asset_keys_by_input_name={"x": AssetKey("x_asset"), "y": AssetKey("y_asset")},
    )

    assert assets_def.asset_keys_by_input_name["x"] == AssetKey("x_asset")
    assert assets_def.asset_keys_by_input_name["y"] == AssetKey("y_asset")


def test_asset_def_from_graph_outputs():
    @op
    def x_op(x):
        return x

    @op
    def y_op(y):
        return y

    @graph(out={"x": GraphOut(), "y": GraphOut()})
    def my_graph(x, y):
        return {"x": x_op(x), "y": y_op(y)}

    assets_def = AssetsDefinition.from_graph(
        graph_def=my_graph,
        asset_keys_by_output_name={"y": AssetKey("y_asset"), "x": AssetKey("x_asset")},
    )

    assert assets_def.asset_keys_by_output_name["y"] == AssetKey("y_asset")
    assert assets_def.asset_keys_by_output_name["x"] == AssetKey("x_asset")


def test_graph_asset_decorator_no_args():
    @op
    def my_op(x, y):  # pylint: disable=unused-argument
        return x

    @graph
    def my_graph(x, y):
        return my_op(x, y)

    assets_def = AssetsDefinition.from_graph(
        graph_def=my_graph,
    )

    assert assets_def.asset_keys_by_input_name["x"] == AssetKey("x")
    assert assets_def.asset_keys_by_input_name["y"] == AssetKey("y")
    assert assets_def.asset_keys_by_output_name["result"] == AssetKey("my_graph")


def test_graph_asset_partitioned():
    @op
    def my_op(context):
        assert context.partition_key == "a"

    @graph
    def my_graph():
        return my_op()

    assets_def = AssetsDefinition.from_graph(
        graph_def=my_graph, partitions_def=StaticPartitionsDefinition(["a", "b", "c"])
    )

    AssetGroup([assets_def]).build_job("abc").execute_in_process(partition_key="a")


def test_all_assets_job():
    @asset
    def a1():
        return 1

    @asset
    def a2(a1):  # pylint: disable=unused-argument
        return 2

    job = build_assets_job("graph_asset_job", [a1, a2])
    node_handle_deps_by_asset = job.asset_layer.dependency_node_handles_by_asset_key

    assert node_handle_deps_by_asset[AssetKey("a1")] == {
        NodeHandle("a1", parent=None),
    }
    assert node_handle_deps_by_asset[AssetKey("a2")] == {NodeHandle("a2", parent=None)}


def test_basic_graph():
    @op
    def get_string():
        return "foo"

    @op(out={"ns1": Out(), "ns2": Out()})
    def combine_strings_and_split(s1, s2):
        return (s1 + s2, s2 + s1)

    @graph(out={"o1": GraphOut()})
    def thing():
        da = get_string()
        db = get_string()
        o1, o2 = combine_strings_and_split(da, db)  # pylint: disable=unused-variable
        return o1

    @asset
    def out_asset1_plus_one(out_asset1):
        return out_asset1 + "one"

    @asset
    def out_asset2_plus_one(out_asset2):
        return out_asset2 + "one"

    complex_asset = AssetsDefinition(
        asset_keys_by_input_name={},
        asset_keys_by_output_name={"o1": AssetKey("out_asset1")},
        node_def=thing,
    )

    job = build_assets_job("graph_asset_job", [complex_asset])
    node_handle_deps_by_asset = job.asset_layer.dependency_node_handles_by_asset_key

    thing_handle = NodeHandle(name="thing", parent=None)
    assert node_handle_deps_by_asset[AssetKey("out_asset1")] == {
        NodeHandle("get_string", parent=thing_handle),
        NodeHandle("get_string_2", parent=thing_handle),
        NodeHandle("combine_strings_and_split", parent=thing_handle),
    }


def test_hanging_op_graph():
    @op
    def get_string():
        return "foo"

    @op
    def combine_strings(s1, s2):
        return s1 + s2

    @op
    def hanging_op():
        return "bar"

    @graph(out={"o1": GraphOut(), "o2": GraphOut()})
    def thing():
        da = get_string()
        db = get_string()
        o1 = combine_strings(da, db)
        o2 = hanging_op()
        return {"o1": o1, "o2": o2}

    complex_asset = AssetsDefinition(
        asset_keys_by_input_name={},
        asset_keys_by_output_name={"o1": AssetKey("out_asset1"), "o2": AssetKey("out_asset2")},
        node_def=thing,
    )
    job = build_assets_job("graph_asset_job", [complex_asset])
    node_handle_deps_by_asset = job.asset_layer.dependency_node_handles_by_asset_key

    thing_handle = NodeHandle(name="thing", parent=None)
    assert node_handle_deps_by_asset[AssetKey("out_asset1")] == {
        NodeHandle("get_string", parent=thing_handle),
        NodeHandle("get_string_2", parent=thing_handle),
        NodeHandle("combine_strings", parent=thing_handle),
    }
    assert node_handle_deps_by_asset[AssetKey("out_asset2")] == {
        NodeHandle("hanging_op", parent=thing_handle),
    }


def test_nested_graph():
    @op
    def get_inside_string():
        return "bar"

    @graph(out={"o2": GraphOut()})
    def inside_thing():
        return get_inside_string()

    @op
    def get_string():
        return "foo"

    @op(out={"ns1": Out(), "ns2": Out()})
    def combine_strings_and_split(s1, s2):
        return (s1 + s2, s2 + s1)

    @graph(out={"o1": GraphOut()})
    def thing():
        da = inside_thing()
        db = get_string()
        o1, o2 = combine_strings_and_split(da, db)  # pylint: disable=unused-variable
        return o1

    thing_asset = AssetsDefinition(
        asset_keys_by_input_name={},
        asset_keys_by_output_name={"o1": AssetKey("thing")},
        node_def=thing,
    )

    job = build_assets_job("graph_asset_job", [thing_asset])
    node_handle_deps_by_asset = job.asset_layer.dependency_node_handles_by_asset_key

    thing_handle = NodeHandle(name="thing", parent=None)
    assert node_handle_deps_by_asset[AssetKey("thing")] == {
        NodeHandle("get_inside_string", parent=NodeHandle("inside_thing", parent=thing_handle)),
        NodeHandle("get_string", parent=thing_handle),
        NodeHandle("combine_strings_and_split", parent=thing_handle),
    }


def test_asset_in_nested_graph():
    @op
    def get_inside_string():
        return "bar"

    @op
    def get_string():
        return "foo"

    @graph(out={"n1": GraphOut(), "n2": GraphOut()})
    def inside_thing():
        n1 = get_inside_string()
        n2 = get_string()
        return n1, n2

    @op
    def get_transformed_string(string):
        return string + "qux"

    @graph(out={"o1": GraphOut(), "o3": GraphOut()})
    def thing():
        o1, o2 = inside_thing()
        o3 = get_transformed_string(o2)
        return (o1, o3)

    thing_asset = AssetsDefinition(
        asset_keys_by_input_name={},
        asset_keys_by_output_name={"o1": AssetKey("thing"), "o3": AssetKey("thing_2")},
        node_def=thing,
    )

    job = build_assets_job("graph_asset_job", [thing_asset])
    node_handle_deps_by_asset = job.asset_layer.dependency_node_handles_by_asset_key

    thing_handle = NodeHandle(name="thing", parent=None)
    assert node_handle_deps_by_asset[AssetKey("thing")] == {
        NodeHandle("get_inside_string", parent=NodeHandle("inside_thing", parent=thing_handle)),
    }
    assert node_handle_deps_by_asset[AssetKey("thing_2")] == {
        NodeHandle("get_string", parent=NodeHandle("inside_thing", parent=thing_handle)),
        NodeHandle("get_transformed_string", parent=thing_handle),
    }


def test_twice_nested_graph():
    @op
    def get_inside_string():
        return "bar"

    @op
    def get_string():
        return "foo"

    @graph(out={"n1": GraphOut(), "n2": GraphOut()})
    def innermost_thing():
        n1 = get_inside_string()
        n2 = get_string()
        return {"n1": n1, "n2": n2}

    @op
    def transformer(string):
        return string + "qux"

    @graph(out={"n1": GraphOut(), "n2": GraphOut()})
    def middle_thing():
        n1, unused_output = innermost_thing()
        n2 = get_string()
        return {"n1": n1, "n2": n2}

    @graph(out={"n1": GraphOut(), "n2": GraphOut()})
    def outer_thing(foo_asset):
        n1, output = middle_thing()
        n2 = transformer(output)
        unused_output = transformer(foo_asset)  # pylint: disable=unused-variable
        return {"n1": n1, "n2": n2}

    @asset
    def foo_asset():
        return "foo"

    thing_asset = AssetsDefinition(
        asset_keys_by_input_name={},
        asset_keys_by_output_name={"n1": AssetKey("thing"), "n2": AssetKey("thing_2")},
        node_def=outer_thing,
    )

    job = build_assets_job("graph_asset_job", [foo_asset, thing_asset])
    node_handle_deps_by_asset = job.asset_layer.dependency_node_handles_by_asset_key

    outer_thing_handle = NodeHandle("outer_thing", parent=None)
    middle_thing_handle = NodeHandle("middle_thing", parent=outer_thing_handle)
    assert node_handle_deps_by_asset[AssetKey("thing")] == {
        NodeHandle(
            "get_inside_string",
            parent=NodeHandle(
                "innermost_thing",
                parent=middle_thing_handle,
            ),
        )
    }
    assert node_handle_deps_by_asset[AssetKey("thing_2")] == {
        NodeHandle("get_string", parent=middle_thing_handle),
        NodeHandle("transformer", parent=outer_thing_handle),
    }
    assert node_handle_deps_by_asset[AssetKey("foo_asset")] == {
        NodeHandle("foo_asset", parent=None)
    }


def test_internal_asset_deps_assets():
    @op
    def upstream_op():
        return "foo"

    @op(out={"o1": Out(), "o2": Out()})
    def two_outputs(upstream_op):
        o1 = upstream_op
        o2 = o1 + "bar"
        return o1, o2

    @graph(out={"o1": GraphOut(), "o2": GraphOut()})
    def thing():
        o1, o2 = two_outputs(upstream_op())
        return (o1, o2)

    thing_asset = AssetsDefinition(
        asset_keys_by_input_name={},
        asset_keys_by_output_name={"o1": AssetKey("thing"), "o2": AssetKey("thing_2")},
        node_def=thing,
        asset_deps={AssetKey("thing"): set(), AssetKey("thing_2"): {AssetKey("thing")}},
    )

    @multi_asset(
        outs={
            "my_out_name": Out(metadata={"foo": "bar"}),
            "my_other_out_name": Out(metadata={"bar": "foo"}),
        },
        internal_asset_deps={
            "my_out_name": {AssetKey("my_other_out_name")},
            "my_other_out_name": {AssetKey("thing")},
        },
    )
    def multi_asset_with_internal_deps(thing):  # pylint: disable=unused-argument
        yield Output(1, "my_out_name")
        yield Output(2, "my_other_out_name")

    job = build_assets_job("graph_asset_job", [thing_asset, multi_asset_with_internal_deps])
    node_handle_deps_by_asset = job.asset_layer.dependency_node_handles_by_asset_key
    assert node_handle_deps_by_asset[AssetKey("thing")] == {
        NodeHandle("two_outputs", parent=NodeHandle("thing", parent=None)),
        NodeHandle(name="upstream_op", parent=NodeHandle(name="thing", parent=None)),
    }
    assert node_handle_deps_by_asset[AssetKey("thing_2")] == {
        NodeHandle("two_outputs", parent=NodeHandle("thing", parent=None))
    }

    assert node_handle_deps_by_asset[AssetKey("my_out_name")] == {
        NodeHandle(name="multi_asset_with_internal_deps", parent=None)
    }
    assert node_handle_deps_by_asset[AssetKey("my_other_out_name")] == {
        NodeHandle(name="multi_asset_with_internal_deps", parent=None)
    }
