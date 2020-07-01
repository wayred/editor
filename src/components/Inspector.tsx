/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, {useState} from "react";
import {ContextMenu, HTMLSelect, ITreeNode, Menu, Tree} from "@blueprintjs/core";
import {ComponentConfig, Project} from "@wayred/core";
import {ApplicationState, Workspace} from "../types";
import {Dispatch} from 'redux';
import {connect} from "react-redux";
import {viewSelect} from "../actions/view.actions";
import {getSelectedView} from "../helpers";
import {nodeCreate, nodeSelect} from "../actions/node.actions";

type CollapsedState = {
  [key: string]: boolean
}

const componentConfigToTreeNode = (cfg: ComponentConfig, collapsedState: CollapsedState, selectedNodeId?: string | null): ITreeNode => {
  const children = cfg.children && cfg.children.map(node => componentConfigToTreeNode(node, collapsedState, selectedNodeId));
  return {
    id: cfg.id,
    label: cfg.name || cfg.component,
    isExpanded: !collapsedState[cfg.id],
    childNodes: children,
    isSelected: cfg.id === selectedNodeId
  }
}

type InspectorProps = {
  workspace: Workspace;
  selectedNodeId: string | null;
  onViewSelectionChange: (id: string) => void;
  onNodeCreate: () => void;
  onNodeSelect: (nodeId?: string) => void;
}

const Inspector = (props: InspectorProps) => {
  const [collapsed, setCollapsed] = useState<any>({});

  const menu = (
    <Menu>
      <Menu.Item icon="plus" onClick={() => props.onNodeCreate()} text="Add Component"/>
    </Menu>
  );
  const view = getSelectedView(props.workspace);
  const root = (view && view.config && componentConfigToTreeNode(view.config, collapsed, props.workspace?.selectedNodeId)) || null;
  const nodes = (root && [root]) || [];

  const onNodeContextMenuHandler = (node: ITreeNode, nodePath: number[], e: React.MouseEvent<HTMLElement>) => {
    props.onNodeSelect(`${node.id}`);
    onContextMenuHandler(e);
  }
  const onNodeCollapseHandler = (node: ITreeNode) => {
    setCollapsed((prevState: any) => {
      return {
        ...prevState,
        [node.id]: true
      }
    });
  };
  const onNodeExpandHandler = (node: ITreeNode) => {
    setCollapsed((prevState: any) => {
      return {
        ...prevState,
        [node.id]: false
      }
    });
  };
  const onNodeClickHandler = (node: ITreeNode, nodePath: number[], e: React.MouseEvent<HTMLElement>) => {
    props.onNodeSelect(`${node.id}`);
  }
  const views = props.workspace.project?.views && Object.keys(props.workspace.project?.views) || [];
  const options = views.length > 0
    ? views.map(viewId => <option value={viewId}>
      {props.workspace.project?.views[viewId].name + (viewId === props.workspace.project?.mainView ? ' (main)' : '')}
    </option>)
    : <option>No views available</option>;

  const onContextMenuHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    ContextMenu.show(menu, { left: e.clientX, top: e.clientY }, () => {
      // menu was closed; callback optional
    });
  }
  return (
    <div onContextMenu={onContextMenuHandler} css={{height: '100%'}}>
      <HTMLSelect value={props.workspace.selectedViewId || undefined} onChange={e => props.onViewSelectionChange(e.target.value)}>
        {options}
      </HTMLSelect>
      <Tree contents={nodes}
            onNodeContextMenu={onNodeContextMenuHandler}
            onNodeClick={onNodeClickHandler}
            onNodeCollapse={onNodeCollapseHandler}
            onNodeExpand={onNodeExpandHandler}/>

    </div>
  )
};

const mapStateToProps = (state: ApplicationState) => {
  return {
    workspace: state.workspace!,
    selectedNodeId: state.workspace?.selectedNodeId || null
  }
}
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onViewSelectionChange: (id: string) => dispatch(viewSelect(id)),
    onNodeCreate: () => dispatch(nodeCreate()),
    onNodeSelect: (nodeId?: string) => dispatch(nodeSelect(nodeId))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Inspector);