{{/* vim: set filetype=mustache: */}}
{{/*
Expand the name of the chart.
*/}}
{{- define "dagster.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "dagster.fullname" -}}
{{- $global := .Values.global | default dict }}
{{- $fullnameOverride := $global.fullnameOverride | default .Values.fullnameOverride }}
{{- $nameOverride := $global.nameOverride | default .Values.nameOverride }}
{{- if $fullnameOverride -}}
{{- $fullnameOverride | trunc 63 | trimSuffix "-" -}}
{{- else -}}
{{- $name := default .Chart.Name $nameOverride -}}
{{- if contains $name .Release.Name -}}
{{- .Release.Name | trunc 63 | trimSuffix "-" -}}
{{- else -}}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" -}}
{{- end -}}
{{- end -}}
{{- end -}}

# Image utils
{{- define "dagster.dagsterImage.name" }}
  {{- $ := index . 0 }}

  {{- with index . 1 }}
    {{- $tag := .tag | default $.Chart.Version | toYaml }}
    {{- printf "%s:%s" .repository $tag }}
  {{- end }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "dagster.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{/*
Common labels
*/}}
{{- define "dagster.labels" -}}
helm.sh/chart: {{ include "dagster.chart" . }}
{{ include "dagster.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end -}}

{{/*
Selector labels
*/}}
{{- define "dagster.selectorLabels" -}}
app.kubernetes.io/name: {{ include "dagster.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end -}}

{{/*
Create the name of the service account to use
*/}}
{{- define "dagsterUserDeployments.serviceAccountName" -}}
{{- $global := .Values.global | default dict -}}
{{- $serviceAccount := .Values.serviceAccount | default dict -}}
{{- $global.serviceAccountName | default $serviceAccount.name | default (printf "%s-user-deployments" (include "dagster.fullname" .)) }}
{{- end -}}

{{- define "dagsterUserDeployments.postgresql.secretName" -}}
{{- $global := .Values.global | default dict }}
{{- $global.postgresqlSecretName | default .Values.postgresqlSecretName }}
{{- end -}}

{{/*
This environment shared across all User Code containers
*/}}
{{- define "dagsterUserDeployments.sharedEnv" -}}
{{- $global := .Values.global | default dict }}
{{- $dagsterHome := $global.dagsterHome | default .Values.dagsterHome }}

DAGSTER_HOME: {{ $dagsterHome | quote }}
DAGSTER_K8S_PG_PASSWORD_SECRET: {{ include "dagsterUserDeployments.postgresql.secretName" . | quote }}
DAGSTER_K8S_INSTANCE_CONFIG_MAP: "{{ template "dagster.fullname" .}}-instance"
DAGSTER_K8S_PIPELINE_RUN_NAMESPACE: "{{ .Release.Namespace }}"
DAGSTER_K8S_PIPELINE_RUN_ENV_CONFIGMAP: "{{ template "dagster.fullname" . }}-pipeline-env"
{{- end -}}


{{- define "dagsterUserDeployments.k8sContainerContext" -}}
  {{- $ := index . 0 }}
  {{- with index . 1 }}
  k8s:
    image_pull_policy: {{ .image.pullPolicy }}
    env_config_maps:
    - {{ include "dagster.fullname" $ }}-{{ .name }}-user-env
    {{- range $envConfigMap := .envConfigMaps }}
    {{- if hasKey $envConfigMap "name" }}
    - {{ $envConfigMap.name }}
    {{- end }}
    {{- end }}
    {{- if .envSecrets }}
    env_secrets:
    {{- range $envSecret := .envSecrets }}
    {{- if hasKey $envSecret "name" }}
    - {{ $envSecret.name }}
    {{- end }}
    {{- end }}
    {{- end }}
    {{- if .volumeMounts }}
    volume_mounts: {{- .volumeMounts | toYaml | nindent 6 }}
    {{- end }}
    {{- if .volumes }}
    volumes: {{- .volumes | toYaml | nindent 6 }}
    {{- end }}
    {{- if .labels }}
    labels: {{- .labels | toYaml | nindent 6 }}
    {{- end }}
    {{- if .resources }}
    resources: {{- .resources | toYaml | nindent 6 }}
    {{- end }}
    namespace: {{ $.Release.Namespace }}
    service_account_name: {{ include "dagsterUserDeployments.serviceAccountName" $ }}
  {{- end }}
{{- end -}}
