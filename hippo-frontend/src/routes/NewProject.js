import React from "react";
import SidePanel from "components/SidePanel";
import ProjectFormFields from "components/Forms/ProjectFormFields";
import { Pane, Button } from "evergreen-ui";

const NewProject = props => (
  <SidePanel title="Start a new Project">
    <form>
      <ProjectFormFields />
      <Pane display="flex" marginTop={16}>
        <Pane flex={1} align="right">
          <Button marginRight={12}>Cancel</Button>
          <Button appearance="primary">Save</Button>
        </Pane>
      </Pane>
    </form>
  </SidePanel>
);

export default NewProject;
