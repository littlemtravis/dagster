/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RunStatus } from "./../../types/globalTypes";

// ====================================================
// GraphQL fragment: RepositoryLiveFragment
// ====================================================

export interface RepositoryLiveFragment_location {
  __typename: "RepositoryLocation";
  id: string;
  name: string;
}

export interface RepositoryLiveFragment_inProgressRunsByStep_unstartedRuns {
  __typename: "Run";
  id: string;
}

export interface RepositoryLiveFragment_inProgressRunsByStep_inProgressRuns {
  __typename: "Run";
  id: string;
}

export interface RepositoryLiveFragment_inProgressRunsByStep {
  __typename: "InProgressRunsByStep";
  stepKey: string;
  unstartedRuns: RepositoryLiveFragment_inProgressRunsByStep_unstartedRuns[];
  inProgressRuns: RepositoryLiveFragment_inProgressRunsByStep_inProgressRuns[];
}

export interface RepositoryLiveFragment_latestRunByStep_run {
  __typename: "Run";
  id: string;
  status: RunStatus;
}

export interface RepositoryLiveFragment_latestRunByStep {
  __typename: "LatestRun";
  stepKey: string;
  run: RepositoryLiveFragment_latestRunByStep_run | null;
}

export interface RepositoryLiveFragment {
  __typename: "Repository";
  id: string;
  name: string;
  location: RepositoryLiveFragment_location;
  inProgressRunsByStep: RepositoryLiveFragment_inProgressRunsByStep[];
  latestRunByStep: RepositoryLiveFragment_latestRunByStep[];
}
