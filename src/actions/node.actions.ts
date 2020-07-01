import {ComponentConfig} from "@wayred/core";

export const NODE_CREATE = 'NODE_CREATE';
export const NODE_UPDATE = 'NODE_UPDATE';
export const NODE_SELECT = 'NODE_SELECT';

export const nodeCreate = () => {
  return {
    type: NODE_CREATE
  }
}

export const nodeUpdate = (node: ComponentConfig) => {
  return {
    type: NODE_CREATE,
    payload: {
      node
    }
  }
}

export const nodeSelect = (nodeId?: string) => {
  return {
    type: NODE_SELECT,
    payload: {
      nodeId
    }
  }
}