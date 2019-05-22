import React, { useCallback } from "react";
import { Pane } from "evergreen-ui";
import SpinnerWithText from "components/SpinnerWithText";
import ErrorWithText from "components/ErrorWithText";
import { Query } from "react-apollo";
import GET_PROJECT from "graphql/get_project_query";

import Lane from "components/Lane";
import Header from "components/Header";

const ProjectComponent = ({ project: { lanes }, project }) => (
  <React.Fragment>
    <Header triggerTitle={project.title} />
    <Pane
      width="100%"
      height="100%"
      display="flex"
      overflowX="scroll"
      padding="25px"
    >
      {lanes.map(lane => (
        <Lane data={lane} key={lane.id} />
      ))}
    </Pane>
  </React.Fragment>
);

const Project = ({ match: { params } }) => {
  const HandleQuery = useCallback(({ loading, error, data }) => {
    if (loading) return <SpinnerWithText text="Hold on.." />;
    if (error) return <ErrorWithText text="Uh-oh.." description={error} />;

    if (data) {
      const { projects } = data;
      const project = projects[0];
      return <ProjectComponent project={project} />;
    }
  }, []);

  return (
    <Pane
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Query query={GET_PROJECT} variables={{ id: params.projectId }}>
        {HandleQuery}
      </Query>
    </Pane>
  );
};

export default Project;
