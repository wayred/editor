import React, {useState} from "react";
import PropEditor from "./PropEditor";
import {ComponentConfig, Metadata, PropType} from "@wayred/core";
import {ApplicationState} from "../../types";
import {connect} from "react-redux";
import _ from "lodash";
import {Dispatch} from "redux";
import {nodePropertyUpdate} from "../../actions/node";
import {getSelectedNode} from "../../helpers";

type PropPanelProps = {
  selectedNode: ComponentConfig;
  components: string[];
  metadata?: {
    [name: string]: Metadata;
  };
  dispatch: Dispatch;
}

type PropertiesContainerProps = {
  name: string;
  path: string;
  type: PropType;
  metadata?: Metadata;
  node: ComponentConfig;
  dispatch: Dispatch;
  depth: number;
}
const PropertiesContainer = (props: PropertiesContainerProps) => {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <>
      <PropEditor name={props.name}
                  type={props.type}
                  value={collapsed}
                  depth={props.depth}
                  onValueChange={() => setCollapsed(oldValue => !oldValue)}
      />
      {props.metadata && !collapsed && renderEditorsFromMetadata(props.metadata, props.node, props.dispatch, props.path, props.depth + 1)}
    </>
  )
}

const renderEditorsFromMetadata = (metadata: Metadata, node: ComponentConfig, dispatch: Dispatch, path?: string, depth: number = 0): any => {
  const names = metadata && Object.keys(metadata.props) || [];
  const editors = names.map(propName => {
    const propMeta = metadata!.props[propName];
    let propPath = (path ? `${path}.` : '') + propName;
    const isObject = propMeta?.type === 'object';
    const isFunction = propMeta?.type === 'function';
    propPath = isFunction ? propPath.replace('props.', 'handlers.') : propPath;
    const value = _.get(node, propPath);
    const onValueChangeHandler = (value: any) => {
      dispatch(nodePropertyUpdate(node.id, propPath, value));
    }

    return (
      <React.Fragment key={`${node.id}${propPath}`}>
        {
          !isObject &&
          <PropEditor name={propName}
                      type={propMeta?.type || 'text'}
                      value={value}
                      depth={depth}
                      options={propMeta?.options?.map((opt: any) => ({label: opt, value: opt}))}
                      onValueChange={onValueChangeHandler}
          />
        }
        {
          isObject &&
            <PropertiesContainer name={propName}
                                 path={propPath}
                                 type={propMeta?.type || 'text'}
                                 metadata={propMeta?.metadata}
                                 node={node}
                                 depth={depth}
                                 dispatch={dispatch}/>
        }


      </React.Fragment>
    )
  });
  return editors;
}

const PropPanel = (props: PropPanelProps) => {
  if (!props.selectedNode) return <div>'You must select a node first'</div>;
  const component = props.selectedNode.component;
  const metadata = props.metadata && props.metadata[component];

  const BuilderConfigMetadata: Metadata = {
    props: {
      name: {type: "text"},
      component: {type: "enum", options: props.components},
      props: {type: "object", metadata: metadata}
    }
  }

  const editors = metadata && renderEditorsFromMetadata(BuilderConfigMetadata, props.selectedNode, props.dispatch, '');

  return (
    <div>
      {editors}
    </div>
  );
}
const mapStateToProps = (state: ApplicationState) => {
  return {
    selectedNode: getSelectedNode(state.workspace)!,
    components: state.registry?.components || [],
    metadata: state.registry?.metadata
  }
}
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    dispatch: dispatch
  }
}
export default connect(mapStateToProps)(PropPanel);