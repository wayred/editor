import {REGISTRY_UPDATE} from "./actionTypes";
import {Registry} from "../types";

export const registryUpdate = (registry: Registry) => {
  return {
    type: REGISTRY_UPDATE,
    payload: registry
  }
}