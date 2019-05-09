import React from "react";
import { Pane, Heading, Text, Tooltip, IconButton } from "evergreen-ui";
import { Link, Route } from "react-router-dom";
import { withRouter } from "react-router-dom";

// The Edit Project Button triggers the Project Edit sidesheet to open
const EditProjectButton = () => (
  <Tooltip content="Edit Project details">
    <IconButton icon="cog" appearance="minimal" />
  </Tooltip>
);

// The main Header component renders the header at the top of the page.
// by default it displays the current project name, and
const Header = ({ height, triggerTitle, history }) => {
  // create a route that is relative to the current route
  const projectsPickerRoute = `${history.location.pathname}/projects-picker`;
  return (
    <Pane display="flex" padding={16} height={height} background="white">
      <Heading size={600} align="left" flexGrow={1} marginLeft={10}>
        Hippo ·{" "}
        <Text size={600}>
          <Tooltip content="Switch to another project">
            <Link to={projectsPickerRoute}>{triggerTitle}</Link>
          </Tooltip>
        </Text>
      </Heading>

      <Pane width={100} align="right">
        <Route path="/projects/:projectId" component={EditProjectButton} />
      </Pane>
    </Pane>
  );
};

export default withRouter(Header);
