import {SHOW_MODAL, VIEW_CREATED, VIEW_SELECTION_CHANGED, VIEW_SET_AS_MAIN} from "./actionTypes";
import {View} from "@wayred/core";

export const viewCreated = (view: View) => {
  return {
    type: VIEW_CREATED,
    payload: view
  }
}
export const viewSelectionChanged = (viewId: string | null) => {
  return {
    type: VIEW_SELECTION_CHANGED,
    payload: viewId
  }
}

export const viewSetAsMain = (viewId: string | null) => {
  return {
    type: VIEW_SET_AS_MAIN,
    payload: viewId
  }
}
