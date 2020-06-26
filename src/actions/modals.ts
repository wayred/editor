import {HIDE_MODAL, SHOW_MODAL} from "./actionTypes";

export const showModal = (name: string) => {
  return {
    type: SHOW_MODAL,
    payload: {
      name
    }
  }
}
export const hideModal = (name: string) => {
  return {
    type: HIDE_MODAL,
    payload: {
      name
    }
  }
}