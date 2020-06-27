import {FETCH_PROJECT_CREATE_SUCCESS, HIDE_MODAL, SHOW_MODAL} from "../actions/actionTypes";
import {Action, ModalsState} from "../types";
import {PROJECT_CREATE} from "../actions/project.actions";
import {VIEW_CREATE} from "../actions/view.actions";

const initialState: ModalsState = {}

export const modals = (state = initialState, action: Action): ModalsState => {
  switch (action.type) {
    case VIEW_CREATE:
      return {
        ...state,
        newView: { isVisible: false }
      };
    case PROJECT_CREATE:
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