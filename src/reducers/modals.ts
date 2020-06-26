import {FETCH_PROJECT_CREATE_SUCCESS, HIDE_MODAL, SHOW_MODAL} from "../actions/actionTypes";
import {Action, ModalsState} from "../types";

const initialState: ModalsState = {}

export const modals = (state = initialState, action: Action): ModalsState => {
  switch (action.type) {
    case FETCH_PROJECT_CREATE_SUCCESS:
      return {
        ...state,
        newProject: { isVisible: false }
      };
    case SHOW_MODAL:
      return {
        ...state,
        [action.payload.name]: { isVisible: true }
      };
    case HIDE_MODAL:
      return {
        ...state,
        [action.payload.name]: { isVisible: false }
      };
    default:
      return state
  }
}