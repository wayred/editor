/** @jsx jsx */
import {jsx} from '@emotion/core';
import React from "react";
import {EnumOption} from "../../types";

type EnumEditorProps = {
  value?: any;
  onChange: (value: any) => void;
  options: EnumOption[]
}

const EnumEditor = (props: EnumEditorProps) => {
  return (
    <select value={props.value} onChange={e => props.onChange(e.target.value)}>
      {props.options.map(option => <option key={option.label} value={option.value}>{option.label}</option>)}
    </select>
  );
}

export default EnumEditor;
