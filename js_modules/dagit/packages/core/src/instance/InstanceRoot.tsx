import {MainContent} from '@dagster-io/ui';
import * as React from 'react';
import {Redirect, Route, Switch, useLocation} from 'react-router-dom';

import {AssetEntryRoot} from '../assets/AssetEntryRoot';
import {AssetsCatalogRoot} from '../assets/AssetsCatalogRoot';
import {InstanceAssetGraphExplorer} from '../assets/InstanceAssetGraphExplorer';
import {InstanceAssetGrid} from '../assets/InstanceAssetGrid';
import {RunRoot} from '../runs/RunRoot';
import {RunsRoot} from '../runs/RunsRoot';
import {SnapshotRoot} from '../snapshots/SnapshotRoot';

import {InstanceStatusRoot} from './InstanceStatusRoot';

export const InstanceRoot = () => {
  const {pathname} = useLocation();
  const main = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    main.current?.scrollTo({top: 0});
  }, [pathname]);

  return (
    <MainContent ref={main}>
      <Switch>
        <Route path="/instance/assets" exact>
          <AssetsCatalogRoot />
        </Route>
        <Route path="/instance/asset-grid(/?.*)">
          <InstanceAssetGrid />
        </Route>
        <Route path="/instance/asset-graph(/?.*)">
          <InstanceAssetGraphExplorer />
        </Route>
        <Route path="/instance/assets/(/?.*)">
          <AssetEntryRoot />
        </Route>
        <Route path="/instance/runs" exact>
          <RunsRoot />
        </Route>
        <Route path="/instance/runs/:runId" exact>
          <RunRoot />
        </Route>
        <Route path="/instance/snapshots/:pipelinePath/:tab?">
          <SnapshotRoot />
        </Route>
        <Route path="/instance/:tab">
          <InstanceStatusRoot />
        </Route>
        <Route path="*" render={() => <Redirect to="/instance/overview" />} />
      </Switch>
    </MainContent>
  );
};

// Imported via React.lazy, which requires a default export.
// eslint-disable-next-line import/no-default-export
export default InstanceRoot;
