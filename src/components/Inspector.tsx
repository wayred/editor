import React, {useState} from "react";
import {HTMLSelect, ITreeNode, Tree} from "@blueprintjs/core";
import {Project} from "@wayred/core";
import {ApplicationState, Workspace} from "../types";
import {Dispatch} from 'redux';
import {connect} from "react-redux";
import {viewSelect} from "../actions/view.actions";

type InspectorProps = {
  workspace: Workspace;
  onViewSelectionChange: (id: string) => void;
}

const Inspector = (props: InspectorProps) => {
  const [collapsed, setCollapsed] = useState<any>({});
  const nodes: ITreeNode[] = [
    {
      id: 'asdf',
      label: 'Texto',
      isExpanded: !collapsed.asdf,
      childNodes: [
        {
          id: 'asd12f',
          label: 'Child 1',
          isExpanded: !collapsed.asd12f,
        },
        {
          id: 'as32df',
          label: 'Segundo',
          isExpanded: !collapsed.as32df,
        }
      ]
    }
  ];
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
  const views = props.workspace.project?.views && Object.keys(props.workspace.project?.views) || [];
  const options = views.length > 0
    ? views.map(viewId => <option value={viewId}>
      {props.workspace.project?.views[viewId].name + (viewId === props.workspace.project?.mainView ? ' (main)' : '')}
    </option>)
    : <option>No views available</option>;
  return (
    <>
      <HTMLSelect value={props.workspace.selectedViewId || undefined} onChange={e => props.onViewSelectionChange(e.target.value)}>
        {options}
      </HTMLSelect>
      <Tree contents={nodes}
            onNodeCollapse={onNodeCollapseHandler}
            onNodeExpand={onNodeExpandHandler}/>

    </>
  )
};

const mapStateToProps = (state: ApplicationState) => {
  return {
    workspace: state.workspace!
  }
}
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onViewSelectionChange: (id: string) => dispatch(viewSelect(id))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Inspector);