import {gql} from '@apollo/client';
import {Colors, Icon, Spinner, Tooltip, FontFamily, Box, CaptionMono} from '@dagster-io/ui';
import isEqual from 'lodash/isEqual';
import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components/macro';

import {withMiddleTruncation} from '../app/Util';
import {AssetKey} from '../assets/types';
import {NodeHighlightColors} from '../graph/OpNode';
import {OpTags} from '../graph/OpTags';
import {linkToRunEvent, titleForRun} from '../runs/RunUtils';
import {TimestampDisplay} from '../schedules/TimestampDisplay';
import {markdownToPlaintext} from '../ui/markdownToPlaintext';

import {displayNameForAssetKey, LiveDataForNode} from './Utils';
import {ASSET_NODE_ANNOTATIONS_MAX_WIDTH, ASSET_NODE_NAME_MAX_LENGTH} from './layout';
import {AssetNodeFragment} from './types/AssetNodeFragment';

const MISSING_LIVE_DATA = {
  unstartedRunIds: [],
  inProgressRunIds: [],
  runWhichFailedToMaterialize: null,
  lastMaterialization: null,
};

export const AssetNode: React.FC<{
  definition: AssetNodeFragment;
  liveData?: LiveDataForNode;
  selected: boolean;
  padded?: boolean;
  inAssetCatalog?: boolean;
}> = React.memo(({definition, selected, liveData, inAssetCatalog, padded = true}) => {
  const stepKey = definition.opName || '';

  const displayName = withMiddleTruncation(displayNameForAssetKey(definition.assetKey), {
    maxLength: ASSET_NODE_NAME_MAX_LENGTH,
  });

  const {lastMaterialization, unstartedRunIds, inProgressRunIds, runWhichFailedToMaterialize} =
    liveData || MISSING_LIVE_DATA;

  return (
    <AssetNodeContainer $selected={selected} $padded={padded}>
      <AssetNodeBox>
        <Name>
          <span style={{marginTop: 1}}>
            <Icon name="asset" />
          </span>
          <div style={{overflow: 'hidden', textOverflow: 'ellipsis', marginTop: -1}}>
            {displayName}
          </div>
          <div style={{flex: 1}} />
          <div style={{maxWidth: ASSET_NODE_ANNOTATIONS_MAX_WIDTH}}>
            {liveData?.computeStatus === 'old' && (
              <UpstreamNotice>
                upstream
                <br />
                changed
              </UpstreamNotice>
            )}
          </div>
        </Name>
        {definition.description && !inAssetCatalog && (
          <Description>{markdownToPlaintext(definition.description).split('\n')[0]}</Description>
        )}
        {definition.opName && displayName !== definition.opName && (
          <Description>
            <Box
              flex={{gap: 4, alignItems: 'flex-end'}}
              style={{marginLeft: -2, overflow: 'hidden'}}
            >
              <Icon name="op" size={16} />
              <div style={{minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis'}}>
                {definition.opName}
              </div>
            </Box>
          </Description>
        )}

        <Stats>
          {lastMaterialization ? (
            <StatsRow>
              <span>Materialized</span>
              <AssetRunLink
                runId={lastMaterialization.runId}
                event={{stepKey, timestamp: lastMaterialization.timestamp}}
              >
                <TimestampDisplay
                  timestamp={Number(lastMaterialization.timestamp) / 1000}
                  timeFormat={{showSeconds: false, showTimezone: false}}
                />
              </AssetRunLink>
            </StatsRow>
          ) : (
            <>
              <StatsRow>
                <span>Materialized</span>
                <span>–</span>
              </StatsRow>
            </>
          )}
          <StatsRow>
            <span>Latest Run</span>

            {inProgressRunIds?.length > 0 ? (
              <Box flex={{gap: 4, alignItems: 'center'}}>
                <Tooltip content="A run is currently rematerializing this asset.">
                  <Spinner purpose="body-text" />
                </Tooltip>
                <AssetRunLink runId={inProgressRunIds[0]} />
              </Box>
            ) : unstartedRunIds?.length > 0 ? (
              <Box flex={{gap: 4, alignItems: 'center'}}>
                <Tooltip content="A run has started that will rematerialize this asset soon.">
                  <Spinner purpose="body-text" stopped />
                </Tooltip>
                <AssetRunLink runId={unstartedRunIds[0]} />
              </Box>
            ) : runWhichFailedToMaterialize?.__typename === 'Run' ? (
              <Box flex={{gap: 4, alignItems: 'center'}}>
                <Tooltip
                  content={`Run ${titleForRun({
                    runId: runWhichFailedToMaterialize.id,
                  })} failed to materialize this asset`}
                >
                  <Icon name="warning" color={Colors.Red500} />
                </Tooltip>
                <AssetRunLink runId={runWhichFailedToMaterialize.id} />
              </Box>
            ) : lastMaterialization ? (
              <AssetRunLink
                runId={lastMaterialization.runId}
                event={{stepKey, timestamp: lastMaterialization.timestamp}}
              />
            ) : (
              <span>–</span>
            )}
          </StatsRow>
        </Stats>
        {definition.computeKind && (
          <OpTags
            minified={false}
            style={{right: -2, paddingTop: 5}}
            tags={[
              {
                label: definition.computeKind,
                onClick: () => {
                  window.requestAnimationFrame(() =>
                    document.dispatchEvent(new Event('show-kind-info')),
                  );
                },
              },
            ]}
          />
        )}
      </AssetNodeBox>
    </AssetNodeContainer>
  );
}, isEqual);

export const AssetNodeMinimal: React.FC<{
  selected: boolean;
  definition: {assetKey: AssetKey};
  fontSize: number;
  color?: string;
}> = ({selected, definition, fontSize, color}) => {
  const displayName = withMiddleTruncation(displayNameForAssetKey(definition.assetKey), {
    maxLength: 17,
  });
  return (
    <AssetNodeContainer $selected={selected} style={{position: 'absolute', borderRadius: 12}}>
      <AssetNodeBox
        style={{
          border: `4px solid ${Colors.Blue200}`,
          borderRadius: 10,
          position: 'absolute',
          inset: 4,
          background: color,
        }}
      >
        <NameMinimal style={{fontSize}}>{displayName}</NameMinimal>
      </AssetNodeBox>
    </AssetNodeContainer>
  );
};

export const AssetRunLink: React.FC<{
  runId: string;
  event?: Parameters<typeof linkToRunEvent>[1];
}> = ({runId, children, event}) => (
  <Link
    to={event ? linkToRunEvent({runId}, event) : `/instance/runs/${runId}`}
    target="_blank"
    rel="noreferrer"
  >
    {children || <CaptionMono>{titleForRun({runId})}</CaptionMono>}
  </Link>
);

export const ASSET_NODE_LIVE_FRAGMENT = gql`
  fragment AssetNodeLiveFragment on AssetNode {
    id
    opName
    opNames
    repository {
      id
    }
    assetKey {
      path
    }
    assetMaterializations(limit: 1) {
      timestamp
      runId
    }
  }
`;

export const ASSET_NODE_FRAGMENT = gql`
  fragment AssetNodeFragment on AssetNode {
    id
    graphName
    opName
    opNames
    description
    partitionDefinition
    computeKind
    assetKey {
      path
    }
    repository {
      id
      name
      location {
        id
        name
      }
    }
  }
`;

const BoxColors = {
  Divider: 'rgba(219, 219, 244, 1)',
  Description: 'rgba(245, 245, 250, 1)',
  Stats: 'rgba(236, 236, 248, 1)',
};

export const AssetNodeContainer = styled.div<{$selected: boolean; $padded?: boolean}>`
  outline: ${(p) => (p.$selected ? `2px dashed ${NodeHighlightColors.Border}` : 'none')};
  border-radius: 6px;
  outline-offset: -1px;
  ${(p) =>
    p.$padded
      ? `
  padding: 4px;
  margin-top: 10px;
  margin-right: 4px;
  margin-left: 4px;
  margin-bottom: 2px;
  `
      : ''}
  background: ${(p) => (p.$selected ? NodeHighlightColors.Background : 'white')};
  inset: 0;
`;

export const AssetNodeBox = styled.div`
  border: 2px solid ${Colors.Blue200};
  background: ${Colors.White};
  border-radius: 5px;
  position: relative;
  &:hover {
    box-shadow: ${Colors.Blue200} inset 0px 0px 0px 1px, rgba(0, 0, 0, 0.12) 0px 2px 12px 0px;
  }
`;

const Name = styled.div`
  /** Keep in sync with DISPLAY_NAME_PX_PER_CHAR */
  display: flex;
  padding: 4px 6px;
  background: ${Colors.White};
  font-family: ${FontFamily.monospace};
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  font-weight: 600;
  gap: 4px;
`;

const NameMinimal = styled(Name)`
  font-weight: 600;
  white-space: nowrap;
  position: absolute;
  background: none;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Description = styled.div`
  background: ${BoxColors.Description};
  padding: 4px 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-top: 1px solid ${BoxColors.Divider};
  font-size: 12px;
`;

const Stats = styled.div`
  background: ${BoxColors.Stats};
  padding: 4px 8px;
  border-top: 1px solid ${BoxColors.Divider};
  font-size: 12px;
  line-height: 20px;
`;

const StatsRow = styled.div`
  display: flex;
  justify-content: space-between;
  min-height: 18px;
  & > span {
    color: ${Colors.Gray600};
  }
`;

const UpstreamNotice = styled.div`
  background: ${Colors.Yellow200};
  color: ${Colors.Yellow700};
  line-height: 10px;
  font-size: 11px;
  text-align: right;
  margin-top: -4px;
  margin-bottom: -4px;
  padding: 2.5px 5px;
  margin-right: -6px;
  border-top-right-radius: 3px;
`;
