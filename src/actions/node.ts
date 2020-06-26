import {
  NODE_ADD,
  NODE_DELETE,
  NODE_PROPERTY_RENAME,
  NODE_PROPERTY_UPDATE,
  NODE_RENAME,
  NODE_UPDATE
} from "./actionTypes";
import {ComponentConfig} from "@wayred/core";


export const nodeAdd = (viewId: string | null, node: ComponentConfig, parentId?: string) => {
  return {
    type: NODE_ADD,
    payload: {
      viewId,
      node,
      parentId
    }
  }
}

export const nodeRename = (oldId: string, newId: string) => {
  return {
    type: NODE_RENAME,
    payload: {
      oldId,
      newId
    }
  }
}

export const nodeDelete = (id: string) => {
  return {
    type: NODE_DELETE,
    payload: id
  }
}

export const nodeUpdate = (node: ComponentConfig) => {
  return {
    type: NODE_UPDATE,
    payload: node
  }
}

export const nodePropertyUpdate = (nodeId: string, path: string, value: any) => {
  return {
    type: NODE_PROPERTY_UPDATE,
    payload: {
      nodeId,
      path,
      value
    }
  }
}

export const nodePropertyRename = (nodeId: string, oldPath: string, newPath: string) => {
  return {
    type: NODE_PROPERTY_RENAME,
    payload: {
      nodeId,
      oldPath,
      newPath
    }
  }
}
