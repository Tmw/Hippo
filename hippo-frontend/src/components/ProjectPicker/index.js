import React, { useCallback } from "react";
import { Query } from "react-apollo";
import SpinnerWithText from "components/SpinnerWithText";
import ErrorWithText from "components/ErrorWithText";
import { either, pipe, prop, isNil, isEmpty } from "ramda";

import SidePanel from "components/SidePanel";
import ProjectCard from "components/ProjectPicker/ProjectCard";
import GET_PROJECTS from "graphql/get_projects_query";
import { Tooltip, IconButton } from "evergreen-ui";
import { Link } from "react-router-dom";

const shouldRenderEmptyView = pipe(
  prop("projects"),
  either(isEmpty, isNil)
);

const SideSheetActionNewProject = () => (
  <Tooltip content="Start new Project">
    <Link to="/projects/new" tabIndex={0}>
      <IconButton appearance="minimal" icon="plus" />
    </Link>
  </Tooltip>
);

const ProjectPicker = ({ history }) => {
  const closeHandler = useCallback(() => history.goBack(), [history]);

  const HandleQuery = useCallback(({ loading, error, data }) => {
    if (loading) return <SpinnerWithText text="Hold on.." />;
    if (error)
      return (
        <ErrorWithText text="Uh oh!" description="Error fetching Projects.." />
      );

    if (shouldRenderEmptyView(data)) {
      return <div>Nothing to show here..</div>;
    }

    return data.projects.map(project => (
      <ProjectCard key={project.id} project={project} />
    ));
  }, []);

  return (
    <SidePanel
      onClose={closeHandler}
      title="Switch to Project"
      panelActions={[<SideSheetActionNewProject key="new-project-button" />]}
    >
      <Query query={GET_PROJECTS}>{HandleQuery}</Query>
    </SidePanel>
  );
};

export default ProjectPicker;
