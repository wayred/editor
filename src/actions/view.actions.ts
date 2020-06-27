export const VIEW_CREATE = 'VIEW_CREATE';
export const VIEW_SET_AS_MAIN = 'VIEW_SET_AS_MAIN';
export const VIEW_SELECT = 'VIEW_SELECT';
export const VIEW_DELETE = 'VIEW_DELETE';


export const viewCreate = (name: string) => {
  return {
    type: VIEW_CREATE,
    payload: {
      name
    }
  }
}

export const viewSetAsMain = (id: string) => {
  return {
    type: VIEW_SET_AS_MAIN,
    payload: {
      id
    }
  }
}

export const viewSelect = (id: string) => {
  return {
    type: VIEW_SELECT,
    payload: {
      id
    }
  }
}

export const viewDelete = (id: string) => {
  return {
    type: VIEW_DELETE,
    payload: {
      id
    }
  }
}