"""
This module contains the execution context objects that are internal to the system.
Not every property on these should be exposed to random Jane or Joe dagster user
so we have a different layer of objects that encode the explicit public API
in the user_context module
"""
from abc import ABC, abstractmethod
from collections import defaultdict
from typing import (
    TYPE_CHECKING,
    Any,
    Dict,
    Iterable,
    List,
    Mapping,
    NamedTuple,
    Optional,
    Set,
    Union,
    cast,
)

import dagster._check as check
from dagster.core.definitions.events import AssetKey, AssetLineageInfo
from dagster.core.definitions.hook_definition import HookDefinition
from dagster.core.definitions.job_definition import JobDefinition
from dagster.core.definitions.mode import ModeDefinition
from dagster.core.definitions.op_definition import OpDefinition
from dagster.core.definitions.partition_key_range import PartitionKeyRange
from dagster.core.definitions.pipeline_base import IPipeline
from dagster.core.definitions.pipeline_definition import PipelineDefinition
from dagster.core.definitions.policy import RetryPolicy
from dagster.core.definitions.reconstruct import ReconstructablePipeline
from dagster.core.definitions.resource_definition import ScopedResourcesBuilder
from dagster.core.definitions.solid_definition import SolidDefinition
from dagster.core.definitions.step_launcher import StepLauncher
from dagster.core.definitions.time_window_partitions import (
    TimeWindow,
    TimeWindowPartitionsDefinition,
)
from dagster.core.errors import DagsterInvariantViolationError
from dagster.core.execution.plan.outputs import StepOutputHandle
from dagster.core.execution.plan.step import ExecutionStep
from dagster.core.execution.retries import RetryMode
from dagster.core.executor.base import Executor
from dagster.core.log_manager import DagsterLogManager
from dagster.core.storage.io_manager import IOManager
from dagster.core.storage.pipeline_run import PipelineRun
from dagster.core.storage.tags import PARTITION_NAME_TAG
from dagster.core.system_config.objects import ResolvedRunConfig
from dagster.core.types.dagster_type import DagsterType

from .input import InputContext
from .output import OutputContext, get_output_context

if TYPE_CHECKING:
    from dagster.core.definitions.dependency import Node, NodeHandle
    from dagster.core.definitions.resource_definition import Resources
    from dagster.core.execution.plan.plan import ExecutionPlan
    from dagster.core.instance import DagsterInstance

    from .hook import HookContext


class IPlanContext(ABC):
    """Context interface to represent run information that does not require access to user code.

    The information available via this interface is accessible to the system throughout a run.
    """

    @property
    @abstractmethod
    def plan_data(self) -> "PlanData":
        raise NotImplementedError()

    @property
    def pipeline(self) -> IPipeline:
        return self.plan_data.pipeline

    @property
    def pipeline_run(self) -> PipelineRun:
        return self.plan_data.pipeline_run

    @property
    def run_id(self) -> str:
        return self.pipeline_run.run_id

    @property
    def run_config(self) -> Mapping[str, object]:
        return self.pipeline_run.run_config

    @property
    def pipeline_name(self) -> str:
        return self.pipeline_run.pipeline_name

    @property
    def job_name(self) -> str:
        return self.pipeline_name

    @property
    def instance(self) -> "DagsterInstance":
        return self.plan_data.instance

    @property
    def raise_on_error(self) -> bool:
        return self.plan_data.raise_on_error

    @property
    def retry_mode(self) -> RetryMode:
        return self.plan_data.retry_mode

    @property
    def execution_plan(self):
        return self.plan_data.execution_plan

    @property
    @abstractmethod
    def output_capture(self) -> Optional[Dict[StepOutputHandle, Any]]:
        raise NotImplementedError()

    @property
    def log(self) -> DagsterLogManager:
        raise NotImplementedError()

    @property
    def logging_tags(self) -> Dict[str, str]:
        return self.log.logging_metadata.to_tags()

    def has_tag(self, key: str) -> bool:
        check.str_param(key, "key")
        return key in self.log.logging_metadata.pipeline_tags

    def get_tag(self, key: str) -> Optional[str]:
        check.str_param(key, "key")
        return self.log.logging_metadata.pipeline_tags.get(key)


class PlanData(NamedTuple):
    """The data about a run that is available during both orchestration and execution.

    This object does not contain any information that requires access to user code, such as the
    pipeline definition and resources.
    """

    pipeline: IPipeline
    pipeline_run: PipelineRun
    instance: "DagsterInstance"
    execution_plan: "ExecutionPlan"
    raise_on_error: bool = False
    retry_mode: RetryMode = RetryMode.DISABLED


class ExecutionData(NamedTuple):
    """The data that is available to the system during execution.

    This object contains information that requires access to user code, such as the pipeline
    definition and resources.
    """

    scoped_resources_builder: ScopedResourcesBuilder
    resolved_run_config: ResolvedRunConfig
    pipeline_def: PipelineDefinition
    mode_def: ModeDefinition


class IStepContext(IPlanContext):
    """Interface to represent data to be available during either step orchestration or execution."""

    @property
    @abstractmethod
    def step(self) -> ExecutionStep:
        raise NotImplementedError()

    @property
    @abstractmethod
    def solid_handle(self) -> "NodeHandle":
        raise NotImplementedError()


class PlanOrchestrationContext(IPlanContext):
    """Context for the orchestration of a run.

    This context assumes inability to run user code directly.
    """

    def __init__(
        self,
        plan_data: PlanData,
        log_manager: DagsterLogManager,
        executor: Executor,
        output_capture: Optional[Dict[StepOutputHandle, Any]],
        resume_from_failure: bool = False,
    ):
        self._plan_data = plan_data
        self._log_manager = log_manager
        self._executor = executor
        self._output_capture = output_capture
        self._resume_from_failure = resume_from_failure

    @property
    def plan_data(self) -> PlanData:
        return self._plan_data

    @property
    def reconstructable_pipeline(self) -> ReconstructablePipeline:
        if not isinstance(self.pipeline, ReconstructablePipeline):
            raise DagsterInvariantViolationError(
                "reconstructable_pipeline property must be a ReconstructablePipeline"
            )
        return self.pipeline

    @property
    def log(self) -> DagsterLogManager:
        return self._log_manager

    @property
    def executor(self) -> Executor:
        return self._executor

    @property
    def output_capture(self) -> Optional[Dict[StepOutputHandle, Any]]:
        return self._output_capture

    def for_step(self, step: ExecutionStep) -> "IStepContext":
        return StepOrchestrationContext(
            plan_data=self.plan_data,
            log_manager=self._log_manager.with_tags(**step.logging_tags),
            executor=self.executor,
            step=step,
            output_capture=self.output_capture,
        )

    @property
    def resume_from_failure(self) -> bool:
        return self._resume_from_failure


class StepOrchestrationContext(PlanOrchestrationContext, IStepContext):
    """Context for the orchestration of a step.

    This context assumes inability to run user code directly. Thus, it does not include any resource
    information.
    """

    def __init__(self, plan_data, log_manager, executor, step, output_capture):
        super(StepOrchestrationContext, self).__init__(
            plan_data, log_manager, executor, output_capture
        )
        self._step = step

    @property
    def step(self) -> ExecutionStep:
        return self._step

    @property
    def solid_handle(self) -> "NodeHandle":
        return self.step.solid_handle


class PlanExecutionContext(IPlanContext):
    """Context for the execution of a plan.

    This context assumes that user code can be run directly, and thus includes resource and
    information.
    """

    def __init__(
        self,
        plan_data: PlanData,
        execution_data: ExecutionData,
        log_manager: DagsterLogManager,
        output_capture: Optional[Dict[StepOutputHandle, Any]] = None,
    ):
        self._plan_data = plan_data
        self._execution_data = execution_data
        self._log_manager = log_manager
        self._output_capture = output_capture

    @property
    def plan_data(self) -> PlanData:
        return self._plan_data

    @property
    def output_capture(self) -> Optional[Dict[StepOutputHandle, Any]]:
        return self._output_capture

    def for_step(self, step: ExecutionStep, previous_attempt_count: int = 0) -> IStepContext:

        return StepExecutionContext(
            plan_data=self.plan_data,
            execution_data=self._execution_data,
            log_manager=self._log_manager.with_tags(**step.logging_tags),
            step=step,
            output_capture=self.output_capture,
            previous_attempt_count=previous_attempt_count,
        )

    @property
    def pipeline_def(self) -> PipelineDefinition:
        return self._execution_data.pipeline_def

    @property
    def resolved_run_config(self) -> ResolvedRunConfig:
        return self._execution_data.resolved_run_config

    @property
    def scoped_resources_builder(self) -> ScopedResourcesBuilder:
        return self._execution_data.scoped_resources_builder

    @property
    def log(self) -> DagsterLogManager:
        return self._log_manager

    @property
    def partition_key(self) -> str:
        tags = self._plan_data.pipeline_run.tags
        check.invariant(
            PARTITION_NAME_TAG in tags, "Tried to access partition_key for a non-partitioned run"
        )
        return tags[PARTITION_NAME_TAG]

    @property
    def partition_time_window(self) -> str:
        pipeline_def = self._execution_data.pipeline_def
        if not isinstance(pipeline_def, JobDefinition):
            check.failed(
                # isinstance(pipeline_def, JobDefinition),
                "Can only call 'partition_time_window', when using jobs, not legacy pipelines",
            )
        partitions_def = pipeline_def.partitions_def

        if not isinstance(partitions_def, TimeWindowPartitionsDefinition):
            check.failed(
                f"Expected a TimeWindowPartitionsDefinition, but instead found {type(partitions_def)}",
            )

        # mypy thinks partitions_def is <nothing> here because ????
        return partitions_def.time_window_for_partition_key(self.partition_key)  # type: ignore

    @property
    def has_partition_key(self) -> bool:
        return PARTITION_NAME_TAG in self._plan_data.pipeline_run.tags

    def for_type(self, dagster_type: DagsterType) -> "TypeCheckContext":
        return TypeCheckContext(
            self.run_id, self.log, self._execution_data.scoped_resources_builder, dagster_type
        )


class StepExecutionContext(PlanExecutionContext, IStepContext):
    """Context for the execution of a step.

    This context assumes that user code can be run directly, and thus includes resource and
    information.
    """

    def __init__(
        self,
        plan_data: PlanData,
        execution_data: ExecutionData,
        log_manager: DagsterLogManager,
        step: ExecutionStep,
        output_capture: Optional[Dict[StepOutputHandle, Any]],
        previous_attempt_count: int,
    ):
        from dagster.core.execution.resources_init import get_required_resource_keys_for_step

        super(StepExecutionContext, self).__init__(
            plan_data=plan_data,
            execution_data=execution_data,
            log_manager=log_manager,
            output_capture=output_capture,
        )
        self._step = step
        self._required_resource_keys = get_required_resource_keys_for_step(
            plan_data.pipeline.get_definition(),
            step,
            plan_data.execution_plan,
        )
        self._resources = execution_data.scoped_resources_builder.build(
            self._required_resource_keys
        )
        self._previous_attempt_count = previous_attempt_count
        self._input_lineage: List[AssetLineageInfo] = []

        resources_iter = cast(Iterable, self._resources)

        step_launcher_resources = [
            resource for resource in resources_iter if isinstance(resource, StepLauncher)
        ]

        self._step_launcher: Optional[StepLauncher] = None
        if len(step_launcher_resources) > 1:
            raise DagsterInvariantViolationError(
                "Multiple required resources for {described_op} have inherited StepLauncher"
                "There should be at most one step launcher resource per {node_type}.".format(
                    described_op=self.describe_op(), node_type=self.solid_def.node_type_str
                )
            )
        elif len(step_launcher_resources) == 1:
            self._step_launcher = step_launcher_resources[0]

        self._step_exception: Optional[BaseException] = None

        self._step_output_capture: Optional[Dict[StepOutputHandle, Any]] = None
        # Enable step output capture if there are any hooks which will receive them.
        # Expect in the future that hooks may control whether or not they get outputs,
        # but for now presence of any will cause output capture.
        if self.pipeline_def.get_all_hooks_for_handle(self.solid_handle):
            self._step_output_capture = {}

        self._output_metadata: Dict[str, Any] = {}
        self._seen_outputs: Dict[str, Union[str, Set[str]]] = {}

    @property
    def step(self) -> ExecutionStep:
        return self._step

    @property
    def solid_handle(self) -> "NodeHandle":
        return self.step.solid_handle

    @property
    def required_resource_keys(self) -> Set[str]:
        return self._required_resource_keys

    @property
    def resources(self) -> "Resources":
        return self._resources

    @property
    def step_launcher(self) -> Optional[StepLauncher]:
        return self._step_launcher

    @property
    def solid_def(self) -> SolidDefinition:
        return self.solid.definition.ensure_solid_def()

    @property
    def pipeline_def(self) -> PipelineDefinition:
        return self._execution_data.pipeline_def

    @property
    def mode_def(self) -> ModeDefinition:
        return self._execution_data.mode_def

    @property
    def solid(self) -> "Node":
        return self.pipeline_def.get_solid(self._step.solid_handle)

    @property
    def solid_retry_policy(self) -> Optional[RetryPolicy]:
        return self.pipeline_def.get_retry_policy_for_handle(self.solid_handle)

    def describe_op(self):
        if isinstance(self.solid_def, OpDefinition):
            return f'op "{str(self.solid_handle)}"'

        return f'solid "{str(self.solid_handle)}"'

    def get_io_manager(self, step_output_handle) -> IOManager:
        step_output = self.execution_plan.get_step_output(step_output_handle)
        io_manager_key = (
            self.pipeline_def.get_solid(step_output.solid_handle)
            .output_def_named(step_output.name)
            .io_manager_key
        )

        output_manager = getattr(self.resources, io_manager_key)
        return check.inst(output_manager, IOManager)

    def get_output_context(self, step_output_handle) -> OutputContext:
        return get_output_context(
            self.execution_plan,
            self.pipeline_def,
            self.resolved_run_config,
            step_output_handle,
            self._get_source_run_id(step_output_handle),
            log_manager=self.log,
            step_context=self,
            resources=None,
            version=self.execution_plan.get_version_for_step_output_handle(step_output_handle),
        )

    def for_input_manager(
        self,
        name: str,
        config: Any,
        metadata: Any,
        dagster_type: DagsterType,
        source_handle: Optional[StepOutputHandle] = None,
        resource_config: Any = None,
        resources: Optional["Resources"] = None,
    ) -> InputContext:
        return InputContext(
            pipeline_name=self.pipeline_def.name,
            name=name,
            solid_def=self.solid_def,
            config=config,
            metadata=metadata,
            upstream_output=self.get_output_context(source_handle) if source_handle else None,
            dagster_type=dagster_type,
            log_manager=self.log,
            step_context=self,
            resource_config=resource_config,
            resources=resources,
        )

    def for_hook(self, hook_def: HookDefinition) -> "HookContext":
        from .hook import HookContext

        return HookContext(self, hook_def)

    def can_load(self, step_output_handle: StepOutputHandle) -> bool:
        # Whether IO Manager can load the source
        # FIXME https://github.com/dagster-io/dagster/issues/3511
        # This is a stopgap which asks the instance to check the event logs to find out step skipping

        from dagster.core.events import DagsterEventType

        # can load from upstream in the same run
        for record in self.instance.all_logs(self.run_id, of_type=DagsterEventType.STEP_OUTPUT):
            if step_output_handle == record.dagster_event.event_specific_data.step_output_handle:
                return True

        if (
            self._should_load_from_previous_runs(step_output_handle)
            # should and can load from a previous run
            and self._get_source_run_id_from_logs(step_output_handle)
        ):
            return True

        return False

    def observe_output(self, output_name: str, mapping_key: Optional[str] = None) -> None:
        if mapping_key:
            if output_name not in self._seen_outputs:
                self._seen_outputs[output_name] = set()
            cast(Set[str], self._seen_outputs[output_name]).add(mapping_key)
        else:
            self._seen_outputs[output_name] = "seen"

    def has_seen_output(self, output_name: str, mapping_key: Optional[str] = None) -> bool:
        if mapping_key:
            return (
                output_name in self._seen_outputs and mapping_key in self._seen_outputs[output_name]
            )
        return output_name in self._seen_outputs

    def add_output_metadata(
        self,
        metadata: Mapping[str, Any],
        output_name: Optional[str] = None,
        mapping_key: Optional[str] = None,
    ) -> None:

        if output_name is None and len(self.solid_def.output_defs) == 1:
            output_def = self.solid_def.output_defs[0]
            output_name = output_def.name
        elif output_name is None:
            raise DagsterInvariantViolationError(
                "Attempted to log metadata without providing output_name, but multiple outputs exist. Please provide an output_name to the invocation of `context.add_output_metadata`."
            )
        else:
            output_def = self.solid_def.output_def_named(output_name)

        if self.has_seen_output(output_name, mapping_key):
            output_desc = (
                f"output '{output_def.name}'"
                if not mapping_key
                else f"output '{output_def.name}' with mapping_key '{mapping_key}'"
            )
            raise DagsterInvariantViolationError(
                f"In {self.solid_def.node_type_str} '{self.solid.name}', attempted to log output metadata for {output_desc} which has already been yielded. Metadata must be logged before the output is yielded."
            )
        if output_def.is_dynamic and not mapping_key:
            raise DagsterInvariantViolationError(
                f"In {self.solid_def.node_type_str} '{self.solid.name}', attempted to log metadata for dynamic output '{output_def.name}' without providing a mapping key. When logging metadata for a dynamic output, it is necessary to provide a mapping key."
            )

        if output_name in self._output_metadata:
            if not mapping_key or mapping_key in self._output_metadata[output_name]:
                raise DagsterInvariantViolationError(
                    f"In {self.solid_def.node_type_str} '{self.solid.name}', attempted to log metadata for output '{output_name}' more than once."
                )
        if mapping_key:
            if not output_name in self._output_metadata:
                self._output_metadata[output_name] = {}
            self._output_metadata[output_name][mapping_key] = metadata

        else:
            self._output_metadata[output_name] = metadata

    def get_output_metadata(
        self, output_name: str, mapping_key: Optional[str] = None
    ) -> Optional[Mapping[str, Any]]:
        metadata = self._output_metadata.get(output_name)
        if mapping_key and metadata:
            return metadata.get(mapping_key)
        return metadata

    def _get_source_run_id_from_logs(self, step_output_handle: StepOutputHandle) -> Optional[str]:
        from dagster.core.events import DagsterEventType

        # walk through event logs to find the right run_id based on the run lineage
        run_group = self.instance.get_run_group(self.run_id)
        if run_group is None:
            check.failed(f"Failed to load run group {self.run_id}")

        _, runs = run_group
        run_id_to_parent_run_id = {run.run_id: run.parent_run_id for run in runs}
        source_run_id = self.pipeline_run.parent_run_id
        while source_run_id:
            # note: this would cost N db calls where N = number of parent runs
            step_output_record = self.instance.all_logs(
                source_run_id, of_type=DagsterEventType.STEP_OUTPUT
            )
            # if the parent run has yielded an StepOutput event for the given step output,
            # we find the source run id
            for r in step_output_record:
                if r.dagster_event.step_output_data.step_output_handle == step_output_handle:
                    return source_run_id
            # else, keep looking backwards
            source_run_id = run_id_to_parent_run_id.get(source_run_id)

        # When a fixed path is provided via io manager, it's able to run step subset using an execution
        # plan when the ascendant outputs were not previously created by dagster-controlled
        # computations. for example, in backfills, with fixed path io manager, we allow users to
        # "re-execute" runs with steps where the outputs weren't previously stored by dagster.

        # Warn about this special case because it will also reach here when all previous runs have
        # skipped yielding this output. From the logs, we have no easy way to differentiate the fixed
        # path case and the skipping case, until we record the skipping info in KnownExecutionState,
        # i.e. resolve https://github.com/dagster-io/dagster/issues/3511
        self.log.warn(
            f"No previously stored outputs found for source {step_output_handle}. "
            "This is either because you are using an IO Manager that does not depend on run ID, "
            "or because all the previous runs have skipped the output in conditional execution."
        )
        return None

    def _should_load_from_previous_runs(self, step_output_handle: StepOutputHandle) -> bool:
        return (  # this is re-execution
            self.pipeline_run.parent_run_id is not None
            # we are not re-executing the entire pipeline
            and self.pipeline_run.step_keys_to_execute is not None
            # this step is not being executed
            and step_output_handle.step_key not in self.pipeline_run.step_keys_to_execute
        )

    def _get_source_run_id(self, step_output_handle: StepOutputHandle) -> Optional[str]:
        if self._should_load_from_previous_runs(step_output_handle):
            return self._get_source_run_id_from_logs(step_output_handle)
        else:
            return self.pipeline_run.run_id

    def capture_step_exception(self, exception: BaseException):
        self._step_exception = check.inst_param(exception, "exception", BaseException)

    @property
    def step_exception(self) -> Optional[BaseException]:
        return self._step_exception

    @property
    def step_output_capture(self) -> Optional[Dict[StepOutputHandle, Any]]:
        return self._step_output_capture

    @property
    def previous_attempt_count(self) -> int:
        return self._previous_attempt_count

    @property
    def op_config(self) -> Any:
        solid_config = self.resolved_run_config.solids.get(str(self.solid_handle))
        return solid_config.config if solid_config else None

    def has_asset_partitions_for_input(self, input_name: str) -> bool:
        op_config = self.op_config
        if op_config is not None and "assets" in op_config:
            all_input_asset_partitions = op_config["assets"].get("input_partitions")
            if all_input_asset_partitions is not None:
                this_input_asset_partitions = all_input_asset_partitions.get(input_name)
                if this_input_asset_partitions is not None:
                    return True

        return False

    def asset_partition_key_range_for_input(self, input_name: str) -> PartitionKeyRange:
        op_config = self.op_config
        if op_config is not None and "assets" in op_config:
            all_input_asset_partitions = op_config["assets"].get("input_partitions")
            if all_input_asset_partitions is not None:
                this_input_asset_partitions = all_input_asset_partitions.get(input_name)
                if this_input_asset_partitions is not None:
                    return PartitionKeyRange(
                        this_input_asset_partitions["start"], this_input_asset_partitions["end"]
                    )

        check.failed("The input has no asset partitions")

    def asset_partition_key_for_input(self, input_name: str) -> str:
        start, end = self.asset_partition_key_range_for_input(input_name)
        if start == end:
            return start
        else:
            check.failed(
                f"Tried to access partition key for input '{input_name}' of step '{self.step.key}', "
                f"but the step input has a partition range: '{start}' to '{end}'."
            )

    def has_asset_partitions_for_output(self, output_name: str) -> bool:
        op_config = self.op_config
        if op_config is not None and "assets" in op_config:
            all_output_asset_partitions = op_config["assets"].get("output_partitions")
            if all_output_asset_partitions is not None:
                this_output_asset_partitions = all_output_asset_partitions.get(output_name)
                if this_output_asset_partitions is not None:
                    return True

        return False

    def asset_partition_key_range_for_output(self, output_name: str) -> PartitionKeyRange:
        op_config = self.op_config
        if op_config is not None and "assets" in op_config:
            all_output_asset_partitions = op_config["assets"].get("output_partitions")
            if all_output_asset_partitions is not None:
                this_output_asset_partitions = all_output_asset_partitions.get(output_name)
                if this_output_asset_partitions is not None:
                    return PartitionKeyRange(
                        this_output_asset_partitions["start"], this_output_asset_partitions["end"]
                    )

        check.failed("The output has no asset partitions")

    def asset_partition_key_for_output(self, output_name: str) -> str:
        start, end = self.asset_partition_key_range_for_output(output_name)
        if start == end:
            return start
        else:
            check.failed(
                f"Tried to access partition key for output '{output_name}' of step '{self.step.key}', "
                f"but the step output has a partition range: '{start}' to '{end}'."
            )

    def asset_partitions_time_window_for_output(self, output_name: str) -> TimeWindow:
        """The time window for the partitions of the asset correponding to the given output.

        Raises an error if either of the following are true:
        - The output asset has no partitioning.
        - The output asset is not partitioned with a TimeWindowPartitionsDefinition.
        """
        asset_info = self.pipeline_def.asset_layer.asset_info_for_output(
            self.solid_handle, output_name
        )
        partitions_def = asset_info.partitions_def if asset_info else None

        if not partitions_def:
            raise ValueError(
                "Tried to get asset partitions for an output that does not correspond to a "
                "partitioned asset."
            )

        if not isinstance(partitions_def, TimeWindowPartitionsDefinition):
            raise ValueError(
                "Tried to get asset partitions for an output that correponds to a partitioned "
                "asset that is not partitioned with a TimeWindowPartitionsDefinition."
            )
        partition_key_range = self.asset_partition_key_range_for_output(output_name)
        return TimeWindow(
            # mypy thinks partitions_def is <nothing> here because ????
            partitions_def.time_window_for_partition_key(partition_key_range.start).start,  # type: ignore
            partitions_def.time_window_for_partition_key(partition_key_range.end).end,  # type: ignore
        )

    def get_input_lineage(self) -> List[AssetLineageInfo]:
        if not self._input_lineage:

            for step_input in self.step.step_inputs:
                input_def = self.solid_def.input_def_named(step_input.name)
                dagster_type = input_def.dagster_type

                if dagster_type.is_nothing:
                    continue

                self._input_lineage.extend(step_input.source.get_asset_lineage(self, input_def))

        self._input_lineage = _dedup_asset_lineage(self._input_lineage)

        return self._input_lineage


def _dedup_asset_lineage(asset_lineage: List[AssetLineageInfo]) -> List[AssetLineageInfo]:
    """Method to remove duplicate specifications of the same Asset/Partition pair from the lineage
    information. Duplicates can occur naturally when calculating transitive dependencies from solids
    with multiple Outputs, which in turn have multiple Inputs (because each Output of the solid will
    inherit all dependencies from all of the solid Inputs).
    """
    key_partition_mapping: Dict[AssetKey, Set[str]] = defaultdict(set)

    for lineage_info in asset_lineage:
        if not lineage_info.partitions:
            key_partition_mapping[lineage_info.asset_key] |= set()
        for partition in lineage_info.partitions:
            key_partition_mapping[lineage_info.asset_key].add(partition)
    return [
        AssetLineageInfo(asset_key=asset_key, partitions=partitions)
        for asset_key, partitions in key_partition_mapping.items()
    ]


class TypeCheckContext:
    """The ``context`` object available to a type check function on a DagsterType.

    Attributes:
        log (DagsterLogManager): Centralized log dispatch from user code.
        resources (Any): An object whose attributes contain the resources available to this op.
        run_id (str): The id of this job run.
    """

    def __init__(
        self,
        run_id: str,
        log_manager: DagsterLogManager,
        scoped_resources_builder: ScopedResourcesBuilder,
        dagster_type: DagsterType,
    ):
        self._run_id = run_id
        self._log = log_manager
        self._resources = scoped_resources_builder.build(dagster_type.required_resource_keys)

    @property
    def resources(self) -> "Resources":
        return self._resources

    @property
    def run_id(self) -> str:
        return self._run_id

    @property
    def log(self) -> DagsterLogManager:
        return self._log
