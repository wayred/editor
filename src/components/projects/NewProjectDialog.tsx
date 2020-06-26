import React, {useEffect} from "react";
import {connect} from "react-redux";
import {hideModal} from "../../actions/modals";
import {newProjectCreated} from "../../actions/project";
import {ApplicationState, EnumOption} from "../../types";
import {Dispatch} from "redux";
import {Project} from "@wayred/core";
import {useForm} from "react-hook-form";
import {Button, Classes, Dialog} from "@blueprintjs/core";
import {Select} from "@blueprintjs/select";

export type NewProjectModalProps = {
  visible: boolean;
  onCancel: () => void;
  onProjectCreated: (project: Project) => void;
};

const projectTypes = [
  {label: 'React (web)', value: 'react'},
  {label: 'React Native (mobile)', value: 'react-native'},
];

const ProjectTypeSelect = Select.ofType<EnumOption>();

const NewProjectDialog = (props: NewProjectModalProps) => {
  const {handleSubmit, errors, setValue, register} = useForm();

  useEffect(() => {
    register({name: "type"}, {required: true});
    register({name: "name"}, {required: true, maxLength: 50});
  }, [register]);

  const onSubmit = (data: any) => {
    const project = {
      name: data.name,
      type: data.type?.key
    } as Project;

    // TODO move this request to a service like file/function
    fetch('http://localhost:13579/api/applications', {
      method: 'POST',
      body: JSON.stringify(project),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => response.json())
      .then((json) => {
        props.onProjectCreated(json);
      })
      .catch((error) => console.error(error));
  };

  return (
    <Dialog isOpen={props.visible} title="New Project" onClose={() => props.onCancel()}>

      <label>Name</label>
      <input className={Classes.INPUT} name="name"/>

      {/*<ProjectTypeSelect*/}
      {/*  items={projectTypes}*/}
      {/*  itemPredicate={Films.itemPredicate}*/}
      {/*  itemRenderer={Films.itemRenderer}*/}
      {/*  noResults={<MenuItem disabled={true} text="No results." />}*/}
      {/*  onItemSelect={...}*/}
      {/*>*/}
      {/*  /!* children become the popover target; render value here *!/*/}
      {/*  <Button text={Films.items[0].title} rightIcon="double-caret-vertical" />*/}
      {/*</ProjectTypeSelect>*/}

      {/*<TextField*/}
      {/* label="Name"*/}
      {/* onChange={(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {console.log(newValue);setValue("name",newValue,true)}}/>*/}
      {/*{errors.name && errors.name.type === "required" && (<Text>{REQUIREDFIELD}</Text>)}*/}
      {/*{errors.name && errors.name.type === "maxLength" && (<Text>{MAXLENGTH50}</Text>)}*/}

      {/*<Dropdown*/}
      {/*  label="Type"*/}
      {/*  onChange={(event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => setValue("type",option,true)}*/}
      {/*  placeholder="Select an option"*/}
      {/*  options={projectTypeOptions}/>*/}
      {/*{errors.type && (<Text>{REQUIREDFIELD}</Text>)}*/}

      {/*<DialogFooter>*/}
      {/*  <DefaultButton text="Cancel" onClick={props.onCancel} />*/}
      {/*  <PrimaryButton text="Create" title="Submit" onClick={handleSubmit(onSubmit)} />*/}
      {/*</DialogFooter>*/}
    </Dialog>
  );
};

const mapStateToProps = (state: ApplicationState) => {
  return {
    visible: !!state.modals.newProject?.isVisible
  }
}
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onCancel: () => dispatch(hideModal('newProject')),
    onProjectCreated: (project: Project) => dispatch(newProjectCreated(project)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(NewProjectDialog);