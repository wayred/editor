import {
  FETCH_PROJECT_CREATE_SUCCESS,
  DELETE_PROJECT_REQUEST,
  FETCH_PROJECT_LOAD_REQUEST,
  SAVE_PROJECT_REQUEST,
  FETCH_PROJECT_LOAD_SUCCESS,
  VIEW_CREATED,
  VIEW_SET_AS_MAIN,
  NODE_ADD,
  NODE_PROPERTY_UPDATE,
  NODE_PROPERTY_RENAME
} from "../actions/actionTypes";
import {Action} from "../types";
import {findNodeById, getNodeById, getViewById} from "../helpers";
import {Project} from "@wayred/core";
import _ from "lodash";

const initialState: Project | null = null;

export const project = (state: Project | null = initialState, action: Action) => {
  switch (action.type) {
    case NODE_PROPERTY_RENAME:
      return nodePropertyRename(state, action);
    case NODE_PROPERTY_UPDATE:
      return nodePropertyUpdate(state, action);
    case NODE_ADD:
      const view = getViewById(state, action.payload.viewId);
      if (!view) return state;
      if (!action.payload.parentId) {
        view.config = action.payload.node;
        return {...state};
      }
      const parent = findNodeById(view?.config || '', action.payload.parentId);
      parent.children = parent.children || [];
      parent.children.push(action.payload.node);
      return {...state};
    case VIEW_SET_AS_MAIN:
      return {
        ...state,
        mainView: action.payload
      };
    case VIEW_CREATED:
      // return {
      //   ...(state || {}),
      //   views: [...(state?.views || []), action.payload]
      // };
      return state;
    case FETCH_PROJECT_CREATE_SUCCESS:
      return action.payload;
    // case PROJECT_IMPORT:
    //   return action.payload;
    case DELETE_PROJECT_REQUEST:
      return {
        name: action.payload.name,
        config: null
      };
    case SAVE_PROJECT_REQUEST:
      return {
        name: action.payload.name,
        config: null
      };
    case FETCH_PROJECT_LOAD_SUCCESS:
      return action.payload;
    case FETCH_PROJECT_LOAD_REQUEST:
      return state;
    default:
      return state
  }
}

const nodePropertyUpdate = (state: Project | null = initialState, action: Action) => {
  const newState: Project = Object.assign({}, state);
  const node = getNodeById(newState, action.payload.nodeId);
  if (node) {
    if (action.payload.value === '') {
      _.unset(node, action.payload.path);
    } else {
      _.set(node, action.payload.path, action.payload.value);
    }
  }

  return newState;
}

const nodePropertyRename = (state: Project | null = initialState, action: Action) => {
  const newState = {...state};
  const node = getNodeById(state, action.payload.nodeId);
  if (node) {
    const oldValue = _.get(node, action.payload.oldPath);
    _.unset(node, action.payload.oldPath);
    _.set(node, action.payload.newPath, oldValue);
  }
  return newState;
}