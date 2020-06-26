import {combineReducers, createStore} from 'redux';
import {project} from "./reducers/project";
import {selectedNode} from "./reducers/selectedNode";
import {composeWithDevTools} from "redux-devtools-extension";
import {modals} from "./reducers/modals";
import {selectedView} from "./reducers/selectedView";
import {registry} from "./reducers/registry";
import {refresher} from "./reducers/refresher";

const reducers = combineReducers({
  project,
  selectedNode,
  modals,
  selectedView,
  registry,
  refresher
});

const store = createStore(reducers, composeWithDevTools());

export default store;