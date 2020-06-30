import {Action, Workspace} from "../types";
import {PROJECT_CREATE} from "../actions/project.actions";
import {VIEW_CREATE, VIEW_DELETE, VIEW_SELECT, VIEW_SET_AS_MAIN} from "../actions/view.actions";
import {uuid} from "../helpers";
import {Project} from "@wayred/core";
import {WORKSPACE_IMPORT} from "../actions/workspace.actions";

const initialState: Workspace | null = null;

export const workspace = (state: Workspace | null = initialState, action: Action) => {
  switch (action.type) {
    case WORKSPACE_IMPORT:
      return action.payload.workspace;
    case VIEW_DELETE:
      const ws = {...state} as Workspace;
      if (ws.project?.mainView === action.payload.id) {
        ws.project!.mainView = '';
      }
      delete ws.project!.views[action.payload.id];
      const ids = Object.keys(ws.project!.views);
      ws.selectedViewId = ids.length > 0 ? ids[0] : null;
      return ws;
    case VIEW_SELECT:
      return {
        ...state,
        selectedViewId: action.payload.id
      }
    case VIEW_SET_AS_MAIN:
      const np = {...state?.project!};
      np.mainView = action.payload.id;
      return {
        ...state,
        project: np
      }
    case VIEW_CREATE:
      const ns: Workspace = (state && {...state}) || {
        project: null,
        selectedNodeId: null,
        selectedViewId: null
      };
      const id = uuid();
      ns.project!.views = ns.project!.views || {};
      ns.project!.views[id] = {
        id: id,
        name: action.payload.name,
        config: null
      }
      ns.project = {...ns.project} as Project;
      if (!ns.selectedViewId) {
        ns.selectedViewId = id;
      }
      return ns;
    case PROJECT_CREATE:
      return {
        ...state,
        project: {
          name: action.payload.name,
          type: action.payload.type
        }
      }
    default:
      return state;
  }
}
