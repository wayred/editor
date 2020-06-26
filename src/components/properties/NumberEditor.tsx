/** @jsx jsx */
import {jsx} from '@emotion/core';
import React, {useState} from "react";

type NumberEditorProps = {
  value?: string | number;
  onChange: (value?: string | number) => void;
}

const NumberEditor = (props: NumberEditorProps) => {
  const [value, setValue] = useState(props.value || '');
  return (
    <input type="number" value={value}
           onChange={e => setValue(e.target.value)}
           onBlur={() => props.onChange((!value && value !== 0) ? undefined : Number(value))}
    />
  );
}

export default NumberEditor;

