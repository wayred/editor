/** @jsx jsx */
import {jsx} from '@emotion/core';
import React, {useState} from "react";
import EnumEditor from "./EnumEditor";
import {ApplicationState, EnumOption} from "../../types";
import {connect} from "react-redux";


type FunctionEditorProps = {
  value?: any;
  onChange: (value?: any) => void;
  contexts: EnumOption[];
  functions: EnumOption[];
}

const FunctionEditor = (props: FunctionEditorProps) => {
  const [value, setValue] = useState(props.value);
  const onContextChangeHandler = (ctx: any) => {
    const newValue = {...value, context: ctx};
    setValue(newValue);
    props.onChange(newValue);
  }
  return (
    <div css={container}>
      <EnumEditor onChange={onContextChangeHandler} options={props.contexts} value={value?.context}/>
      <EnumEditor onChange={onContextChangeHandler} options={props.functions} value={value?.fn}/>
    </div>
  );
}

const mapStateToProps = (state: ApplicationState) => {
  const contexts = state.registry?.contexts.map(ctx => ({label: ctx, value: ctx})) || [];
  contexts.unshift({label: 'none', value: ''});
  const functions = state.registry?.functions.map(fn => ({label: fn, value: fn})) || [];
  functions.unshift({label: 'none', value: ''});
  return {
    contexts: contexts,
    functions: functions
  }
}
export default connect(mapStateToProps)(FunctionEditor);

const container = {
  display: 'flex',
  '&>*': {
    flex: 1
  }
}