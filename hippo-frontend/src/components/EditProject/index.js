import React, { useCallback } from "react";
import { Button, Pane } from "evergreen-ui";
import SidePanel from "components/SidePanel";
import ProjectFormFields from "components/Forms/ProjectFormFields";

const EditProject = ({ history }) => {
  const closeHandler = useCallback(() => {
    history.goBack();
  }, [history]);

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
