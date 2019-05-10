import React, { useCallback } from "react";
import { SideSheet, Position, Pane } from "evergreen-ui";

const EditProject = props => {
  const closeHandler = useCallback(() => {
    props.history.goBack();
  }, [props.history]);

  // This sidesheet thing should be a HippoSideSheet with pre-defined styling, no?
  return (
    <SideSheet
      isShown={true}
      onCloseComplete={closeHandler}
      position={Position.LEFT}
    >
      <Pane padding={20}>
        <strong>Hello, world! I'm an edit modal!</strong>
      </Pane>
    </SideSheet>
  );
};

export default EditProject;
