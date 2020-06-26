import {Action, Registry} from "../types";
import {REGISTRY_UPDATE} from "../actions/actionTypes";

const initialState: Registry = null;

export const registry = (state: Registry = initialState, action: Action) => {
  switch (action.type) {
    case REGISTRY_UPDATE:
      return action.payload;
    default:
      return state;
  }
}