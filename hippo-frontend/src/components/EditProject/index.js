import React, { useCallback } from "react";
import { Button, Pane } from "evergreen-ui";
import SidePanel from "../SidePanel";
import ProjectFormFields from "../Forms/ProjectFormFields";

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
