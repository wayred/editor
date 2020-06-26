import {NODE_SELECTION_CHANGED} from "./actionTypes";
import {ComponentConfig} from "@wayred/core";


export const nodeSelectionChanged = (node: ComponentConfig) => {
  return {
    type: NODE_SELECTION_CHANGED,
    payload: node
  }
}