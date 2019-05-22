import React, { useCallback } from "react";
import { Pane, Heading, Text, Link, Tooltip, IconButton } from "evergreen-ui";
import { Route } from "react-router-dom";
import { withRouter } from "react-router-dom";

// The Edit Project Button triggers the Project Edit sidesheet to open
const EditProjectButton = ({ onEditClicked }) => {
  return (
    <Tooltip content="Edit Project details">
      <IconButton icon="cog" appearance="minimal" onClick={onEditClicked} />
    </Tooltip>
  );
};

// The main Header component renders the header at the top of the page.
// by default it displays the current project name, and
const Header = ({ history, triggerTitle }) => {
  // to make links relative, we need the current URL we're looking at.
  const basePath = history.location.pathname;

  // from there, we can make a relative link
  const relativeLinkTo = useCallback(
    location => e => {
      e.preventDefault();
      history.push(`${basePath}/${location}`);
    },
    [basePath, history]
  );

  return (
    <Pane display="flex" padding={16} width="100%" background="white">
      <Heading size={600} align="left" flexGrow={1} marginLeft={10}>
        Hippo ·{" "}
        <Text size={600}>
          <Tooltip content="Switch to another project">
            <Link
              size={600}
              href={`${basePath}/projects-picker`}
              onClick={relativeLinkTo("projects-picker")}
            >
              {triggerTitle}
            </Link>
          </Tooltip>
        </Text>
      </Heading>

      <Pane width={100} align="right">
        <Route
          path="/projects/:projectId"
          component={() => (
            <EditProjectButton onEditClicked={relativeLinkTo("edit")} />
          )}
        />
      </Pane>
    </Pane>
  );
};

export default withRouter(Header);
