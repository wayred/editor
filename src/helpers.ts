import {ApplicationState, TreeNode} from "./types";
import {ComponentConfig, Project, PropType, View} from "@wayred/core";
import _ from "lodash";
import { v4 as uuidv4 } from 'uuid';

export const builderConfigToTreeNode = (cfg: ComponentConfig | string): TreeNode => {
  if (typeof cfg === 'string') {
    return {
      id: cfg,
      label: cfg
    } as TreeNode;
  }
  return {
    id: cfg.id,
    label: cfg.name || cfg.component,
    children: cfg.children?.map((child: ComponentConfig | string) => builderConfigToTreeNode(child))
  }
}

export const findNodeById = (cfg: ComponentConfig | string, id: string) => {
  if (typeof cfg === 'string') return null;
  if (cfg.id === id) return cfg;
  if (cfg.children) {
    for (let i = 0; i < cfg.children.length; i++) {
      const node: any = findNodeById(cfg.children[i], id);
      if (node !== null) {
        return node;
      }
    }
  }
  return null;
}

export const deleteNodeById = (cfg: ComponentConfig | string, id: string) => {
  if (typeof cfg === 'string') return;
  if (cfg.id === id) return;
  if (cfg.children) {
    for (let i = 0; i < cfg.children.length; i++) {
      const c = cfg.children[i];
      if (typeof c === 'string') continue;
      if (c.id === id) {
        cfg.children?.splice(i, 1);
        return;
      }
      deleteNodeById(cfg.children[i], id);
    }
  }
}

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const charactersLength = characters.length;
export const randomString = (length: number) => {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export const getSelectedView = (state: ApplicationState): View | null => {
  if (!state.selectedView || !state.project?.views)
    return null;
  const result = _.find(state.project.views, view => view?.id === state.selectedView);
  return result ? result : null;
}

export const getViewById = (project: Project | null, viewId: string) => {
  if (!project || !project.views)
    return null;
  return _.find(project.views, view => view?.id === viewId);
}

export const getNodeById = (project: Project | null, nodeId: string) => {
  if (!project || !project.views)
    return null;
  // for (let i = 0; i < project.views.length; i++) {
  //   const node = findNodeById(project.views[i]!.config, nodeId);
  //   if (node)
  //     return node;
  // }
  return null;
}

export const newNode = (): ComponentConfig => {
  return {
    id: uuid(),
    component: 'View',
    props: {}
  }
}

export const uuid = () => {
  return uuidv4();
}

export const getTypeForValue = (value: any): PropType => {
  if (value === undefined || value === null) return 'text';
  if (typeof value === 'string') return 'text';
  if (typeof value === 'number') return 'number';
  if (Array.isArray(value)) return 'array';
  if (typeof value === 'object') return 'object';
  if (typeof value === 'function') return 'function';
  return 'text';
}

export const downloadJsonFile = async (data:any) => {
  const fileName = "file";
  const json = JSON.stringify(data);
  const blob = new Blob([json],{type:'application/json'});
  const href = await URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = href;
  link.download = fileName + ".json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}