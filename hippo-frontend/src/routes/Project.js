import React, { useCallback } from "react";
import { Pane, Heading, Paragraph } from "evergreen-ui";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

const GET_PROJECT = gql`
  query Projects($id: identifier!) {
    projects(id: $id) {
      id
      title
      description
      lanes {
        id
        title
        description
        cards {
          id
          title
          description
        }
      }
    }
  }
`;

const Card = ({ data: { title, description } }) => (
  <Pane
    width="100%"
    minHeight="150px"
    borderRadius="5px"
    marginBottom="15px"
    background="white"
    elevation={1}
    padding="15px"
  >
    <Heading size={500} align="left" marginBottom="10px">
      {title}
    </Heading>
    <Paragraph align="left">{description}</Paragraph>
  </Pane>
);

const Lane = ({ data: { title, cards } }) => (
  <Pane
    minWidth={350}
    height="100%"
    marginRight={15}
    padding={25}
    paddingRight={5}
    background="#f6f6f6"
    className="Lane"
    borderRadius="5px"
    display="flex"
    flexDirection="column"
  >
    <Heading size={500} marginBottom={10} align="left">
      {title}
    </Heading>

    <Pane paddingRight="20px" overflowY="scroll">
      {cards.map(c => (
        <Card data={c} key={c.id} />
      ))}
    </Pane>
  </Pane>
);

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

const Project = ({ match: { params } }) => {
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
