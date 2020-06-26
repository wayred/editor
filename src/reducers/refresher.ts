import {Action} from "../types";
import {REFRESHER_UPDATE} from "../actions/actionTypes";
import {randomString} from "../helpers";

type Refresher = {
  preview: string;
}
const initialState: Refresher = {
  preview: randomString(10)
}

export const refresher = (state: Refresher = initialState, action: Action) => {
  switch (action.type) {
    case REFRESHER_UPDATE:
      return {
        ...state,
        [action.payload.key]: action.payload.value
      };
    default:
      return state;
  }
}
