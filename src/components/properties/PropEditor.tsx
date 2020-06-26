/** @jsx jsx */
import {jsx} from '@emotion/core';
import React, {useState} from "react";
import {ApplicationState, EnumOption, propertyEditors} from "../../types";
import {connect} from "react-redux";
import {PropType} from "@wayred/core";

type ConnectedProps = {
  types?: EnumOption[];
  options?: EnumOption[];
}
type PropEditorProps = {
  name: string;
  type: PropType;
  value: any;
  onNameChange?: (name: string) => void;
  onTypeChange?: (type: PropType) => void;
  onValueChange: (value: any) => void;
  depth: number;
} & ConnectedProps;

const PropEditor = (props: PropEditorProps) => {
  const [name, setName] = useState(props.name);

  const Editor = propertyEditors[props.type];

  return (
    <div css={container}>
      <div css={column}>
        <input value={name}
               css={{paddingLeft: `${props.depth}rem`}}
               onChange={e => setName(e.target.value)}
               disabled={!props.onNameChange}
               onBlur={() => props.name !== name && props.onNameChange && props.onNameChange(name)}/>
      </div>
      <div css={column}>
        <select value={props.type}
                disabled={!props.onTypeChange}
                onChange={e => props.onTypeChange && props.onTypeChange(e.target.value as PropType)}>
          {props.types?.map(type => <option key={type.label} value={type.value}>{type.label}</option>)}
        </select>
      </div>
      <div css={column}>
        <Editor value={props.value} onChange={props.onValueChange} options={props.options}/>
      </div>
    </div>
  );
}

const mapStateToProps = (state: ApplicationState) => {
  return {
    types: Object.keys(propertyEditors).map(name => ({label: name, value: name} as EnumOption))
  }
}
export default connect(mapStateToProps)(PropEditor);

const container = {
  display: 'flex',
  '&>*': {
    flex: 1
  }
}
const column = {
  display: 'flex',
  '&>*': {
    flex: 1
  }
}