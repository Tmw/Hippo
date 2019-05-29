import React, { useCallback } from "react";
import { Tooltip, IconButton } from "evergreen-ui";
import { Link } from "react-router-dom";

import SidePanel from "components/SidePanel";
import ProjectPickerList from "components/ProjectPicker/List";

const SideSheetActionNewProject = () => (
  <Tooltip content="Start new Project">
    <Link to="/projects/new" tabIndex={0}>
      <IconButton appearance="minimal" icon="plus" />
    </Link>
  </Tooltip>
);

const ProjectPickerRoute = ({ history }) => {
  const closeHandler = useCallback(() => history.goBack(), [history]);

  return (
    <SidePanel
      onClose={closeHandler}
      title="Switch to Project"
      panelActions={[<SideSheetActionNewProject key="new-project-button" />]}
    >
      <ProjectPickerList />
    </SidePanel>
  );
};

export default ProjectPickerRoute;
