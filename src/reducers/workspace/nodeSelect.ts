import {Workspace} from "../../types";

const nodeSelect = (state: Workspace | null, nodeId?: string) => {
  return {
    ...state,
    selectedNodeId: nodeId
  }
}

export default nodeSelect;