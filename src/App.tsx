import React from 'react';
import 'normalize.css/normalize.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import './App.css';
import { Column, Row } from '@wayred/rc-blueprint';
import Header from "./components/Header";
import Workspace from "./components/Workspace";
import UserCard from "./UserCard";
import UserCardConnected from "./UserCardConnected";



function App() {
  return (
    <Column styles={{height: '100%'}}>
      <Header/>
      <Row styles={{flex: 1}}>
        {/*<Workspace/>*/}
        <UserCard userName={'peter'}/>
        <UserCardConnected userName={'peter'}/>
      </Row>
    </Column>
  );
}

export default App;
