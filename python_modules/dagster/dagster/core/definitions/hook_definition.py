from typing import AbstractSet, Any, Callable, NamedTuple, Optional

import dagster._check as check

from ..decorator_utils import get_function_params
from ..errors import DagsterInvalidInvocationError
from .utils import check_valid_name


class HookDefinition(
    NamedTuple(
        "_HookDefinition",
        [
            ("name", str),
            ("hook_fn", Callable),
            ("required_resource_keys", AbstractSet[str]),
            ("decorated_fn", Optional[Callable]),
        ],
    )
):
    """Define a hook which can be triggered during a op execution (e.g. a callback on the step
    execution failure event during a op execution).

    Args:
        name (str): The name of this hook.
        hook_fn (Callable): The callback function that will be triggered.
        required_resource_keys (Optional[AbstractSet[str]]): Keys for the resources required by the
            hook.
    """

    def __new__(
        cls,
        name: str,
        hook_fn: Callable[..., Any],
        required_resource_keys: Optional[AbstractSet[str]] = None,
        decorated_fn: Optional[Callable[..., Any]] = None,
    ):
        return super(HookDefinition, cls).__new__(
            cls,
            name=check_valid_name(name),
            hook_fn=check.callable_param(hook_fn, "hook_fn"),
            required_resource_keys=frozenset(
                check.opt_set_param(required_resource_keys, "required_resource_keys", of_type=str)
            ),
            decorated_fn=check.opt_callable_param(decorated_fn, "decorated_fn"),
        )

    def __call__(self, *args, **kwargs):
        """This is invoked when the hook is used as a decorator.

        We currently support hooks to decorate the following:

        - PipelineDefinition: when the hook decorates a job definition, it will be added to
            all the op invocations within the job.

        Example:
            .. code-block:: python

                @success_hook
                def slack_message_on_success(_):
                    ...

                @slack_message_on_success
                @job
                def a_job():
                    foo(bar())

        """
        from ..execution.context.hook import HookContext
        from .graph_definition import GraphDefinition
        from .hook_invocation import hook_invocation_result
        from .pipeline_definition import PipelineDefinition

        if len(args) > 0 and isinstance(args[0], (PipelineDefinition, GraphDefinition)):
            # when it decorates a pipeline, we apply this hook to all the solid invocations within
            # the pipeline.
            return args[0].with_hooks({self})
        else:
            if not self.decorated_fn:
                raise DagsterInvalidInvocationError(
                    "Only hook definitions created using one of the hook decorators can be invoked."
                )
            fxn_args = get_function_params(self.decorated_fn)
            # If decorated fxn has two arguments, then this is an event list hook fxn, and parameter
            # names are always context and event_list
            if len(fxn_args) == 2:
                context_arg_name = fxn_args[0].name
                event_list_arg_name = fxn_args[1].name
                if len(args) + len(kwargs) != 2:
                    raise DagsterInvalidInvocationError(
                        "Decorated function expects two parameters, context and event_list, but "
                        f"{len(args) + len(kwargs)} were provided."
                    )
                if args:
                    context = check.opt_inst_param(args[0], "context", HookContext)
                    event_list = check.opt_list_param(
                        args[1] if len(args) > 1 else kwargs[event_list_arg_name],
                        event_list_arg_name,
                    )
                else:
                    if context_arg_name not in kwargs:
                        raise DagsterInvalidInvocationError(
                            f"Could not find expected argument '{context_arg_name}'. Provided "
                            f"kwargs: {list(kwargs.keys())}"
                        )
                    if event_list_arg_name not in kwargs:
                        raise DagsterInvalidInvocationError(
                            f"Could not find expected argument '{event_list_arg_name}'. Provided "
                            f"kwargs: {list(kwargs.keys())}"
                        )
                    context = check.opt_inst_param(
                        kwargs[context_arg_name], context_arg_name, HookContext
                    )
                    event_list = check.opt_list_param(
                        kwargs[event_list_arg_name], event_list_arg_name
                    )
                return hook_invocation_result(self, context, event_list)
            else:
                context_arg_name = fxn_args[0].name
                if len(args) + len(kwargs) != 1:
                    raise DagsterInvalidInvocationError(
                        f"Decorated function expects one parameter, {context_arg_name}, but "
                        f"{len(args) + len(kwargs)} were provided."
                    )
                if args:
                    context = check.opt_inst_param(args[0], context_arg_name, HookContext)
                else:
                    if context_arg_name not in kwargs:
                        raise DagsterInvalidInvocationError(
                            f"Could not find expected argument '{context_arg_name}'. Provided "
                            f"kwargs: {list(kwargs.keys())}"
                        )
                    context = check.opt_inst_param(
                        kwargs[context_arg_name], context_arg_name, HookContext
                    )
                return hook_invocation_result(self, context)
