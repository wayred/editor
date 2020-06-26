/** @jsx jsx */
import {jsx} from '@emotion/core';
import React, {useState} from "react";

type TextEditorProps = {
  value?: string;
  onChange: (value?: string) => void;
}

const TextEditor = (props: TextEditorProps) => {
  const [value, setValue] = useState(props.value || '');
  return (
      <input type="text" value={value}
             onChange={e => setValue(e.target.value)}
             onBlur={() => props.onChange(value)}
      />
  );
}

export default TextEditor;

