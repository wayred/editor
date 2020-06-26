import TextEditor from "./components/properties/TextEditor";
import ObjectEditor from "./components/properties/ObjectEditor";
import {Metadata, Project, View} from "@wayred/core";
import EnumEditor from "./components/properties/EnumEditor";
import NumberEditor from "./components/properties/NumberEditor";
import FunctionEditor from "./components/properties/FunctionEditor";

export type EnumOption = {
  label: string;
  value: any;
}

export type Action = {
  type: string;
  payload?: any;
}

export type ModalType =
  | 'error'
  | 'warning'
  | 'info'
  | 'newProject';

export type ModalsState = {
  [name in ModalType]?: {
    isVisible: boolean;
  }
}

export type ApplicationState = {
  modals: ModalsState;
  project?: Project;
  selectedView?: string;
  selectedNode: any;
  refresher: {
    preview: string;
  },
  registry: Registry;
}

export type TreeNode = {
  id: string;
  label: string;
  children?: TreeNode[];
}

export const propertyEditors: any = {
  'text': TextEditor,
  'number': NumberEditor,
  'boolean': TextEditor,
  'array': TextEditor,
  'object': ObjectEditor,
  'color': TextEditor,
  'enum': EnumEditor,
  'function': FunctionEditor
}

export type Registry = {
  components: string[];
  functions: string[];
  metadata: {
    [key: string]: Metadata
  };
  contexts: string[];
} | null;