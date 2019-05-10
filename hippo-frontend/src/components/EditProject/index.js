import React, { useCallback } from "react";
import { SideSheet, Heading, Position, Pane } from "evergreen-ui";

const EditProject = props => {
  const closeHandler = useCallback(() => {
    props.history.goBack();
  }, [props.history]);

  return (
    <SideSheet
      isShown={true}
      onCloseComplete={closeHandler}
      position={Position.LEFT}
    >
      <Pane padding={36}>
        <Heading size={600}>Edit Project</Heading>
        <p>Another piece of text goes here</p>
      </Pane>
    </SideSheet>
  );
};

export default EditProject;
