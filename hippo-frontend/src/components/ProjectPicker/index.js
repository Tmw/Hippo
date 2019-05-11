import React, { useCallback } from "react";
import { Spinner } from "evergreen-ui";
import { Query } from "react-apollo";
import { either, pipe, prop, isNil, isEmpty } from "ramda";

import SidePanel from "../SidePanel";
import ProjectCard from "./ProjectCard";
import GET_PROJECTS from "../../graphql/get_projects_query";

const shouldRenderEmptyView = pipe(
  prop("projects"),
  either(isEmpty, isNil)
);

const ProjectPicker = props => {
  const closeHandler = useCallback(() => {
    props.history.goBack();
  }, [props]);

  const HandleQuery = useCallback(
    ({ loading, error, data }) => {
      if (loading) return <Spinner />;
      if (error) return <div>Uh, oh :(</div>;
      if (shouldRenderEmptyView(data)) {
        return <div>Nothing to show here..</div>;
      }

      return data.projects.map(project => (
        <ProjectCard
          key={project.id}
          project={project}
          onClick={() => props.history.push("/projects/" + project.id)}
        />
      ));
    },
    [props.history]
  );

  return (
    <SidePanel onClose={closeHandler} title="Switch to Project">
      <Query query={GET_PROJECTS}>{HandleQuery}</Query>
    </SidePanel>
  );
};

export default ProjectPicker;
