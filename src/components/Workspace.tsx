/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from "react";
import SplitPane from "react-split-pane";
import TabbedPane from "./TabbedPane";
import Preview from "./Preview";
import Inspector from "./Inspector";
import {Workspace} from "../types";

type WorkspaceProps = {
  workspace: Workspace;
}

const WorkspaceComponent = (props: WorkspaceProps) => {
  return (
      <SplitPane split="vertical" minSize={300} defaultSize="25%">
        <Inspector/>
        <div css={{display: 'flex', flexDirection: 'column', height: '100%'}}>
          <SplitPane split="vertical" minSize={300} defaultSize="66%">
            {/*<PropPanel css={{flex: 1}}/>*/}
            <TabbedPane/>
            <Preview/>
          </SplitPane>
        </div>
      </SplitPane>
  )
};

export default WorkspaceComponent;