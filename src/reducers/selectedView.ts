import {Action} from "../types";
import {
  FETCH_PROJECT_LOAD_SUCCESS,
  NODE_ADD, NODE_DELETE, NODE_RENAME, NODE_UPDATE,
  VIEW_CREATED,
  VIEW_SELECTION_CHANGED
} from "../actions/actionTypes";
import {deleteNodeById, findNodeById} from "../helpers";
import {View} from "@wayred/core";

const initialState: string | null = null;

export const selectedView = (state: string | null = initialState, action: Action) => {

  switch (action.type) {
    // case NODE_UPDATE:
    //   const c = findNodeById(state?.config || '', action.payload.id);
    //   Object.keys(action.payload).forEach(key => c[key] = action.payload[key]);
    //   return {
    //     ...state
    //   };
    case FETCH_PROJECT_LOAD_SUCCESS:
      return action.payload.mainView || null;
      // if (action.payload.views && action.payload.views.length > 0) {
      //   return action.payload.views[0];
      // }
      // return initialState;
    // case NODE_DELETE:
    //   if (state?.config?.id === action.payload) {
    //     return {
    //       ...state,
    //       config: initialState
    //     }
    //   }
    //   deleteNodeById(state?.config || '', action.payload);
    //   return {
    //     ...state
    //   }
    // case NODE_RENAME:
    //   const cfg = findNodeById(state?.config || '', action.payload.oldId);
    //   cfg.id = action.payload.newId;
    //   return {
    //     ...state
    //   };
    // case NODE_ADD:
    //   if (!action.payload.parentId) {
    //     return {
    //       ...state,
    //       config: {
    //         id: 'app'
    //       }
    //     }
    //   }
    //   const parent = findNodeById(state?.config || '', action.payload.parentId);
    //   parent.children = parent.children || [];
    //   parent.children.push({
    //     id: `${parent.id}-c_${parent.children.length}`
    //   });
    //   return {
    //     ...state
    //   };
    case VIEW_SELECTION_CHANGED:
      return action.payload;
    default:
      return state
  }
}
