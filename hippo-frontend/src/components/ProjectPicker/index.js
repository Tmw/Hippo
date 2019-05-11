import React, { useCallback } from "react";
import { Card, Pane, Paragraph, Heading, Spinner } from "evergreen-ui";

import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import { either, pipe, prop, isNil, isEmpty } from "ramda";

import SidePanel from "../SidePanel";
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

      return data.projects.map(p => (
        <Card
          key={"pp-" + p.id}
          backgroundColor="white"
          elevation={0}
          height={120}
          display="flex"
          justifyContent="center"
          flexDirection="column"
          hoverElevation={1}
          padding={20}
          marginBottom={10}
          cursor="pointer"
          onClick={() => props.history.push("/projects/" + p.id)}
        >
          <Heading size={500}>{p.title}</Heading>
          <Paragraph>{p.description}</Paragraph>
        </Card>
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
