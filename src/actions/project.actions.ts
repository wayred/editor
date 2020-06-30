export const PROJECT_CREATE = 'PROJECT_CREATE';

export const projectCreate = (name: string, type: string) => {
  return {
    type: PROJECT_CREATE,
    payload: {
      name,
      type
    }
  }
}