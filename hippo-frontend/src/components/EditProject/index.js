import React, { useCallback } from "react";
import { Button, TextInputField, Textarea, Label, Pane } from "evergreen-ui";
import SidePanel from "../SidePanel";

const ProjectFormFields = props => (
  <React.Fragment>
    <TextInputField
      tabindex={0}
      label="Project Title"
      placeholder="Project Title"
      required
    />
    <Label htmlFor="description" marginBottom={4} display="block">
      Project Description
    </Label>
    <Textarea name="description" placeholder="Project Description" />
  </React.Fragment>
);

const EditProject = props => {
  const closeHandler = useCallback(() => {
    props.history.goBack();
  }, [props.history]);

  return (
    <SidePanel onClose={closeHandler} title="Edit Project">
      <form>
        <ProjectFormFields />
        <Pane display="flex" marginTop={16}>
          <Pane>
            <Button appearance="minimal" iconBefore="trash" intent="danger">
              Delete Project
            </Button>
          </Pane>

          <Pane flex={1} align="right">
            <Button marginRight={12}>Cancel</Button>
            <Button appearance="primary">Save</Button>
          </Pane>
        </Pane>
      </form>
    </SidePanel>
  );
};

export default EditProject;
