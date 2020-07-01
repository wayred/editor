import {Workspace} from "../../types";
import {findNodeById, uuid} from "../../helpers";
import {ComponentConfig} from "@wayred/core";

const createNode = (): ComponentConfig => {
  return {
    id: uuid(),
    component: 'View',
    props: {}
  }
}

const nodeCreate = (state: Workspace | null) => {
  if (!state || !state.project || !state.project.views || !state.selectedViewId) return state;
  const parentNodeId: string | null = state.selectedNodeId;
  const view = state.project.views[state.selectedViewId];
  let parent = findNodeById(view.config, parentNodeId);
  const newNode = createNode();
  const newState = {...state} as Workspace;
  if (!view.config) {
    view.config = newNode;
  } else {
    if (!parent) {
      parent = view.config;
    }
    parent.children = parent.children || [];
    parent.children.push(newNode);
  }
  return newState;
}

export default nodeCreate;