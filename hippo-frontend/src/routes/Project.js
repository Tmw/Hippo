import React from "react";
import SpinnerWithText from "components/SpinnerWithText";
import ErrorWithText from "components/ErrorWithText";
import { useQuery } from "react-apollo-hooks";
import GET_PROJECT from "graphql/get_project_query";
import Project from "components/Project";

const firstProject = ({ projects }) => projects[0];

const ProjectRoute = ({ match: { params } }) => {
  const { data, error, loading } = useQuery(GET_PROJECT, {
    variables: { id: params.projectId }
  });

  if (loading) return <SpinnerWithText text="Hold on.." />;
  if (error) return <ErrorWithText text="Uh-oh.." description={error} />;
  return <Project project={firstProject(data)} />;
};

export default ProjectRoute;
