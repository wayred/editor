import React, {useState} from "react";
import {ITreeNode, Tree} from "@blueprintjs/core";

const Inspector = () => {
  const [collapsed, setCollapsed] = useState<any>({});
  const nodes: ITreeNode[] = [
    {
      id: 'asdf',
      label: 'Texto',
      isExpanded: !collapsed.asdf,
      childNodes: [
        {
          id: 'asd12f',
          label: 'Child 1',
          isExpanded: !collapsed.asd12f,
        },
        {
          id: 'as32df',
          label: 'Segundo',
          isExpanded: !collapsed.as32df,
        }
      ]
    }
  ];
  const onNodeCollapseHandler = (node: ITreeNode) => {
    setCollapsed((prevState: any) => {
      return {
      ...prevState,
        [node.id]: true
      }
    });
  };
  const onNodeExpandHandler = (node: ITreeNode) => {
    setCollapsed((prevState: any) => {
      return {
        ...prevState,
        [node.id]: false
      }
    });
  };
  return (
    <Tree contents={nodes}
          onNodeCollapse={onNodeCollapseHandler}
          onNodeExpand={onNodeExpandHandler}/>
  )
};

export default Inspector;