/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LogLevel, DagsterEventType, ErrorSource, ObjectStoreOperationType } from "./../../types/globalTypes";

// ====================================================
// GraphQL subscription operation: PipelineRunLogsSubscription
// ====================================================

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepSkippedEvent {
  __typename: "ExecutionStepSkippedEvent" | "ExecutionStepStartEvent" | "ExecutionStepSuccessEvent" | "ExecutionStepRestartEvent" | "LogMessageEvent" | "RunStartEvent" | "RunEnqueuedEvent" | "RunDequeuedEvent" | "RunStartingEvent" | "RunCancelingEvent" | "RunCanceledEvent" | "RunSuccessEvent" | "HookCompletedEvent" | "HookSkippedEvent" | "AlertStartEvent" | "AlertSuccessEvent" | "AlertFailureEvent" | "AssetMaterializationPlannedEvent";
  runId: string;
  message: string;
  timestamp: string;
  level: LogLevel;
  stepKey: string | null;
  eventType: DagsterEventType | null;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_MaterializationEvent_assetKey {
  __typename: "AssetKey";
  path: string[];
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_MaterializationEvent_metadataEntries_PathMetadataEntry {
  __typename: "PathMetadataEntry";
  label: string;
  description: string | null;
  path: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_MaterializationEvent_metadataEntries_JsonMetadataEntry {
  __typename: "JsonMetadataEntry";
  label: string;
  description: string | null;
  jsonString: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_MaterializationEvent_metadataEntries_UrlMetadataEntry {
  __typename: "UrlMetadataEntry";
  label: string;
  description: string | null;
  url: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_MaterializationEvent_metadataEntries_TextMetadataEntry {
  __typename: "TextMetadataEntry";
  label: string;
  description: string | null;
  text: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_MaterializationEvent_metadataEntries_MarkdownMetadataEntry {
  __typename: "MarkdownMetadataEntry";
  label: string;
  description: string | null;
  mdStr: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_MaterializationEvent_metadataEntries_PythonArtifactMetadataEntry {
  __typename: "PythonArtifactMetadataEntry";
  label: string;
  description: string | null;
  module: string;
  name: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_MaterializationEvent_metadataEntries_FloatMetadataEntry {
  __typename: "FloatMetadataEntry";
  label: string;
  description: string | null;
  floatValue: number | null;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_MaterializationEvent_metadataEntries_IntMetadataEntry {
  __typename: "IntMetadataEntry";
  label: string;
  description: string | null;
  intValue: number | null;
  intRepr: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_MaterializationEvent_metadataEntries_BoolMetadataEntry {
  __typename: "BoolMetadataEntry";
  label: string;
  description: string | null;
  boolValue: boolean | null;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_MaterializationEvent_metadataEntries_PipelineRunMetadataEntry {
  __typename: "PipelineRunMetadataEntry";
  label: string;
  description: string | null;
  runId: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_MaterializationEvent_metadataEntries_AssetMetadataEntry_assetKey {
  __typename: "AssetKey";
  path: string[];
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_MaterializationEvent_metadataEntries_AssetMetadataEntry {
  __typename: "AssetMetadataEntry";
  label: string;
  description: string | null;
  assetKey: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_MaterializationEvent_metadataEntries_AssetMetadataEntry_assetKey;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_MaterializationEvent_metadataEntries_TableMetadataEntry_table_schema_columns_constraints {
  __typename: "TableColumnConstraints";
  nullable: boolean;
  unique: boolean;
  other: string[];
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_MaterializationEvent_metadataEntries_TableMetadataEntry_table_schema_columns {
  __typename: "TableColumn";
  name: string;
  description: string | null;
  type: string;
  constraints: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_MaterializationEvent_metadataEntries_TableMetadataEntry_table_schema_columns_constraints;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_MaterializationEvent_metadataEntries_TableMetadataEntry_table_schema_constraints {
  __typename: "TableConstraints";
  other: string[];
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_MaterializationEvent_metadataEntries_TableMetadataEntry_table_schema {
  __typename: "TableSchema";
  columns: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_MaterializationEvent_metadataEntries_TableMetadataEntry_table_schema_columns[];
  constraints: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_MaterializationEvent_metadataEntries_TableMetadataEntry_table_schema_constraints | null;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_MaterializationEvent_metadataEntries_TableMetadataEntry_table {
  __typename: "Table";
  records: string[];
  schema: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_MaterializationEvent_metadataEntries_TableMetadataEntry_table_schema;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_MaterializationEvent_metadataEntries_TableMetadataEntry {
  __typename: "TableMetadataEntry";
  label: string;
  description: string | null;
  table: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_MaterializationEvent_metadataEntries_TableMetadataEntry_table;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_MaterializationEvent_metadataEntries_TableSchemaMetadataEntry_schema_columns_constraints {
  __typename: "TableColumnConstraints";
  nullable: boolean;
  unique: boolean;
  other: string[];
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_MaterializationEvent_metadataEntries_TableSchemaMetadataEntry_schema_columns {
  __typename: "TableColumn";
  name: string;
  description: string | null;
  type: string;
  constraints: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_MaterializationEvent_metadataEntries_TableSchemaMetadataEntry_schema_columns_constraints;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_MaterializationEvent_metadataEntries_TableSchemaMetadataEntry_schema_constraints {
  __typename: "TableConstraints";
  other: string[];
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_MaterializationEvent_metadataEntries_TableSchemaMetadataEntry_schema {
  __typename: "TableSchema";
  columns: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_MaterializationEvent_metadataEntries_TableSchemaMetadataEntry_schema_columns[];
  constraints: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_MaterializationEvent_metadataEntries_TableSchemaMetadataEntry_schema_constraints | null;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_MaterializationEvent_metadataEntries_TableSchemaMetadataEntry {
  __typename: "TableSchemaMetadataEntry";
  label: string;
  description: string | null;
  schema: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_MaterializationEvent_metadataEntries_TableSchemaMetadataEntry_schema;
}

export type PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_MaterializationEvent_metadataEntries = PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_MaterializationEvent_metadataEntries_PathMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_MaterializationEvent_metadataEntries_JsonMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_MaterializationEvent_metadataEntries_UrlMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_MaterializationEvent_metadataEntries_TextMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_MaterializationEvent_metadataEntries_MarkdownMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_MaterializationEvent_metadataEntries_PythonArtifactMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_MaterializationEvent_metadataEntries_FloatMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_MaterializationEvent_metadataEntries_IntMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_MaterializationEvent_metadataEntries_BoolMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_MaterializationEvent_metadataEntries_PipelineRunMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_MaterializationEvent_metadataEntries_AssetMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_MaterializationEvent_metadataEntries_TableMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_MaterializationEvent_metadataEntries_TableSchemaMetadataEntry;

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_MaterializationEvent {
  __typename: "MaterializationEvent";
  runId: string;
  message: string;
  timestamp: string;
  level: LogLevel;
  stepKey: string | null;
  eventType: DagsterEventType | null;
  assetKey: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_MaterializationEvent_assetKey | null;
  label: string;
  description: string | null;
  metadataEntries: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_MaterializationEvent_metadataEntries[];
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObservationEvent_assetKey {
  __typename: "AssetKey";
  path: string[];
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObservationEvent_metadataEntries_PathMetadataEntry {
  __typename: "PathMetadataEntry";
  label: string;
  description: string | null;
  path: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObservationEvent_metadataEntries_JsonMetadataEntry {
  __typename: "JsonMetadataEntry";
  label: string;
  description: string | null;
  jsonString: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObservationEvent_metadataEntries_UrlMetadataEntry {
  __typename: "UrlMetadataEntry";
  label: string;
  description: string | null;
  url: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObservationEvent_metadataEntries_TextMetadataEntry {
  __typename: "TextMetadataEntry";
  label: string;
  description: string | null;
  text: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObservationEvent_metadataEntries_MarkdownMetadataEntry {
  __typename: "MarkdownMetadataEntry";
  label: string;
  description: string | null;
  mdStr: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObservationEvent_metadataEntries_PythonArtifactMetadataEntry {
  __typename: "PythonArtifactMetadataEntry";
  label: string;
  description: string | null;
  module: string;
  name: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObservationEvent_metadataEntries_FloatMetadataEntry {
  __typename: "FloatMetadataEntry";
  label: string;
  description: string | null;
  floatValue: number | null;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObservationEvent_metadataEntries_IntMetadataEntry {
  __typename: "IntMetadataEntry";
  label: string;
  description: string | null;
  intValue: number | null;
  intRepr: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObservationEvent_metadataEntries_BoolMetadataEntry {
  __typename: "BoolMetadataEntry";
  label: string;
  description: string | null;
  boolValue: boolean | null;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObservationEvent_metadataEntries_PipelineRunMetadataEntry {
  __typename: "PipelineRunMetadataEntry";
  label: string;
  description: string | null;
  runId: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObservationEvent_metadataEntries_AssetMetadataEntry_assetKey {
  __typename: "AssetKey";
  path: string[];
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObservationEvent_metadataEntries_AssetMetadataEntry {
  __typename: "AssetMetadataEntry";
  label: string;
  description: string | null;
  assetKey: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObservationEvent_metadataEntries_AssetMetadataEntry_assetKey;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObservationEvent_metadataEntries_TableMetadataEntry_table_schema_columns_constraints {
  __typename: "TableColumnConstraints";
  nullable: boolean;
  unique: boolean;
  other: string[];
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObservationEvent_metadataEntries_TableMetadataEntry_table_schema_columns {
  __typename: "TableColumn";
  name: string;
  description: string | null;
  type: string;
  constraints: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObservationEvent_metadataEntries_TableMetadataEntry_table_schema_columns_constraints;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObservationEvent_metadataEntries_TableMetadataEntry_table_schema_constraints {
  __typename: "TableConstraints";
  other: string[];
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObservationEvent_metadataEntries_TableMetadataEntry_table_schema {
  __typename: "TableSchema";
  columns: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObservationEvent_metadataEntries_TableMetadataEntry_table_schema_columns[];
  constraints: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObservationEvent_metadataEntries_TableMetadataEntry_table_schema_constraints | null;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObservationEvent_metadataEntries_TableMetadataEntry_table {
  __typename: "Table";
  records: string[];
  schema: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObservationEvent_metadataEntries_TableMetadataEntry_table_schema;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObservationEvent_metadataEntries_TableMetadataEntry {
  __typename: "TableMetadataEntry";
  label: string;
  description: string | null;
  table: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObservationEvent_metadataEntries_TableMetadataEntry_table;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObservationEvent_metadataEntries_TableSchemaMetadataEntry_schema_columns_constraints {
  __typename: "TableColumnConstraints";
  nullable: boolean;
  unique: boolean;
  other: string[];
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObservationEvent_metadataEntries_TableSchemaMetadataEntry_schema_columns {
  __typename: "TableColumn";
  name: string;
  description: string | null;
  type: string;
  constraints: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObservationEvent_metadataEntries_TableSchemaMetadataEntry_schema_columns_constraints;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObservationEvent_metadataEntries_TableSchemaMetadataEntry_schema_constraints {
  __typename: "TableConstraints";
  other: string[];
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObservationEvent_metadataEntries_TableSchemaMetadataEntry_schema {
  __typename: "TableSchema";
  columns: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObservationEvent_metadataEntries_TableSchemaMetadataEntry_schema_columns[];
  constraints: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObservationEvent_metadataEntries_TableSchemaMetadataEntry_schema_constraints | null;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObservationEvent_metadataEntries_TableSchemaMetadataEntry {
  __typename: "TableSchemaMetadataEntry";
  label: string;
  description: string | null;
  schema: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObservationEvent_metadataEntries_TableSchemaMetadataEntry_schema;
}

export type PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObservationEvent_metadataEntries = PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObservationEvent_metadataEntries_PathMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObservationEvent_metadataEntries_JsonMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObservationEvent_metadataEntries_UrlMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObservationEvent_metadataEntries_TextMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObservationEvent_metadataEntries_MarkdownMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObservationEvent_metadataEntries_PythonArtifactMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObservationEvent_metadataEntries_FloatMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObservationEvent_metadataEntries_IntMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObservationEvent_metadataEntries_BoolMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObservationEvent_metadataEntries_PipelineRunMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObservationEvent_metadataEntries_AssetMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObservationEvent_metadataEntries_TableMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObservationEvent_metadataEntries_TableSchemaMetadataEntry;

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObservationEvent {
  __typename: "ObservationEvent";
  runId: string;
  message: string;
  timestamp: string;
  level: LogLevel;
  stepKey: string | null;
  eventType: DagsterEventType | null;
  assetKey: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObservationEvent_assetKey | null;
  label: string;
  description: string | null;
  metadataEntries: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObservationEvent_metadataEntries[];
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_RunFailureEvent_pipelineFailureError_cause {
  __typename: "PythonError";
  message: string;
  stack: string[];
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_RunFailureEvent_pipelineFailureError {
  __typename: "PythonError";
  message: string;
  stack: string[];
  cause: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_RunFailureEvent_pipelineFailureError_cause | null;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_RunFailureEvent {
  __typename: "RunFailureEvent";
  runId: string;
  message: string;
  timestamp: string;
  level: LogLevel;
  stepKey: string | null;
  eventType: DagsterEventType | null;
  pipelineFailureError: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_RunFailureEvent_pipelineFailureError | null;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepFailureEvent_error_cause {
  __typename: "PythonError";
  message: string;
  stack: string[];
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepFailureEvent_error {
  __typename: "PythonError";
  message: string;
  stack: string[];
  cause: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepFailureEvent_error_cause | null;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepFailureEvent_failureMetadata_metadataEntries_PathMetadataEntry {
  __typename: "PathMetadataEntry";
  label: string;
  description: string | null;
  path: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepFailureEvent_failureMetadata_metadataEntries_JsonMetadataEntry {
  __typename: "JsonMetadataEntry";
  label: string;
  description: string | null;
  jsonString: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepFailureEvent_failureMetadata_metadataEntries_UrlMetadataEntry {
  __typename: "UrlMetadataEntry";
  label: string;
  description: string | null;
  url: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepFailureEvent_failureMetadata_metadataEntries_TextMetadataEntry {
  __typename: "TextMetadataEntry";
  label: string;
  description: string | null;
  text: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepFailureEvent_failureMetadata_metadataEntries_MarkdownMetadataEntry {
  __typename: "MarkdownMetadataEntry";
  label: string;
  description: string | null;
  mdStr: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepFailureEvent_failureMetadata_metadataEntries_PythonArtifactMetadataEntry {
  __typename: "PythonArtifactMetadataEntry";
  label: string;
  description: string | null;
  module: string;
  name: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepFailureEvent_failureMetadata_metadataEntries_FloatMetadataEntry {
  __typename: "FloatMetadataEntry";
  label: string;
  description: string | null;
  floatValue: number | null;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepFailureEvent_failureMetadata_metadataEntries_IntMetadataEntry {
  __typename: "IntMetadataEntry";
  label: string;
  description: string | null;
  intValue: number | null;
  intRepr: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepFailureEvent_failureMetadata_metadataEntries_BoolMetadataEntry {
  __typename: "BoolMetadataEntry";
  label: string;
  description: string | null;
  boolValue: boolean | null;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepFailureEvent_failureMetadata_metadataEntries_PipelineRunMetadataEntry {
  __typename: "PipelineRunMetadataEntry";
  label: string;
  description: string | null;
  runId: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepFailureEvent_failureMetadata_metadataEntries_AssetMetadataEntry_assetKey {
  __typename: "AssetKey";
  path: string[];
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepFailureEvent_failureMetadata_metadataEntries_AssetMetadataEntry {
  __typename: "AssetMetadataEntry";
  label: string;
  description: string | null;
  assetKey: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepFailureEvent_failureMetadata_metadataEntries_AssetMetadataEntry_assetKey;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepFailureEvent_failureMetadata_metadataEntries_TableMetadataEntry_table_schema_columns_constraints {
  __typename: "TableColumnConstraints";
  nullable: boolean;
  unique: boolean;
  other: string[];
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepFailureEvent_failureMetadata_metadataEntries_TableMetadataEntry_table_schema_columns {
  __typename: "TableColumn";
  name: string;
  description: string | null;
  type: string;
  constraints: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepFailureEvent_failureMetadata_metadataEntries_TableMetadataEntry_table_schema_columns_constraints;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepFailureEvent_failureMetadata_metadataEntries_TableMetadataEntry_table_schema_constraints {
  __typename: "TableConstraints";
  other: string[];
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepFailureEvent_failureMetadata_metadataEntries_TableMetadataEntry_table_schema {
  __typename: "TableSchema";
  columns: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepFailureEvent_failureMetadata_metadataEntries_TableMetadataEntry_table_schema_columns[];
  constraints: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepFailureEvent_failureMetadata_metadataEntries_TableMetadataEntry_table_schema_constraints | null;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepFailureEvent_failureMetadata_metadataEntries_TableMetadataEntry_table {
  __typename: "Table";
  records: string[];
  schema: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepFailureEvent_failureMetadata_metadataEntries_TableMetadataEntry_table_schema;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepFailureEvent_failureMetadata_metadataEntries_TableMetadataEntry {
  __typename: "TableMetadataEntry";
  label: string;
  description: string | null;
  table: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepFailureEvent_failureMetadata_metadataEntries_TableMetadataEntry_table;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepFailureEvent_failureMetadata_metadataEntries_TableSchemaMetadataEntry_schema_columns_constraints {
  __typename: "TableColumnConstraints";
  nullable: boolean;
  unique: boolean;
  other: string[];
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepFailureEvent_failureMetadata_metadataEntries_TableSchemaMetadataEntry_schema_columns {
  __typename: "TableColumn";
  name: string;
  description: string | null;
  type: string;
  constraints: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepFailureEvent_failureMetadata_metadataEntries_TableSchemaMetadataEntry_schema_columns_constraints;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepFailureEvent_failureMetadata_metadataEntries_TableSchemaMetadataEntry_schema_constraints {
  __typename: "TableConstraints";
  other: string[];
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepFailureEvent_failureMetadata_metadataEntries_TableSchemaMetadataEntry_schema {
  __typename: "TableSchema";
  columns: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepFailureEvent_failureMetadata_metadataEntries_TableSchemaMetadataEntry_schema_columns[];
  constraints: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepFailureEvent_failureMetadata_metadataEntries_TableSchemaMetadataEntry_schema_constraints | null;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepFailureEvent_failureMetadata_metadataEntries_TableSchemaMetadataEntry {
  __typename: "TableSchemaMetadataEntry";
  label: string;
  description: string | null;
  schema: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepFailureEvent_failureMetadata_metadataEntries_TableSchemaMetadataEntry_schema;
}

export type PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepFailureEvent_failureMetadata_metadataEntries = PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepFailureEvent_failureMetadata_metadataEntries_PathMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepFailureEvent_failureMetadata_metadataEntries_JsonMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepFailureEvent_failureMetadata_metadataEntries_UrlMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepFailureEvent_failureMetadata_metadataEntries_TextMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepFailureEvent_failureMetadata_metadataEntries_MarkdownMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepFailureEvent_failureMetadata_metadataEntries_PythonArtifactMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepFailureEvent_failureMetadata_metadataEntries_FloatMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepFailureEvent_failureMetadata_metadataEntries_IntMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepFailureEvent_failureMetadata_metadataEntries_BoolMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepFailureEvent_failureMetadata_metadataEntries_PipelineRunMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepFailureEvent_failureMetadata_metadataEntries_AssetMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepFailureEvent_failureMetadata_metadataEntries_TableMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepFailureEvent_failureMetadata_metadataEntries_TableSchemaMetadataEntry;

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepFailureEvent_failureMetadata {
  __typename: "FailureMetadata";
  metadataEntries: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepFailureEvent_failureMetadata_metadataEntries[];
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepFailureEvent {
  __typename: "ExecutionStepFailureEvent";
  runId: string;
  message: string;
  timestamp: string;
  level: LogLevel;
  stepKey: string | null;
  eventType: DagsterEventType | null;
  error: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepFailureEvent_error | null;
  errorSource: ErrorSource | null;
  failureMetadata: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepFailureEvent_failureMetadata | null;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepUpForRetryEvent_error_cause {
  __typename: "PythonError";
  message: string;
  stack: string[];
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepUpForRetryEvent_error {
  __typename: "PythonError";
  message: string;
  stack: string[];
  cause: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepUpForRetryEvent_error_cause | null;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepUpForRetryEvent {
  __typename: "ExecutionStepUpForRetryEvent";
  runId: string;
  message: string;
  timestamp: string;
  level: LogLevel;
  stepKey: string | null;
  eventType: DagsterEventType | null;
  error: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepUpForRetryEvent_error | null;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepInputEvent_typeCheck_metadataEntries_PathMetadataEntry {
  __typename: "PathMetadataEntry";
  label: string;
  description: string | null;
  path: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepInputEvent_typeCheck_metadataEntries_JsonMetadataEntry {
  __typename: "JsonMetadataEntry";
  label: string;
  description: string | null;
  jsonString: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepInputEvent_typeCheck_metadataEntries_UrlMetadataEntry {
  __typename: "UrlMetadataEntry";
  label: string;
  description: string | null;
  url: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepInputEvent_typeCheck_metadataEntries_TextMetadataEntry {
  __typename: "TextMetadataEntry";
  label: string;
  description: string | null;
  text: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepInputEvent_typeCheck_metadataEntries_MarkdownMetadataEntry {
  __typename: "MarkdownMetadataEntry";
  label: string;
  description: string | null;
  mdStr: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepInputEvent_typeCheck_metadataEntries_PythonArtifactMetadataEntry {
  __typename: "PythonArtifactMetadataEntry";
  label: string;
  description: string | null;
  module: string;
  name: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepInputEvent_typeCheck_metadataEntries_FloatMetadataEntry {
  __typename: "FloatMetadataEntry";
  label: string;
  description: string | null;
  floatValue: number | null;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepInputEvent_typeCheck_metadataEntries_IntMetadataEntry {
  __typename: "IntMetadataEntry";
  label: string;
  description: string | null;
  intValue: number | null;
  intRepr: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepInputEvent_typeCheck_metadataEntries_BoolMetadataEntry {
  __typename: "BoolMetadataEntry";
  label: string;
  description: string | null;
  boolValue: boolean | null;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepInputEvent_typeCheck_metadataEntries_PipelineRunMetadataEntry {
  __typename: "PipelineRunMetadataEntry";
  label: string;
  description: string | null;
  runId: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepInputEvent_typeCheck_metadataEntries_AssetMetadataEntry_assetKey {
  __typename: "AssetKey";
  path: string[];
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepInputEvent_typeCheck_metadataEntries_AssetMetadataEntry {
  __typename: "AssetMetadataEntry";
  label: string;
  description: string | null;
  assetKey: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepInputEvent_typeCheck_metadataEntries_AssetMetadataEntry_assetKey;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepInputEvent_typeCheck_metadataEntries_TableMetadataEntry_table_schema_columns_constraints {
  __typename: "TableColumnConstraints";
  nullable: boolean;
  unique: boolean;
  other: string[];
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepInputEvent_typeCheck_metadataEntries_TableMetadataEntry_table_schema_columns {
  __typename: "TableColumn";
  name: string;
  description: string | null;
  type: string;
  constraints: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepInputEvent_typeCheck_metadataEntries_TableMetadataEntry_table_schema_columns_constraints;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepInputEvent_typeCheck_metadataEntries_TableMetadataEntry_table_schema_constraints {
  __typename: "TableConstraints";
  other: string[];
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepInputEvent_typeCheck_metadataEntries_TableMetadataEntry_table_schema {
  __typename: "TableSchema";
  columns: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepInputEvent_typeCheck_metadataEntries_TableMetadataEntry_table_schema_columns[];
  constraints: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepInputEvent_typeCheck_metadataEntries_TableMetadataEntry_table_schema_constraints | null;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepInputEvent_typeCheck_metadataEntries_TableMetadataEntry_table {
  __typename: "Table";
  records: string[];
  schema: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepInputEvent_typeCheck_metadataEntries_TableMetadataEntry_table_schema;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepInputEvent_typeCheck_metadataEntries_TableMetadataEntry {
  __typename: "TableMetadataEntry";
  label: string;
  description: string | null;
  table: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepInputEvent_typeCheck_metadataEntries_TableMetadataEntry_table;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepInputEvent_typeCheck_metadataEntries_TableSchemaMetadataEntry_schema_columns_constraints {
  __typename: "TableColumnConstraints";
  nullable: boolean;
  unique: boolean;
  other: string[];
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepInputEvent_typeCheck_metadataEntries_TableSchemaMetadataEntry_schema_columns {
  __typename: "TableColumn";
  name: string;
  description: string | null;
  type: string;
  constraints: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepInputEvent_typeCheck_metadataEntries_TableSchemaMetadataEntry_schema_columns_constraints;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepInputEvent_typeCheck_metadataEntries_TableSchemaMetadataEntry_schema_constraints {
  __typename: "TableConstraints";
  other: string[];
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepInputEvent_typeCheck_metadataEntries_TableSchemaMetadataEntry_schema {
  __typename: "TableSchema";
  columns: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepInputEvent_typeCheck_metadataEntries_TableSchemaMetadataEntry_schema_columns[];
  constraints: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepInputEvent_typeCheck_metadataEntries_TableSchemaMetadataEntry_schema_constraints | null;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepInputEvent_typeCheck_metadataEntries_TableSchemaMetadataEntry {
  __typename: "TableSchemaMetadataEntry";
  label: string;
  description: string | null;
  schema: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepInputEvent_typeCheck_metadataEntries_TableSchemaMetadataEntry_schema;
}

export type PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepInputEvent_typeCheck_metadataEntries = PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepInputEvent_typeCheck_metadataEntries_PathMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepInputEvent_typeCheck_metadataEntries_JsonMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepInputEvent_typeCheck_metadataEntries_UrlMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepInputEvent_typeCheck_metadataEntries_TextMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepInputEvent_typeCheck_metadataEntries_MarkdownMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepInputEvent_typeCheck_metadataEntries_PythonArtifactMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepInputEvent_typeCheck_metadataEntries_FloatMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepInputEvent_typeCheck_metadataEntries_IntMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepInputEvent_typeCheck_metadataEntries_BoolMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepInputEvent_typeCheck_metadataEntries_PipelineRunMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepInputEvent_typeCheck_metadataEntries_AssetMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepInputEvent_typeCheck_metadataEntries_TableMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepInputEvent_typeCheck_metadataEntries_TableSchemaMetadataEntry;

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepInputEvent_typeCheck {
  __typename: "TypeCheck";
  label: string;
  description: string | null;
  success: boolean;
  metadataEntries: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepInputEvent_typeCheck_metadataEntries[];
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepInputEvent {
  __typename: "ExecutionStepInputEvent";
  runId: string;
  message: string;
  timestamp: string;
  level: LogLevel;
  stepKey: string | null;
  eventType: DagsterEventType | null;
  inputName: string;
  typeCheck: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepInputEvent_typeCheck;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_typeCheck_metadataEntries_PathMetadataEntry {
  __typename: "PathMetadataEntry";
  label: string;
  description: string | null;
  path: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_typeCheck_metadataEntries_JsonMetadataEntry {
  __typename: "JsonMetadataEntry";
  label: string;
  description: string | null;
  jsonString: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_typeCheck_metadataEntries_UrlMetadataEntry {
  __typename: "UrlMetadataEntry";
  label: string;
  description: string | null;
  url: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_typeCheck_metadataEntries_TextMetadataEntry {
  __typename: "TextMetadataEntry";
  label: string;
  description: string | null;
  text: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_typeCheck_metadataEntries_MarkdownMetadataEntry {
  __typename: "MarkdownMetadataEntry";
  label: string;
  description: string | null;
  mdStr: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_typeCheck_metadataEntries_PythonArtifactMetadataEntry {
  __typename: "PythonArtifactMetadataEntry";
  label: string;
  description: string | null;
  module: string;
  name: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_typeCheck_metadataEntries_FloatMetadataEntry {
  __typename: "FloatMetadataEntry";
  label: string;
  description: string | null;
  floatValue: number | null;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_typeCheck_metadataEntries_IntMetadataEntry {
  __typename: "IntMetadataEntry";
  label: string;
  description: string | null;
  intValue: number | null;
  intRepr: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_typeCheck_metadataEntries_BoolMetadataEntry {
  __typename: "BoolMetadataEntry";
  label: string;
  description: string | null;
  boolValue: boolean | null;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_typeCheck_metadataEntries_PipelineRunMetadataEntry {
  __typename: "PipelineRunMetadataEntry";
  label: string;
  description: string | null;
  runId: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_typeCheck_metadataEntries_AssetMetadataEntry_assetKey {
  __typename: "AssetKey";
  path: string[];
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_typeCheck_metadataEntries_AssetMetadataEntry {
  __typename: "AssetMetadataEntry";
  label: string;
  description: string | null;
  assetKey: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_typeCheck_metadataEntries_AssetMetadataEntry_assetKey;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_typeCheck_metadataEntries_TableMetadataEntry_table_schema_columns_constraints {
  __typename: "TableColumnConstraints";
  nullable: boolean;
  unique: boolean;
  other: string[];
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_typeCheck_metadataEntries_TableMetadataEntry_table_schema_columns {
  __typename: "TableColumn";
  name: string;
  description: string | null;
  type: string;
  constraints: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_typeCheck_metadataEntries_TableMetadataEntry_table_schema_columns_constraints;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_typeCheck_metadataEntries_TableMetadataEntry_table_schema_constraints {
  __typename: "TableConstraints";
  other: string[];
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_typeCheck_metadataEntries_TableMetadataEntry_table_schema {
  __typename: "TableSchema";
  columns: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_typeCheck_metadataEntries_TableMetadataEntry_table_schema_columns[];
  constraints: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_typeCheck_metadataEntries_TableMetadataEntry_table_schema_constraints | null;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_typeCheck_metadataEntries_TableMetadataEntry_table {
  __typename: "Table";
  records: string[];
  schema: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_typeCheck_metadataEntries_TableMetadataEntry_table_schema;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_typeCheck_metadataEntries_TableMetadataEntry {
  __typename: "TableMetadataEntry";
  label: string;
  description: string | null;
  table: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_typeCheck_metadataEntries_TableMetadataEntry_table;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_typeCheck_metadataEntries_TableSchemaMetadataEntry_schema_columns_constraints {
  __typename: "TableColumnConstraints";
  nullable: boolean;
  unique: boolean;
  other: string[];
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_typeCheck_metadataEntries_TableSchemaMetadataEntry_schema_columns {
  __typename: "TableColumn";
  name: string;
  description: string | null;
  type: string;
  constraints: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_typeCheck_metadataEntries_TableSchemaMetadataEntry_schema_columns_constraints;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_typeCheck_metadataEntries_TableSchemaMetadataEntry_schema_constraints {
  __typename: "TableConstraints";
  other: string[];
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_typeCheck_metadataEntries_TableSchemaMetadataEntry_schema {
  __typename: "TableSchema";
  columns: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_typeCheck_metadataEntries_TableSchemaMetadataEntry_schema_columns[];
  constraints: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_typeCheck_metadataEntries_TableSchemaMetadataEntry_schema_constraints | null;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_typeCheck_metadataEntries_TableSchemaMetadataEntry {
  __typename: "TableSchemaMetadataEntry";
  label: string;
  description: string | null;
  schema: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_typeCheck_metadataEntries_TableSchemaMetadataEntry_schema;
}

export type PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_typeCheck_metadataEntries = PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_typeCheck_metadataEntries_PathMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_typeCheck_metadataEntries_JsonMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_typeCheck_metadataEntries_UrlMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_typeCheck_metadataEntries_TextMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_typeCheck_metadataEntries_MarkdownMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_typeCheck_metadataEntries_PythonArtifactMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_typeCheck_metadataEntries_FloatMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_typeCheck_metadataEntries_IntMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_typeCheck_metadataEntries_BoolMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_typeCheck_metadataEntries_PipelineRunMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_typeCheck_metadataEntries_AssetMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_typeCheck_metadataEntries_TableMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_typeCheck_metadataEntries_TableSchemaMetadataEntry;

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_typeCheck {
  __typename: "TypeCheck";
  label: string;
  description: string | null;
  success: boolean;
  metadataEntries: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_typeCheck_metadataEntries[];
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_metadataEntries_PathMetadataEntry {
  __typename: "PathMetadataEntry";
  label: string;
  description: string | null;
  path: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_metadataEntries_JsonMetadataEntry {
  __typename: "JsonMetadataEntry";
  label: string;
  description: string | null;
  jsonString: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_metadataEntries_UrlMetadataEntry {
  __typename: "UrlMetadataEntry";
  label: string;
  description: string | null;
  url: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_metadataEntries_TextMetadataEntry {
  __typename: "TextMetadataEntry";
  label: string;
  description: string | null;
  text: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_metadataEntries_MarkdownMetadataEntry {
  __typename: "MarkdownMetadataEntry";
  label: string;
  description: string | null;
  mdStr: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_metadataEntries_PythonArtifactMetadataEntry {
  __typename: "PythonArtifactMetadataEntry";
  label: string;
  description: string | null;
  module: string;
  name: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_metadataEntries_FloatMetadataEntry {
  __typename: "FloatMetadataEntry";
  label: string;
  description: string | null;
  floatValue: number | null;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_metadataEntries_IntMetadataEntry {
  __typename: "IntMetadataEntry";
  label: string;
  description: string | null;
  intValue: number | null;
  intRepr: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_metadataEntries_BoolMetadataEntry {
  __typename: "BoolMetadataEntry";
  label: string;
  description: string | null;
  boolValue: boolean | null;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_metadataEntries_PipelineRunMetadataEntry {
  __typename: "PipelineRunMetadataEntry";
  label: string;
  description: string | null;
  runId: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_metadataEntries_AssetMetadataEntry_assetKey {
  __typename: "AssetKey";
  path: string[];
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_metadataEntries_AssetMetadataEntry {
  __typename: "AssetMetadataEntry";
  label: string;
  description: string | null;
  assetKey: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_metadataEntries_AssetMetadataEntry_assetKey;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_metadataEntries_TableMetadataEntry_table_schema_columns_constraints {
  __typename: "TableColumnConstraints";
  nullable: boolean;
  unique: boolean;
  other: string[];
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_metadataEntries_TableMetadataEntry_table_schema_columns {
  __typename: "TableColumn";
  name: string;
  description: string | null;
  type: string;
  constraints: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_metadataEntries_TableMetadataEntry_table_schema_columns_constraints;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_metadataEntries_TableMetadataEntry_table_schema_constraints {
  __typename: "TableConstraints";
  other: string[];
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_metadataEntries_TableMetadataEntry_table_schema {
  __typename: "TableSchema";
  columns: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_metadataEntries_TableMetadataEntry_table_schema_columns[];
  constraints: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_metadataEntries_TableMetadataEntry_table_schema_constraints | null;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_metadataEntries_TableMetadataEntry_table {
  __typename: "Table";
  records: string[];
  schema: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_metadataEntries_TableMetadataEntry_table_schema;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_metadataEntries_TableMetadataEntry {
  __typename: "TableMetadataEntry";
  label: string;
  description: string | null;
  table: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_metadataEntries_TableMetadataEntry_table;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_metadataEntries_TableSchemaMetadataEntry_schema_columns_constraints {
  __typename: "TableColumnConstraints";
  nullable: boolean;
  unique: boolean;
  other: string[];
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_metadataEntries_TableSchemaMetadataEntry_schema_columns {
  __typename: "TableColumn";
  name: string;
  description: string | null;
  type: string;
  constraints: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_metadataEntries_TableSchemaMetadataEntry_schema_columns_constraints;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_metadataEntries_TableSchemaMetadataEntry_schema_constraints {
  __typename: "TableConstraints";
  other: string[];
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_metadataEntries_TableSchemaMetadataEntry_schema {
  __typename: "TableSchema";
  columns: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_metadataEntries_TableSchemaMetadataEntry_schema_columns[];
  constraints: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_metadataEntries_TableSchemaMetadataEntry_schema_constraints | null;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_metadataEntries_TableSchemaMetadataEntry {
  __typename: "TableSchemaMetadataEntry";
  label: string;
  description: string | null;
  schema: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_metadataEntries_TableSchemaMetadataEntry_schema;
}

export type PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_metadataEntries = PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_metadataEntries_PathMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_metadataEntries_JsonMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_metadataEntries_UrlMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_metadataEntries_TextMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_metadataEntries_MarkdownMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_metadataEntries_PythonArtifactMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_metadataEntries_FloatMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_metadataEntries_IntMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_metadataEntries_BoolMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_metadataEntries_PipelineRunMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_metadataEntries_AssetMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_metadataEntries_TableMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_metadataEntries_TableSchemaMetadataEntry;

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent {
  __typename: "ExecutionStepOutputEvent";
  runId: string;
  message: string;
  timestamp: string;
  level: LogLevel;
  stepKey: string | null;
  eventType: DagsterEventType | null;
  outputName: string;
  typeCheck: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_typeCheck;
  metadataEntries: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent_metadataEntries[];
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_StepExpectationResultEvent_expectationResult_metadataEntries_PathMetadataEntry {
  __typename: "PathMetadataEntry";
  label: string;
  description: string | null;
  path: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_StepExpectationResultEvent_expectationResult_metadataEntries_JsonMetadataEntry {
  __typename: "JsonMetadataEntry";
  label: string;
  description: string | null;
  jsonString: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_StepExpectationResultEvent_expectationResult_metadataEntries_UrlMetadataEntry {
  __typename: "UrlMetadataEntry";
  label: string;
  description: string | null;
  url: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_StepExpectationResultEvent_expectationResult_metadataEntries_TextMetadataEntry {
  __typename: "TextMetadataEntry";
  label: string;
  description: string | null;
  text: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_StepExpectationResultEvent_expectationResult_metadataEntries_MarkdownMetadataEntry {
  __typename: "MarkdownMetadataEntry";
  label: string;
  description: string | null;
  mdStr: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_StepExpectationResultEvent_expectationResult_metadataEntries_PythonArtifactMetadataEntry {
  __typename: "PythonArtifactMetadataEntry";
  label: string;
  description: string | null;
  module: string;
  name: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_StepExpectationResultEvent_expectationResult_metadataEntries_FloatMetadataEntry {
  __typename: "FloatMetadataEntry";
  label: string;
  description: string | null;
  floatValue: number | null;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_StepExpectationResultEvent_expectationResult_metadataEntries_IntMetadataEntry {
  __typename: "IntMetadataEntry";
  label: string;
  description: string | null;
  intValue: number | null;
  intRepr: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_StepExpectationResultEvent_expectationResult_metadataEntries_BoolMetadataEntry {
  __typename: "BoolMetadataEntry";
  label: string;
  description: string | null;
  boolValue: boolean | null;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_StepExpectationResultEvent_expectationResult_metadataEntries_PipelineRunMetadataEntry {
  __typename: "PipelineRunMetadataEntry";
  label: string;
  description: string | null;
  runId: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_StepExpectationResultEvent_expectationResult_metadataEntries_AssetMetadataEntry_assetKey {
  __typename: "AssetKey";
  path: string[];
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_StepExpectationResultEvent_expectationResult_metadataEntries_AssetMetadataEntry {
  __typename: "AssetMetadataEntry";
  label: string;
  description: string | null;
  assetKey: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_StepExpectationResultEvent_expectationResult_metadataEntries_AssetMetadataEntry_assetKey;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_StepExpectationResultEvent_expectationResult_metadataEntries_TableMetadataEntry_table_schema_columns_constraints {
  __typename: "TableColumnConstraints";
  nullable: boolean;
  unique: boolean;
  other: string[];
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_StepExpectationResultEvent_expectationResult_metadataEntries_TableMetadataEntry_table_schema_columns {
  __typename: "TableColumn";
  name: string;
  description: string | null;
  type: string;
  constraints: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_StepExpectationResultEvent_expectationResult_metadataEntries_TableMetadataEntry_table_schema_columns_constraints;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_StepExpectationResultEvent_expectationResult_metadataEntries_TableMetadataEntry_table_schema_constraints {
  __typename: "TableConstraints";
  other: string[];
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_StepExpectationResultEvent_expectationResult_metadataEntries_TableMetadataEntry_table_schema {
  __typename: "TableSchema";
  columns: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_StepExpectationResultEvent_expectationResult_metadataEntries_TableMetadataEntry_table_schema_columns[];
  constraints: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_StepExpectationResultEvent_expectationResult_metadataEntries_TableMetadataEntry_table_schema_constraints | null;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_StepExpectationResultEvent_expectationResult_metadataEntries_TableMetadataEntry_table {
  __typename: "Table";
  records: string[];
  schema: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_StepExpectationResultEvent_expectationResult_metadataEntries_TableMetadataEntry_table_schema;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_StepExpectationResultEvent_expectationResult_metadataEntries_TableMetadataEntry {
  __typename: "TableMetadataEntry";
  label: string;
  description: string | null;
  table: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_StepExpectationResultEvent_expectationResult_metadataEntries_TableMetadataEntry_table;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_StepExpectationResultEvent_expectationResult_metadataEntries_TableSchemaMetadataEntry_schema_columns_constraints {
  __typename: "TableColumnConstraints";
  nullable: boolean;
  unique: boolean;
  other: string[];
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_StepExpectationResultEvent_expectationResult_metadataEntries_TableSchemaMetadataEntry_schema_columns {
  __typename: "TableColumn";
  name: string;
  description: string | null;
  type: string;
  constraints: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_StepExpectationResultEvent_expectationResult_metadataEntries_TableSchemaMetadataEntry_schema_columns_constraints;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_StepExpectationResultEvent_expectationResult_metadataEntries_TableSchemaMetadataEntry_schema_constraints {
  __typename: "TableConstraints";
  other: string[];
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_StepExpectationResultEvent_expectationResult_metadataEntries_TableSchemaMetadataEntry_schema {
  __typename: "TableSchema";
  columns: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_StepExpectationResultEvent_expectationResult_metadataEntries_TableSchemaMetadataEntry_schema_columns[];
  constraints: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_StepExpectationResultEvent_expectationResult_metadataEntries_TableSchemaMetadataEntry_schema_constraints | null;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_StepExpectationResultEvent_expectationResult_metadataEntries_TableSchemaMetadataEntry {
  __typename: "TableSchemaMetadataEntry";
  label: string;
  description: string | null;
  schema: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_StepExpectationResultEvent_expectationResult_metadataEntries_TableSchemaMetadataEntry_schema;
}

export type PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_StepExpectationResultEvent_expectationResult_metadataEntries = PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_StepExpectationResultEvent_expectationResult_metadataEntries_PathMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_StepExpectationResultEvent_expectationResult_metadataEntries_JsonMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_StepExpectationResultEvent_expectationResult_metadataEntries_UrlMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_StepExpectationResultEvent_expectationResult_metadataEntries_TextMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_StepExpectationResultEvent_expectationResult_metadataEntries_MarkdownMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_StepExpectationResultEvent_expectationResult_metadataEntries_PythonArtifactMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_StepExpectationResultEvent_expectationResult_metadataEntries_FloatMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_StepExpectationResultEvent_expectationResult_metadataEntries_IntMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_StepExpectationResultEvent_expectationResult_metadataEntries_BoolMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_StepExpectationResultEvent_expectationResult_metadataEntries_PipelineRunMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_StepExpectationResultEvent_expectationResult_metadataEntries_AssetMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_StepExpectationResultEvent_expectationResult_metadataEntries_TableMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_StepExpectationResultEvent_expectationResult_metadataEntries_TableSchemaMetadataEntry;

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_StepExpectationResultEvent_expectationResult {
  __typename: "ExpectationResult";
  success: boolean;
  label: string;
  description: string | null;
  metadataEntries: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_StepExpectationResultEvent_expectationResult_metadataEntries[];
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_StepExpectationResultEvent {
  __typename: "StepExpectationResultEvent";
  runId: string;
  message: string;
  timestamp: string;
  level: LogLevel;
  stepKey: string | null;
  eventType: DagsterEventType | null;
  expectationResult: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_StepExpectationResultEvent_expectationResult;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObjectStoreOperationEvent_operationResult_metadataEntries_PathMetadataEntry {
  __typename: "PathMetadataEntry";
  label: string;
  description: string | null;
  path: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObjectStoreOperationEvent_operationResult_metadataEntries_JsonMetadataEntry {
  __typename: "JsonMetadataEntry";
  label: string;
  description: string | null;
  jsonString: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObjectStoreOperationEvent_operationResult_metadataEntries_UrlMetadataEntry {
  __typename: "UrlMetadataEntry";
  label: string;
  description: string | null;
  url: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObjectStoreOperationEvent_operationResult_metadataEntries_TextMetadataEntry {
  __typename: "TextMetadataEntry";
  label: string;
  description: string | null;
  text: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObjectStoreOperationEvent_operationResult_metadataEntries_MarkdownMetadataEntry {
  __typename: "MarkdownMetadataEntry";
  label: string;
  description: string | null;
  mdStr: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObjectStoreOperationEvent_operationResult_metadataEntries_PythonArtifactMetadataEntry {
  __typename: "PythonArtifactMetadataEntry";
  label: string;
  description: string | null;
  module: string;
  name: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObjectStoreOperationEvent_operationResult_metadataEntries_FloatMetadataEntry {
  __typename: "FloatMetadataEntry";
  label: string;
  description: string | null;
  floatValue: number | null;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObjectStoreOperationEvent_operationResult_metadataEntries_IntMetadataEntry {
  __typename: "IntMetadataEntry";
  label: string;
  description: string | null;
  intValue: number | null;
  intRepr: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObjectStoreOperationEvent_operationResult_metadataEntries_BoolMetadataEntry {
  __typename: "BoolMetadataEntry";
  label: string;
  description: string | null;
  boolValue: boolean | null;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObjectStoreOperationEvent_operationResult_metadataEntries_PipelineRunMetadataEntry {
  __typename: "PipelineRunMetadataEntry";
  label: string;
  description: string | null;
  runId: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObjectStoreOperationEvent_operationResult_metadataEntries_AssetMetadataEntry_assetKey {
  __typename: "AssetKey";
  path: string[];
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObjectStoreOperationEvent_operationResult_metadataEntries_AssetMetadataEntry {
  __typename: "AssetMetadataEntry";
  label: string;
  description: string | null;
  assetKey: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObjectStoreOperationEvent_operationResult_metadataEntries_AssetMetadataEntry_assetKey;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObjectStoreOperationEvent_operationResult_metadataEntries_TableMetadataEntry_table_schema_columns_constraints {
  __typename: "TableColumnConstraints";
  nullable: boolean;
  unique: boolean;
  other: string[];
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObjectStoreOperationEvent_operationResult_metadataEntries_TableMetadataEntry_table_schema_columns {
  __typename: "TableColumn";
  name: string;
  description: string | null;
  type: string;
  constraints: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObjectStoreOperationEvent_operationResult_metadataEntries_TableMetadataEntry_table_schema_columns_constraints;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObjectStoreOperationEvent_operationResult_metadataEntries_TableMetadataEntry_table_schema_constraints {
  __typename: "TableConstraints";
  other: string[];
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObjectStoreOperationEvent_operationResult_metadataEntries_TableMetadataEntry_table_schema {
  __typename: "TableSchema";
  columns: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObjectStoreOperationEvent_operationResult_metadataEntries_TableMetadataEntry_table_schema_columns[];
  constraints: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObjectStoreOperationEvent_operationResult_metadataEntries_TableMetadataEntry_table_schema_constraints | null;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObjectStoreOperationEvent_operationResult_metadataEntries_TableMetadataEntry_table {
  __typename: "Table";
  records: string[];
  schema: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObjectStoreOperationEvent_operationResult_metadataEntries_TableMetadataEntry_table_schema;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObjectStoreOperationEvent_operationResult_metadataEntries_TableMetadataEntry {
  __typename: "TableMetadataEntry";
  label: string;
  description: string | null;
  table: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObjectStoreOperationEvent_operationResult_metadataEntries_TableMetadataEntry_table;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObjectStoreOperationEvent_operationResult_metadataEntries_TableSchemaMetadataEntry_schema_columns_constraints {
  __typename: "TableColumnConstraints";
  nullable: boolean;
  unique: boolean;
  other: string[];
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObjectStoreOperationEvent_operationResult_metadataEntries_TableSchemaMetadataEntry_schema_columns {
  __typename: "TableColumn";
  name: string;
  description: string | null;
  type: string;
  constraints: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObjectStoreOperationEvent_operationResult_metadataEntries_TableSchemaMetadataEntry_schema_columns_constraints;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObjectStoreOperationEvent_operationResult_metadataEntries_TableSchemaMetadataEntry_schema_constraints {
  __typename: "TableConstraints";
  other: string[];
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObjectStoreOperationEvent_operationResult_metadataEntries_TableSchemaMetadataEntry_schema {
  __typename: "TableSchema";
  columns: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObjectStoreOperationEvent_operationResult_metadataEntries_TableSchemaMetadataEntry_schema_columns[];
  constraints: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObjectStoreOperationEvent_operationResult_metadataEntries_TableSchemaMetadataEntry_schema_constraints | null;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObjectStoreOperationEvent_operationResult_metadataEntries_TableSchemaMetadataEntry {
  __typename: "TableSchemaMetadataEntry";
  label: string;
  description: string | null;
  schema: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObjectStoreOperationEvent_operationResult_metadataEntries_TableSchemaMetadataEntry_schema;
}

export type PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObjectStoreOperationEvent_operationResult_metadataEntries = PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObjectStoreOperationEvent_operationResult_metadataEntries_PathMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObjectStoreOperationEvent_operationResult_metadataEntries_JsonMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObjectStoreOperationEvent_operationResult_metadataEntries_UrlMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObjectStoreOperationEvent_operationResult_metadataEntries_TextMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObjectStoreOperationEvent_operationResult_metadataEntries_MarkdownMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObjectStoreOperationEvent_operationResult_metadataEntries_PythonArtifactMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObjectStoreOperationEvent_operationResult_metadataEntries_FloatMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObjectStoreOperationEvent_operationResult_metadataEntries_IntMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObjectStoreOperationEvent_operationResult_metadataEntries_BoolMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObjectStoreOperationEvent_operationResult_metadataEntries_PipelineRunMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObjectStoreOperationEvent_operationResult_metadataEntries_AssetMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObjectStoreOperationEvent_operationResult_metadataEntries_TableMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObjectStoreOperationEvent_operationResult_metadataEntries_TableSchemaMetadataEntry;

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObjectStoreOperationEvent_operationResult {
  __typename: "ObjectStoreOperationResult";
  op: ObjectStoreOperationType;
  metadataEntries: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObjectStoreOperationEvent_operationResult_metadataEntries[];
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObjectStoreOperationEvent {
  __typename: "ObjectStoreOperationEvent";
  runId: string;
  message: string;
  timestamp: string;
  level: LogLevel;
  stepKey: string | null;
  eventType: DagsterEventType | null;
  operationResult: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObjectStoreOperationEvent_operationResult;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_HandledOutputEvent_metadataEntries_PathMetadataEntry {
  __typename: "PathMetadataEntry";
  label: string;
  description: string | null;
  path: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_HandledOutputEvent_metadataEntries_JsonMetadataEntry {
  __typename: "JsonMetadataEntry";
  label: string;
  description: string | null;
  jsonString: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_HandledOutputEvent_metadataEntries_UrlMetadataEntry {
  __typename: "UrlMetadataEntry";
  label: string;
  description: string | null;
  url: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_HandledOutputEvent_metadataEntries_TextMetadataEntry {
  __typename: "TextMetadataEntry";
  label: string;
  description: string | null;
  text: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_HandledOutputEvent_metadataEntries_MarkdownMetadataEntry {
  __typename: "MarkdownMetadataEntry";
  label: string;
  description: string | null;
  mdStr: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_HandledOutputEvent_metadataEntries_PythonArtifactMetadataEntry {
  __typename: "PythonArtifactMetadataEntry";
  label: string;
  description: string | null;
  module: string;
  name: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_HandledOutputEvent_metadataEntries_FloatMetadataEntry {
  __typename: "FloatMetadataEntry";
  label: string;
  description: string | null;
  floatValue: number | null;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_HandledOutputEvent_metadataEntries_IntMetadataEntry {
  __typename: "IntMetadataEntry";
  label: string;
  description: string | null;
  intValue: number | null;
  intRepr: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_HandledOutputEvent_metadataEntries_BoolMetadataEntry {
  __typename: "BoolMetadataEntry";
  label: string;
  description: string | null;
  boolValue: boolean | null;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_HandledOutputEvent_metadataEntries_PipelineRunMetadataEntry {
  __typename: "PipelineRunMetadataEntry";
  label: string;
  description: string | null;
  runId: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_HandledOutputEvent_metadataEntries_AssetMetadataEntry_assetKey {
  __typename: "AssetKey";
  path: string[];
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_HandledOutputEvent_metadataEntries_AssetMetadataEntry {
  __typename: "AssetMetadataEntry";
  label: string;
  description: string | null;
  assetKey: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_HandledOutputEvent_metadataEntries_AssetMetadataEntry_assetKey;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_HandledOutputEvent_metadataEntries_TableMetadataEntry_table_schema_columns_constraints {
  __typename: "TableColumnConstraints";
  nullable: boolean;
  unique: boolean;
  other: string[];
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_HandledOutputEvent_metadataEntries_TableMetadataEntry_table_schema_columns {
  __typename: "TableColumn";
  name: string;
  description: string | null;
  type: string;
  constraints: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_HandledOutputEvent_metadataEntries_TableMetadataEntry_table_schema_columns_constraints;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_HandledOutputEvent_metadataEntries_TableMetadataEntry_table_schema_constraints {
  __typename: "TableConstraints";
  other: string[];
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_HandledOutputEvent_metadataEntries_TableMetadataEntry_table_schema {
  __typename: "TableSchema";
  columns: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_HandledOutputEvent_metadataEntries_TableMetadataEntry_table_schema_columns[];
  constraints: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_HandledOutputEvent_metadataEntries_TableMetadataEntry_table_schema_constraints | null;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_HandledOutputEvent_metadataEntries_TableMetadataEntry_table {
  __typename: "Table";
  records: string[];
  schema: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_HandledOutputEvent_metadataEntries_TableMetadataEntry_table_schema;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_HandledOutputEvent_metadataEntries_TableMetadataEntry {
  __typename: "TableMetadataEntry";
  label: string;
  description: string | null;
  table: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_HandledOutputEvent_metadataEntries_TableMetadataEntry_table;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_HandledOutputEvent_metadataEntries_TableSchemaMetadataEntry_schema_columns_constraints {
  __typename: "TableColumnConstraints";
  nullable: boolean;
  unique: boolean;
  other: string[];
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_HandledOutputEvent_metadataEntries_TableSchemaMetadataEntry_schema_columns {
  __typename: "TableColumn";
  name: string;
  description: string | null;
  type: string;
  constraints: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_HandledOutputEvent_metadataEntries_TableSchemaMetadataEntry_schema_columns_constraints;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_HandledOutputEvent_metadataEntries_TableSchemaMetadataEntry_schema_constraints {
  __typename: "TableConstraints";
  other: string[];
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_HandledOutputEvent_metadataEntries_TableSchemaMetadataEntry_schema {
  __typename: "TableSchema";
  columns: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_HandledOutputEvent_metadataEntries_TableSchemaMetadataEntry_schema_columns[];
  constraints: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_HandledOutputEvent_metadataEntries_TableSchemaMetadataEntry_schema_constraints | null;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_HandledOutputEvent_metadataEntries_TableSchemaMetadataEntry {
  __typename: "TableSchemaMetadataEntry";
  label: string;
  description: string | null;
  schema: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_HandledOutputEvent_metadataEntries_TableSchemaMetadataEntry_schema;
}

export type PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_HandledOutputEvent_metadataEntries = PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_HandledOutputEvent_metadataEntries_PathMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_HandledOutputEvent_metadataEntries_JsonMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_HandledOutputEvent_metadataEntries_UrlMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_HandledOutputEvent_metadataEntries_TextMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_HandledOutputEvent_metadataEntries_MarkdownMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_HandledOutputEvent_metadataEntries_PythonArtifactMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_HandledOutputEvent_metadataEntries_FloatMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_HandledOutputEvent_metadataEntries_IntMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_HandledOutputEvent_metadataEntries_BoolMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_HandledOutputEvent_metadataEntries_PipelineRunMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_HandledOutputEvent_metadataEntries_AssetMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_HandledOutputEvent_metadataEntries_TableMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_HandledOutputEvent_metadataEntries_TableSchemaMetadataEntry;

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_HandledOutputEvent {
  __typename: "HandledOutputEvent";
  runId: string;
  message: string;
  timestamp: string;
  level: LogLevel;
  stepKey: string | null;
  eventType: DagsterEventType | null;
  outputName: string;
  managerKey: string;
  metadataEntries: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_HandledOutputEvent_metadataEntries[];
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_LoadedInputEvent_metadataEntries_PathMetadataEntry {
  __typename: "PathMetadataEntry";
  label: string;
  description: string | null;
  path: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_LoadedInputEvent_metadataEntries_JsonMetadataEntry {
  __typename: "JsonMetadataEntry";
  label: string;
  description: string | null;
  jsonString: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_LoadedInputEvent_metadataEntries_UrlMetadataEntry {
  __typename: "UrlMetadataEntry";
  label: string;
  description: string | null;
  url: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_LoadedInputEvent_metadataEntries_TextMetadataEntry {
  __typename: "TextMetadataEntry";
  label: string;
  description: string | null;
  text: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_LoadedInputEvent_metadataEntries_MarkdownMetadataEntry {
  __typename: "MarkdownMetadataEntry";
  label: string;
  description: string | null;
  mdStr: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_LoadedInputEvent_metadataEntries_PythonArtifactMetadataEntry {
  __typename: "PythonArtifactMetadataEntry";
  label: string;
  description: string | null;
  module: string;
  name: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_LoadedInputEvent_metadataEntries_FloatMetadataEntry {
  __typename: "FloatMetadataEntry";
  label: string;
  description: string | null;
  floatValue: number | null;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_LoadedInputEvent_metadataEntries_IntMetadataEntry {
  __typename: "IntMetadataEntry";
  label: string;
  description: string | null;
  intValue: number | null;
  intRepr: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_LoadedInputEvent_metadataEntries_BoolMetadataEntry {
  __typename: "BoolMetadataEntry";
  label: string;
  description: string | null;
  boolValue: boolean | null;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_LoadedInputEvent_metadataEntries_PipelineRunMetadataEntry {
  __typename: "PipelineRunMetadataEntry";
  label: string;
  description: string | null;
  runId: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_LoadedInputEvent_metadataEntries_AssetMetadataEntry_assetKey {
  __typename: "AssetKey";
  path: string[];
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_LoadedInputEvent_metadataEntries_AssetMetadataEntry {
  __typename: "AssetMetadataEntry";
  label: string;
  description: string | null;
  assetKey: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_LoadedInputEvent_metadataEntries_AssetMetadataEntry_assetKey;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_LoadedInputEvent_metadataEntries_TableMetadataEntry_table_schema_columns_constraints {
  __typename: "TableColumnConstraints";
  nullable: boolean;
  unique: boolean;
  other: string[];
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_LoadedInputEvent_metadataEntries_TableMetadataEntry_table_schema_columns {
  __typename: "TableColumn";
  name: string;
  description: string | null;
  type: string;
  constraints: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_LoadedInputEvent_metadataEntries_TableMetadataEntry_table_schema_columns_constraints;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_LoadedInputEvent_metadataEntries_TableMetadataEntry_table_schema_constraints {
  __typename: "TableConstraints";
  other: string[];
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_LoadedInputEvent_metadataEntries_TableMetadataEntry_table_schema {
  __typename: "TableSchema";
  columns: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_LoadedInputEvent_metadataEntries_TableMetadataEntry_table_schema_columns[];
  constraints: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_LoadedInputEvent_metadataEntries_TableMetadataEntry_table_schema_constraints | null;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_LoadedInputEvent_metadataEntries_TableMetadataEntry_table {
  __typename: "Table";
  records: string[];
  schema: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_LoadedInputEvent_metadataEntries_TableMetadataEntry_table_schema;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_LoadedInputEvent_metadataEntries_TableMetadataEntry {
  __typename: "TableMetadataEntry";
  label: string;
  description: string | null;
  table: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_LoadedInputEvent_metadataEntries_TableMetadataEntry_table;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_LoadedInputEvent_metadataEntries_TableSchemaMetadataEntry_schema_columns_constraints {
  __typename: "TableColumnConstraints";
  nullable: boolean;
  unique: boolean;
  other: string[];
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_LoadedInputEvent_metadataEntries_TableSchemaMetadataEntry_schema_columns {
  __typename: "TableColumn";
  name: string;
  description: string | null;
  type: string;
  constraints: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_LoadedInputEvent_metadataEntries_TableSchemaMetadataEntry_schema_columns_constraints;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_LoadedInputEvent_metadataEntries_TableSchemaMetadataEntry_schema_constraints {
  __typename: "TableConstraints";
  other: string[];
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_LoadedInputEvent_metadataEntries_TableSchemaMetadataEntry_schema {
  __typename: "TableSchema";
  columns: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_LoadedInputEvent_metadataEntries_TableSchemaMetadataEntry_schema_columns[];
  constraints: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_LoadedInputEvent_metadataEntries_TableSchemaMetadataEntry_schema_constraints | null;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_LoadedInputEvent_metadataEntries_TableSchemaMetadataEntry {
  __typename: "TableSchemaMetadataEntry";
  label: string;
  description: string | null;
  schema: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_LoadedInputEvent_metadataEntries_TableSchemaMetadataEntry_schema;
}

export type PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_LoadedInputEvent_metadataEntries = PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_LoadedInputEvent_metadataEntries_PathMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_LoadedInputEvent_metadataEntries_JsonMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_LoadedInputEvent_metadataEntries_UrlMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_LoadedInputEvent_metadataEntries_TextMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_LoadedInputEvent_metadataEntries_MarkdownMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_LoadedInputEvent_metadataEntries_PythonArtifactMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_LoadedInputEvent_metadataEntries_FloatMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_LoadedInputEvent_metadataEntries_IntMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_LoadedInputEvent_metadataEntries_BoolMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_LoadedInputEvent_metadataEntries_PipelineRunMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_LoadedInputEvent_metadataEntries_AssetMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_LoadedInputEvent_metadataEntries_TableMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_LoadedInputEvent_metadataEntries_TableSchemaMetadataEntry;

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_LoadedInputEvent {
  __typename: "LoadedInputEvent";
  runId: string;
  message: string;
  timestamp: string;
  level: LogLevel;
  stepKey: string | null;
  eventType: DagsterEventType | null;
  inputName: string;
  managerKey: string;
  upstreamOutputName: string | null;
  upstreamStepKey: string | null;
  metadataEntries: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_LoadedInputEvent_metadataEntries[];
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_EngineEvent_metadataEntries_PathMetadataEntry {
  __typename: "PathMetadataEntry";
  label: string;
  description: string | null;
  path: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_EngineEvent_metadataEntries_JsonMetadataEntry {
  __typename: "JsonMetadataEntry";
  label: string;
  description: string | null;
  jsonString: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_EngineEvent_metadataEntries_UrlMetadataEntry {
  __typename: "UrlMetadataEntry";
  label: string;
  description: string | null;
  url: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_EngineEvent_metadataEntries_TextMetadataEntry {
  __typename: "TextMetadataEntry";
  label: string;
  description: string | null;
  text: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_EngineEvent_metadataEntries_MarkdownMetadataEntry {
  __typename: "MarkdownMetadataEntry";
  label: string;
  description: string | null;
  mdStr: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_EngineEvent_metadataEntries_PythonArtifactMetadataEntry {
  __typename: "PythonArtifactMetadataEntry";
  label: string;
  description: string | null;
  module: string;
  name: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_EngineEvent_metadataEntries_FloatMetadataEntry {
  __typename: "FloatMetadataEntry";
  label: string;
  description: string | null;
  floatValue: number | null;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_EngineEvent_metadataEntries_IntMetadataEntry {
  __typename: "IntMetadataEntry";
  label: string;
  description: string | null;
  intValue: number | null;
  intRepr: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_EngineEvent_metadataEntries_BoolMetadataEntry {
  __typename: "BoolMetadataEntry";
  label: string;
  description: string | null;
  boolValue: boolean | null;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_EngineEvent_metadataEntries_PipelineRunMetadataEntry {
  __typename: "PipelineRunMetadataEntry";
  label: string;
  description: string | null;
  runId: string;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_EngineEvent_metadataEntries_AssetMetadataEntry_assetKey {
  __typename: "AssetKey";
  path: string[];
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_EngineEvent_metadataEntries_AssetMetadataEntry {
  __typename: "AssetMetadataEntry";
  label: string;
  description: string | null;
  assetKey: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_EngineEvent_metadataEntries_AssetMetadataEntry_assetKey;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_EngineEvent_metadataEntries_TableMetadataEntry_table_schema_columns_constraints {
  __typename: "TableColumnConstraints";
  nullable: boolean;
  unique: boolean;
  other: string[];
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_EngineEvent_metadataEntries_TableMetadataEntry_table_schema_columns {
  __typename: "TableColumn";
  name: string;
  description: string | null;
  type: string;
  constraints: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_EngineEvent_metadataEntries_TableMetadataEntry_table_schema_columns_constraints;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_EngineEvent_metadataEntries_TableMetadataEntry_table_schema_constraints {
  __typename: "TableConstraints";
  other: string[];
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_EngineEvent_metadataEntries_TableMetadataEntry_table_schema {
  __typename: "TableSchema";
  columns: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_EngineEvent_metadataEntries_TableMetadataEntry_table_schema_columns[];
  constraints: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_EngineEvent_metadataEntries_TableMetadataEntry_table_schema_constraints | null;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_EngineEvent_metadataEntries_TableMetadataEntry_table {
  __typename: "Table";
  records: string[];
  schema: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_EngineEvent_metadataEntries_TableMetadataEntry_table_schema;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_EngineEvent_metadataEntries_TableMetadataEntry {
  __typename: "TableMetadataEntry";
  label: string;
  description: string | null;
  table: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_EngineEvent_metadataEntries_TableMetadataEntry_table;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_EngineEvent_metadataEntries_TableSchemaMetadataEntry_schema_columns_constraints {
  __typename: "TableColumnConstraints";
  nullable: boolean;
  unique: boolean;
  other: string[];
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_EngineEvent_metadataEntries_TableSchemaMetadataEntry_schema_columns {
  __typename: "TableColumn";
  name: string;
  description: string | null;
  type: string;
  constraints: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_EngineEvent_metadataEntries_TableSchemaMetadataEntry_schema_columns_constraints;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_EngineEvent_metadataEntries_TableSchemaMetadataEntry_schema_constraints {
  __typename: "TableConstraints";
  other: string[];
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_EngineEvent_metadataEntries_TableSchemaMetadataEntry_schema {
  __typename: "TableSchema";
  columns: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_EngineEvent_metadataEntries_TableSchemaMetadataEntry_schema_columns[];
  constraints: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_EngineEvent_metadataEntries_TableSchemaMetadataEntry_schema_constraints | null;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_EngineEvent_metadataEntries_TableSchemaMetadataEntry {
  __typename: "TableSchemaMetadataEntry";
  label: string;
  description: string | null;
  schema: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_EngineEvent_metadataEntries_TableSchemaMetadataEntry_schema;
}

export type PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_EngineEvent_metadataEntries = PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_EngineEvent_metadataEntries_PathMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_EngineEvent_metadataEntries_JsonMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_EngineEvent_metadataEntries_UrlMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_EngineEvent_metadataEntries_TextMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_EngineEvent_metadataEntries_MarkdownMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_EngineEvent_metadataEntries_PythonArtifactMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_EngineEvent_metadataEntries_FloatMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_EngineEvent_metadataEntries_IntMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_EngineEvent_metadataEntries_BoolMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_EngineEvent_metadataEntries_PipelineRunMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_EngineEvent_metadataEntries_AssetMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_EngineEvent_metadataEntries_TableMetadataEntry | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_EngineEvent_metadataEntries_TableSchemaMetadataEntry;

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_EngineEvent_engineError_cause {
  __typename: "PythonError";
  message: string;
  stack: string[];
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_EngineEvent_engineError {
  __typename: "PythonError";
  message: string;
  stack: string[];
  cause: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_EngineEvent_engineError_cause | null;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_EngineEvent {
  __typename: "EngineEvent";
  runId: string;
  message: string;
  timestamp: string;
  level: LogLevel;
  stepKey: string | null;
  eventType: DagsterEventType | null;
  metadataEntries: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_EngineEvent_metadataEntries[];
  engineError: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_EngineEvent_engineError | null;
  markerStart: string | null;
  markerEnd: string | null;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_HookErroredEvent_error_cause {
  __typename: "PythonError";
  message: string;
  stack: string[];
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_HookErroredEvent_error {
  __typename: "PythonError";
  message: string;
  stack: string[];
  cause: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_HookErroredEvent_error_cause | null;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_HookErroredEvent {
  __typename: "HookErroredEvent";
  runId: string;
  message: string;
  timestamp: string;
  level: LogLevel;
  stepKey: string | null;
  eventType: DagsterEventType | null;
  error: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_HookErroredEvent_error | null;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_LogsCapturedEvent {
  __typename: "LogsCapturedEvent";
  runId: string;
  message: string;
  timestamp: string;
  level: LogLevel;
  stepKey: string | null;
  eventType: DagsterEventType | null;
  logKey: string;
  stepKeys: string[] | null;
  pid: number | null;
}

export type PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages = PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepSkippedEvent | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_MaterializationEvent | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObservationEvent | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_RunFailureEvent | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepFailureEvent | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepUpForRetryEvent | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepInputEvent | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ExecutionStepOutputEvent | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_StepExpectationResultEvent | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_ObjectStoreOperationEvent | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_HandledOutputEvent | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_LoadedInputEvent | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_EngineEvent | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_HookErroredEvent | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages_LogsCapturedEvent;

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess {
  __typename: "PipelineRunLogsSubscriptionSuccess";
  messages: PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess_messages[];
  hasMorePastEvents: boolean;
}

export interface PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionFailure {
  __typename: "PipelineRunLogsSubscriptionFailure";
  missingRunId: string | null;
  message: string;
}

export type PipelineRunLogsSubscription_pipelineRunLogs = PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionSuccess | PipelineRunLogsSubscription_pipelineRunLogs_PipelineRunLogsSubscriptionFailure;

export interface PipelineRunLogsSubscription {
  pipelineRunLogs: PipelineRunLogsSubscription_pipelineRunLogs;
}

export interface PipelineRunLogsSubscriptionVariables {
  runId: string;
  after?: any | null;
}
