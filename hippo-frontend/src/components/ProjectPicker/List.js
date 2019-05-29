import React from "react";
import { useQuery } from "react-apollo-hooks";

import GET_PROJECTS from "graphql/get_projects_query";
import SpinnerWithText from "components/SpinnerWithText";
import ErrorWithText from "components/ErrorWithText";
import ProjectCard from "components/ProjectPicker/Card";

const ProjectPickerList = () => {
  const { error, loading, data } = useQuery(GET_PROJECTS);

  if (loading) return <SpinnerWithText text="Hold on.." />;
  if (error)
    return (
      <ErrorWithText text="Uh oh!" description="Error fetching Projects.." />
    );

  return data.projects.map(project => (
    <ProjectCard key={project.id} project={project} />
  ));
};

export default ProjectPickerList;
