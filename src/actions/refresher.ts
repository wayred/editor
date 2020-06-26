import {REFRESHER_UPDATE} from "./actionTypes";

export const refresherUpdate = (key: string, value: string) => {
  return {
    type: REFRESHER_UPDATE,
    payload: {
      key: key,
      value: value
    }
  }
}