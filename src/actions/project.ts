import {
  FETCH_PROJECT_CREATE_SUCCESS,
  FETCH_PROJECT_LOAD_REQUEST,
  FETCH_PROJECT_LOAD_SUCCESS, FETCH_PROJECT_LOAD_FAILURE
} from "./actionTypes";
import {Project} from "@wayred/core";
import {PROJECT_IMPORT} from "./project.actions";

export const newProjectCreated = (project: Project) => {
  return {
    type: FETCH_PROJECT_CREATE_SUCCESS,
    payload: project
  }
}

export const projectImport = (project: Project) => {
  return {
    type: PROJECT_IMPORT,
    payload: project
  }
}

export const fetchProjectLoadRequest = (projectId: string) => {
  return {
    type: FETCH_PROJECT_LOAD_REQUEST,
    payload: {
      projectId
    }
  }
}
export const fetchProjectLoadSuccess = (project: Project) => {
  return {
    type: FETCH_PROJECT_LOAD_SUCCESS,
    payload: project
  }
}
export const fetchProjectLoadFailure = (error: any) => {
  return {
    type: FETCH_PROJECT_LOAD_FAILURE,
    payload: error
  }
}
