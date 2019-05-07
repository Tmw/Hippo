import React, { useCallback } from "react";
import { SideSheet, Position, Pane, Heading, Spinner } from "evergreen-ui";
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
  }, [props.history]);

  const HandleQuery = useCallback(({ loading, error, data }) => {
    if (loading) return <Spinner />;
    if (error) return <div>Uh, oh :(</div>;
    if (shouldRenderEmptyView(data)) {
      return <div>Nothing to show here..</div>;
    }

    return (
      <ul>
        {data.projects.map(p => (
          <li>
            <Link to={"projects/" + p.id}>{p.title}</Link>
          </li>
        ))}
      </ul>
    );
  }, []);

  return (
    <SideSheet
      position={Position.LEFT}
      isShown={true}
      onCloseComplete={closeHandler}
    >
      <Pane padding="20px">
        <Heading size={600}>Switch to Project</Heading>

        <Query query={GET_PROJECTS}>{HandleQuery}</Query>
      </Pane>
    </SideSheet>
  );
};

export default ProjectPicker;
