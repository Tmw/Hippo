import React from "react";
import { useQuery } from "react-apollo-hooks";
import { pipe, head, prop } from "ramda";
import { Redirect } from "react-router-dom";

import GET_PROJECTS from "graphql/get_projects_query";
import SpinnerWithText from "components/SpinnerWithText";
import ErrorWithText from "components/ErrorWithText";

const idOfFirstProject = pipe(
  head(),
  prop("id")
);

const Home = () => {
  const { data, error, loading } = useQuery(GET_PROJECTS);

  if (loading) return <SpinnerWithText text="Hold on.." />;
  if (error)
    return (
      <ErrorWithText text="Uh oh.." description="Error fetching projects.." />
    );

  const id = idOfFirstProject(data.projects);
  return <Redirect to={`/projects/${id}`} />;
};

export default Home;
