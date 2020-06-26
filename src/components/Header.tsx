import React from "react";
import {Dispatch} from "redux";
import {Alignment, Button, Classes, Icon, Menu, Navbar, Popover} from "@blueprintjs/core";
import {Position} from "@blueprintjs/core/lib/esm/common/position";
import {showModal} from "../actions/modals";
import {connect} from "react-redux";

type HeaderProps = {
  showModal: (name: string) => void;
}

const Header = (props: HeaderProps) => {
  // const a = Classes.MINIMAL;
  const projectMenu = (
    <Menu>
      <Menu.Item icon="plus" onClick={() => props.showModal('newProject')} text="New"/>
      <Menu.Item icon="floppy-disk" onClick={() => {}} text="Save"/>
      <Menu.Divider/>
      <Menu.Item icon="trash" onClick={() => {}} text="Delete"/>
      <Menu.Divider/>
      <Menu.Item icon="export" onClick={() => {}} text="Export"/>
      <Menu.Item icon="import" onClick={() => {}} text="Import"/>
    </Menu>
  );
  const viewMenu = (
    <Menu>
      <Menu.Item icon="plus" onClick={() => {}} text="Add"/>
      <Menu.Item icon="search-around" onClick={() => {}} text="Set as default"/>
      <Menu.Divider/>
      <Menu.Item icon="trash" onClick={() => {}} text="Delete"/>
    </Menu>
  );
  return (
    <Navbar>
      <Navbar.Group align={Alignment.LEFT}>
        {/*<Navbar.Heading>Blueprint</Navbar.Heading>*/}
        {/*path*/}
        <Icon icon="search-around" iconSize={32} color={'#dd3333'}/>
        <Navbar.Divider/>
        {/*<Button className={Classes.MINIMAL} icon="projects" text="Projects"/>*/}

        <Popover content={projectMenu} position={Position.BOTTOM_LEFT}>
          <Button className={Classes.MINIMAL} icon="projects" text="Project"/>
        </Popover>
        <Popover content={viewMenu} position={Position.BOTTOM_LEFT}>
          <Button className={Classes.MINIMAL} icon="page-layout" text="View"/>
        </Popover>


        {/*<Button className="bp3-minimal" icon="document" text="Files"/>*/}
      </Navbar.Group>
    </Navbar>
  )
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    showModal: (name: string) => dispatch(showModal(name))
  }
}
export default connect(null, mapDispatchToProps)(Header);