import React from "react";
import { Pane, Heading, Text } from "evergreen-ui";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

const Header = ({ height, triggerTitle, history }) => {
  // create a route that is relative to the current route
  const projectsPickerRoute = `${history.location.pathname}/projects-picker`;
  return (
    <Pane display="flex" padding={16} height={height} background="white">
      <Heading size={600}>
        Hippo ·{" "}
        <Text size={600}>
          <Link to={projectsPickerRoute}>{triggerTitle}</Link>
        </Text>
      </Heading>
    </Pane>
  );
};

export default withRouter(Header);
