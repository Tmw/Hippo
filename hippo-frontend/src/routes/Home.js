import React, { useCallback } from "react";
import { Pane } from "evergreen-ui";
import SpinnerWithText from "components/SpinnerWithText";
import ErrorWithText from "components/ErrorWithText";

import { Query } from "react-apollo";
import { either, pipe, head, prop, isNil, isEmpty } from "ramda";
import { Redirect } from "react-router-dom";

import GET_PROJECTS from "graphql/get_projects_query";

const shouldRenderEmptyView = pipe(
  prop("projects"),
  either(isEmpty, isNil)
);

const idOfFirstProject = pipe(
  head(),
  prop("id")
);

const Home = () => {
  const HandleQuery = useCallback(({ loading, error, data }) => {
    if (loading) return <SpinnerWithText text="Hold on.." />;
    if (error)
      return (
        <ErrorWithText text="Uh oh.." description="Error fetching projects.." />
      );
    if (shouldRenderEmptyView(data)) {
      return <div>Nothing to show here..</div>;
    }

    const id = idOfFirstProject(data.projects);
    return <Redirect to={`/projects/${id}`} />;
  }, []);

  return (
    <Pane
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100%"
    >
      <Query query={GET_PROJECTS}>{HandleQuery}</Query>
    </Pane>
  );
};

export default Home;
