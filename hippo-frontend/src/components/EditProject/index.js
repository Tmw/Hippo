import React, { useCallback } from "react";
import {
  Button,
  SideSheet,
  Heading,
  TextInputField,
  Textarea,
  Label,
  Position,
  Pane
} from "evergreen-ui";

const EditProject = props => {
  const closeHandler = useCallback(() => {
    props.history.goBack();
  }, [props.history]);

  return (
    <SideSheet
      isShown={true}
      onCloseComplete={closeHandler}
      position={Position.LEFT}
      containerProps={{
        display: "flex",
        flex: 1,
        flexDirection: "column"
      }}
    >
      <Pane zIndex={1} flexShrink={0} elevation={0} backgroundColor="white">
        <Pane padding={16}>
          <Heading size={600}>Edit Project</Heading>
        </Pane>
      </Pane>
      <Pane flex="1" flexGrow={1} background="tint1" padding={16}>
        <form>
          <TextInputField
            label="Project Title"
            placeholder="Project Title"
            required
          />
          <Label htmlFor="description" marginBottom={4} display="block">
            Project Description
          </Label>
          <Textarea name="description" placeholder="Project Description" />

          <Pane align="right" marginTop={16}>
            <Button marginRight={12}>Cancel</Button>
            <Button appearance="primary">Save</Button>
          </Pane>
        </form>
      </Pane>
    </SideSheet>
  );
};

export default EditProject;
