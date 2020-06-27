import React from "react";
import {Button, Classes, Dialog, FormGroup, HTMLSelect} from "@blueprintjs/core";
import {useForm} from "react-hook-form";
import {ApplicationState} from "../../types";
import {Dispatch} from "redux";
import {hideModal} from "../../actions/modals";
import {projectCreate} from "../../actions/project.actions";
import {connect} from "react-redux";
import {viewCreate} from "../../actions/view.actions";

type NewViewDialogProps = {
  visible: boolean;
  onCancel: () => void;
  onCreate: (name: string) => void;
}

const NewViewDialog = (props: NewViewDialogProps) => {
  const {handleSubmit, errors, setValue, register} = useForm();

  const onSubmit = (data: any) => {
    props.onCreate(data.name);
  }
    return (
    <Dialog isOpen={props.visible} title="New View" onClose={() => props.onCancel()}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={Classes.DIALOG_BODY}>
          <FormGroup label="Name" labelFor="viewName">
            <input id="viewName" className={Classes.INPUT} name="name" ref={register}/>
          </FormGroup>
        </div>

        <div className={Classes.DIALOG_FOOTER}>
          <Button intent="primary" text="Create" type="submit"/>
          <Button text="Cancel" onClick={props.onCancel}/>
        </div>
      </form>
    </Dialog>
  )
}

const mapStateToProps = (state: ApplicationState) => {
  return {
    visible: !!state.modals.newView?.isVisible
  }
}
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onCancel: () => dispatch(hideModal('newView')),
    onCreate: (name: string) => dispatch(viewCreate(name)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(NewViewDialog);
