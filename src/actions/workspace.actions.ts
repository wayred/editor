import {Workspace} from "../types";

export const WORKSPACE_IMPORT = 'WORKSPACE_IMPORT';

export const workspaceImport = (workspace: Workspace) => {
  return {
    type: WORKSPACE_IMPORT,
    payload: {
      workspace
    }
  }
}