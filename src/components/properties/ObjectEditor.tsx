/** @jsx jsx */
import {jsx} from '@emotion/core';
import React from "react";
import {Icon} from "@blueprintjs/core";

type ObjectEditorProps = {
  value?: string;
  onChange: () => void;
}

const ObjectEditor = (props: ObjectEditorProps) => {

  return (
    <div css={container}>
      <Icon css={labelIcon}
                icon={props.value ? 'chevron-right' : 'chevron-down'}
                onClick={props.onChange}
      />
    </div>
  );
}

export default ObjectEditor;

const container = {
  display: 'flex',
  justifyContent: 'flex-start'
}
const labelIcon = {
  cursor: 'pointer'
}