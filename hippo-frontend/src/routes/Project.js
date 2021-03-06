import React from "react";
import SpinnerWithText from "components/SpinnerWithText";
import ErrorWithText from "components/ErrorWithText";
import { useQuery } from "@apollo/react-hooks";
import GET_PROJECT from "graphql/get_project_query";
import Project from "components/Project";

const ProjectRoute = ({ match: { params } }) => {
  const { data, error, loading } = useQuery(GET_PROJECT, {
    variables: { id: params.projectId }
  });

  if (loading) return <SpinnerWithText text="Hold on.." />;
  if (error)
    return <ErrorWithText text="Uh-oh.." description={error.message} />;

  return <Project project={data.project} />;
};

export default ProjectRoute;
