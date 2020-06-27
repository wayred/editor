import React from "react";
import {Dispatch} from "redux";
import {Alignment, Button, Classes, H2, Icon, Menu, Navbar, Popover} from "@blueprintjs/core";
import {Position} from "@blueprintjs/core/lib/esm/common/position";
import {showModal} from "../actions/modals";
import {connect} from "react-redux";
import {ApplicationState, Workspace} from "../types";
import {viewDelete, viewSetAsMain} from "../actions/view.actions";

type HeaderProps = {
  showModal: (name: string) => void;
  workspace: Workspace | null;
  onViewSetAsMain: (id: string) => void;
  onViewDelete: (id: string) => void;
}

const Header = (props: HeaderProps) => {
  // const a = Classes.MINIMAL;
  const projectMenu = (
    <Menu>
      <Menu.Item icon="plus" onClick={() => props.showModal('newProject')} text="New"/>
      <Menu.Item icon="floppy-disk" onClick={() => {
      }} text="Save"/>
      <Menu.Divider/>
      <Menu.Item icon="trash" onClick={() => {
      }} text="Delete"/>
      <Menu.Divider/>
      <Menu.Item icon="export" onClick={() => {
      }} text="Export"/>
      <Menu.Item icon="import" onClick={() => {
      }} text="Import"/>
    </Menu>
  );
  const viewMenu = (
    <Menu>
      <Menu.Item icon="plus" onClick={() => props.showModal('newView')} text="Add"/>
      <Menu.Item icon="search-around"
                 onClick={() => props.onViewSetAsMain(props.workspace?.selectedViewId!)}
                 text="Set as default"
                 disabled={!props.workspace?.selectedViewId}/>
      <Menu.Divider/>
      <Menu.Item icon="trash"
                 onClick={() => props.onViewDelete(props.workspace?.selectedViewId!)}
                 text="Delete"
                 disabled={!props.workspace?.selectedViewId}/>
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
        {props.workspace?.project &&
        <Popover content={viewMenu} position={Position.BOTTOM_LEFT}>
          <Button className={Classes.MINIMAL} icon="page-layout" text="View"/>
        </Popover>
        }

        <Navbar.Divider/>
        <Navbar.Heading>
          <H2>{props.workspace?.project?.name}</H2>
        </Navbar.Heading>

        {/*<Button className="bp3-minimal" icon="document" text="Files"/>*/}
      </Navbar.Group>
    </Navbar>
  )
};

const mapStateToProps = (state: ApplicationState) => {
  return {
    workspace: state.workspace || null
  }
}
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    showModal: (name: string) => dispatch(showModal(name)),
    onViewSetAsMain: (id: string) => dispatch(viewSetAsMain(id)),
    onViewDelete: (id: string) => dispatch(viewDelete(id))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);