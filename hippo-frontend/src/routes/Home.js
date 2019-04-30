import React, { useCallback } from "react";
import { Pane, Spinner } from "evergreen-ui";
import { Query } from "react-apollo";
import { either, pipe, head, prop, isNil, isEmpty } from "ramda";
import { gql } from "apollo-boost";
import { Redirect } from "react-router-dom";

const GET_PROJECTS = gql`
  {
    projects {
      id
      title
      description
    }
  }
`;

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
    if (loading) return <Spinner />;
    if (error) return <div>Uh, oh :(</div>;
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
