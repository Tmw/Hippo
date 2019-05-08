import React, { useCallback } from "react";
import {
  Card,
  SideSheet,
  Position,
  Pane,
  Paragraph,
  Heading,
  Spinner
} from "evergreen-ui";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import { either, pipe, prop, isNil, isEmpty } from "ramda";
import { Link } from "react-router-dom";

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
          height={240}
          padding={20}
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
    <SideSheet
      isShown={true}
      onCloseComplete={closeHandler}
      position={Position.LEFT}
      containerProps={{
        display: "flex",
        flex: "1",
        flexDirection: "column"
      }}
    >
      <Pane zIndex={1} flexShrink={0} elevation={0} backgroundColor="white">
        <Pane padding={16}>
          <Heading size={600}>Switch to Project</Heading>
        </Pane>
      </Pane>
      <Pane flex="1" overflowY="scroll" background="tint1" padding={16}>
        <Query query={GET_PROJECTS}>{HandleQuery}</Query>
      </Pane>
    </SideSheet>
  );
};

export default ProjectPicker;
