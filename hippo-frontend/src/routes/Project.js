import React, { useCallback } from "react";
import { Pane } from "evergreen-ui";
import { Query } from "react-apollo";
import GET_PROJECT from "../graphql/get_project_query";

import Lane from "../components/Lane";

const ProjectComponent = ({ project: { lanes } }) => (
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
);

const Project = ({ match: { params }, match }) => {
  const HandleQuery = useCallback(({ loading, error, data }) => {
    if (loading) return <strong>hold on..</strong>;
    if (error) return <strong>Uh-oh..</strong>;

    if (data) {
      const { projects } = data;
      const project = projects[0];
      return <ProjectComponent project={project} />;
    }
  }, []);

  return (
    <Pane
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100%"
    >
      <Query query={GET_PROJECT} variables={{ id: params.projectId }}>
        {HandleQuery}
      </Query>
    </Pane>
  );
};

export default Project;
