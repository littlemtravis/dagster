import os
from typing import Dict, NamedTuple, Optional, Union

import yaml

from dagster import check
from dagster.serdes import ConfigurableClassData, class_from_code_pointer, whitelist_for_serdes

from .config import DAGSTER_CONFIG_YAML_FILENAME, dagster_instance_config


def compute_logs_directory(base):
    return os.path.join(base, "storage")


def _runs_directory(base):
    return os.path.join(base, "history", "")


def _event_logs_directory(base):
    return os.path.join(base, "history", "runs", "")


def _schedule_directory(base):
    return os.path.join(base, "schedules")


def configurable_class_data(config_field):
    return ConfigurableClassData(
        check.str_elem(config_field, "module"),
        check.str_elem(config_field, "class"),
        yaml.dump(check.opt_dict_elem(config_field, "config"), default_flow_style=False),
    )


def configurable_class_data_or_default(config_value, field_name, default):
    return (
        configurable_class_data(config_value[field_name])
        if config_value.get(field_name)
        else default
    )


@whitelist_for_serdes
class LegacyStorageRef(
    NamedTuple(
        "_LegacyStorageRef",
        [
            ("run_storage_data", ConfigurableClassData),
            ("event_storage_data", ConfigurableClassData),
            ("schedule_storage_data", ConfigurableClassData),
        ],
    )
):
    def __new__(
        cls,
        run_storage_data: ConfigurableClassData,
        event_storage_data: ConfigurableClassData,
        schedule_storage_data: Optional[ConfigurableClassData],
    ):
        return super(cls, LegacyStorageRef).__new__(
            cls,
            run_storage_data=check.inst_param(
                run_storage_data, "run_storage_data", ConfigurableClassData
            ),
            event_storage_data=check.inst_param(
                event_storage_data, "event_storage_data", ConfigurableClassData
            ),
            schedule_storage_data=check.opt_inst_param(
                schedule_storage_data, "schedule_storage_data", ConfigurableClassData
            ),
        )

    def rehydrate(self):
        from dagster.core.storage.legacy_storage import LegacyStorage

        return LegacyStorage(
            self.run_storage_data.rehydrate(),
            self.event_storage_data.rehydrate(),
            self.schedule_storage_data.rehydrate() if self.schedule_storage_data else None,
        )


@whitelist_for_serdes
class InstanceRef(
    NamedTuple(
        "_InstanceRef",
        [
            ("local_artifact_storage_data", ConfigurableClassData),
            ("storage_data", Union[ConfigurableClassData, LegacyStorageRef]),
            ("compute_logs_data", ConfigurableClassData),
            ("scheduler_data", Optional[ConfigurableClassData]),
            ("run_coordinator_data", Optional[ConfigurableClassData]),
            ("run_launcher_data", Optional[ConfigurableClassData]),
            ("settings", Dict[str, object]),
            ("custom_instance_class_data", Optional[ConfigurableClassData]),
        ],
    )
):
    """Serializable representation of a :py:class:`DagsterInstance`.

    Users should not instantiate this class directly.
    """

    def __new__(
        cls,
        local_artifact_storage_data: ConfigurableClassData,
        storage_data: Union[ConfigurableClassData, LegacyStorageRef],
        compute_logs_data: ConfigurableClassData,
        scheduler_data: Optional[ConfigurableClassData],
        run_coordinator_data: Optional[ConfigurableClassData],
        run_launcher_data: Optional[ConfigurableClassData],
        settings: Dict[str, object],
        custom_instance_class_data: Optional[ConfigurableClassData] = None,
    ):
        return super(cls, InstanceRef).__new__(
            cls,
            local_artifact_storage_data=check.inst_param(
                local_artifact_storage_data, "local_artifact_storage_data", ConfigurableClassData
            ),
            storage_data=check.inst_param(
                storage_data, "storage_data", (ConfigurableClassData, LegacyStorageRef)
            ),
            compute_logs_data=check.inst_param(
                compute_logs_data, "compute_logs_data", ConfigurableClassData
            ),
            scheduler_data=check.opt_inst_param(
                scheduler_data, "scheduler_data", ConfigurableClassData
            ),
            run_coordinator_data=check.opt_inst_param(
                run_coordinator_data, "run_coordinator_data", ConfigurableClassData
            ),
            run_launcher_data=check.opt_inst_param(
                run_launcher_data, "run_launcher_data", ConfigurableClassData
            ),
            settings=check.opt_dict_param(settings, "settings", key_type=str),
            custom_instance_class_data=check.opt_inst_param(
                custom_instance_class_data,
                "instance_class",
                ConfigurableClassData,
            ),
        )

    @staticmethod
    def config_defaults(base_dir):
        return {
            "local_artifact_storage": ConfigurableClassData(
                "dagster.core.storage.root",
                "LocalArtifactStorage",
                yaml.dump({"base_dir": base_dir}, default_flow_style=False),
            ),
            "storage": ConfigurableClassData(
                "dagster.core.storage.sqlite_storage",
                "DagsterSqliteStorage",
                yaml.dump({"base_dir": base_dir}, default_flow_style=False),
            ),
            "compute_logs": ConfigurableClassData(
                "dagster.core.storage.local_compute_log_manager",
                "LocalComputeLogManager",
                yaml.dump({"base_dir": compute_logs_directory(base_dir)}, default_flow_style=False),
            ),
            "scheduler": ConfigurableClassData(
                "dagster.core.scheduler",
                "DagsterDaemonScheduler",
                yaml.dump({}),
            ),
            "run_coordinator": ConfigurableClassData(
                "dagster.core.run_coordinator", "DefaultRunCoordinator", yaml.dump({})
            ),
            "run_launcher": ConfigurableClassData(
                "dagster",
                "DefaultRunLauncher",
                yaml.dump({}),
            ),
            # LEGACY DEFAULTS
            "run_storage": ConfigurableClassData(
                "dagster.core.storage.runs",
                "SqliteRunStorage",
                yaml.dump({"base_dir": _runs_directory(base_dir)}, default_flow_style=False),
            ),
            "event_log_storage": ConfigurableClassData(
                "dagster.core.storage.event_log",
                "SqliteEventLogStorage",
                yaml.dump({"base_dir": _event_logs_directory(base_dir)}, default_flow_style=False),
            ),
            "schedule_storage": ConfigurableClassData(
                "dagster.core.storage.schedules",
                "SqliteScheduleStorage",
                yaml.dump({"base_dir": _schedule_directory(base_dir)}, default_flow_style=False),
            ),
        }

    @staticmethod
    def from_dir(base_dir, config_filename=DAGSTER_CONFIG_YAML_FILENAME, overrides=None):
        overrides = check.opt_dict_param(overrides, "overrides")
        config_value, custom_instance_class = dagster_instance_config(
            base_dir, config_filename=config_filename, overrides=overrides
        )

        if custom_instance_class:
            config_keys = set(custom_instance_class.config_schema().keys())
            custom_instance_class_config = {
                key: val for key, val in config_value.items() if key in config_keys
            }
            custom_instance_class_data = ConfigurableClassData(
                config_value["instance_class"]["module"],
                config_value["instance_class"]["class"],
                yaml.dump(custom_instance_class_config, default_flow_style=False),
            )
            defaults = custom_instance_class.config_defaults(base_dir)
        else:
            custom_instance_class_data = None
            defaults = InstanceRef.config_defaults(base_dir)

        local_artifact_storage_data = configurable_class_data_or_default(
            config_value, "local_artifact_storage", defaults["local_artifact_storage"]
        )

        compute_logs_data = configurable_class_data_or_default(
            config_value,
            "compute_logs",
            defaults["compute_logs"],
        )

        has_legacy_storage = (
            config_value.get("run_storage")
            or config_value.get("event_log_storage")
            or config_value.get("schedule_storage")
        )

        if has_legacy_storage:
            storage_data = LegacyStorageRef(
                run_storage_data=configurable_class_data_or_default(
                    config_value, "run_storage", defaults["run_storage"]
                ),
                event_storage_data=configurable_class_data_or_default(
                    config_value, "event_log_storage", defaults["event_log_storage"]
                ),
                schedule_storage_data=configurable_class_data_or_default(
                    config_value, "schedule_storage", defaults["schedule_storage"]
                ),
            )
        elif config_value.get("storage"):
            storage_data = configurable_class_data(config_value["storage"])
        else:
            storage_data = defaults["storage"]

        scheduler_data = configurable_class_data_or_default(
            config_value, "scheduler", defaults["scheduler"]
        )

        run_coordinator_data = configurable_class_data_or_default(
            config_value,
            "run_coordinator",
            defaults["run_coordinator"],
        )

        run_launcher_data = configurable_class_data_or_default(
            config_value,
            "run_launcher",
            defaults["run_launcher"],
        )

        settings_keys = {"telemetry", "python_logs", "run_monitoring", "code_servers"}
        settings = {key: config_value.get(key) for key in settings_keys if config_value.get(key)}

        return InstanceRef(
            local_artifact_storage_data=local_artifact_storage_data,
            storage_data=storage_data,
            compute_logs_data=compute_logs_data,
            scheduler_data=scheduler_data,
            run_coordinator_data=run_coordinator_data,
            run_launcher_data=run_launcher_data,
            settings=settings,
            custom_instance_class_data=custom_instance_class_data,
        )

    @staticmethod
    def from_dict(instance_ref_dict):
        def value_for_ref_item(k, v):
            if v is None:
                return None
            if k == "settings":
                return v
            return ConfigurableClassData(*v)

        return InstanceRef(**{k: value_for_ref_item(k, v) for k, v in instance_ref_dict.items()})

    @property
    def local_artifact_storage(self):
        return self.local_artifact_storage_data.rehydrate()

    @property
    def storage(self):
        return self.storage_data.rehydrate()

    @property
    def compute_log_manager(self):
        return self.compute_logs_data.rehydrate()

    @property
    def scheduler(self):
        return self.scheduler_data.rehydrate() if self.scheduler_data else None

    @property
    def run_coordinator(self):
        return self.run_coordinator_data.rehydrate() if self.run_coordinator_data else None

    @property
    def run_launcher(self):
        return self.run_launcher_data.rehydrate() if self.run_launcher_data else None

    @property
    def custom_instance_class(self):
        return (
            class_from_code_pointer(
                self.custom_instance_class_data.module_name,
                self.custom_instance_class_data.class_name,
            )
            if self.custom_instance_class_data
            else None
        )

    @property
    def custom_instance_class_config(self):
        return (
            self.custom_instance_class_data.config_dict if self.custom_instance_class_data else {}
        )

    def to_dict(self):
        return self._asdict()
