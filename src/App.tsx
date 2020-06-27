import React from 'react';
import 'normalize.css/normalize.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import './App.css';
import { Column, Row } from '@wayred/rc-blueprint';
import Header from "./components/Header";
import WorkspaceComponent from "./components/Workspace";
import {ApplicationState, Workspace} from "./types";
import {connect} from "react-redux";

type AppProps = {
  workspace: Workspace | null;
}

function App(props: AppProps) {
  return (
    <Column styles={{height: '100%'}}>
      <Header/>
      <Row styles={{flex: 1}}>
        {props.workspace && <WorkspaceComponent workspace={props.workspace}/>}
      </Row>
    </Column>
  );
}

const mapStateToProps = (state: ApplicationState) => {
  return {
    workspace: state.workspace
  }
}
export default connect(mapStateToProps)(App);
