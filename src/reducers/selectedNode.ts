import {
  FETCH_PROJECT_LOAD_SUCCESS,
  NODE_PROPERTY_UPDATE,
  NODE_SELECTION_CHANGED,
  NODE_UPDATE
} from "../actions/actionTypes";
import _ from "lodash";

const initialState: any = null;

export const selectedNode = (state = initialState, action: any) => {
  switch (action.type) {
    case NODE_PROPERTY_UPDATE:
      const newState = {...state};
      if (action.payload.value === '') {
        _.unset(newState, action.payload.path);
      } else {
        _.set(newState, action.payload.path, action.payload.value);
      }
      return newState;
    case FETCH_PROJECT_LOAD_SUCCESS:
      return initialState;
    case NODE_UPDATE:
      return action.payload;
    case NODE_SELECTION_CHANGED:
      return action.payload;
    default:
      return state
  }
}
