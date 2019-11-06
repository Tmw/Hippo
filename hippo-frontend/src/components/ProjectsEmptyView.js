import React from "react";
import { Button } from "evergreen-ui";
import { Link } from "react-router-dom";
import ErrorWithText from "components/ErrorWithText";

const EmptyView = () => (
  <React.Fragment>
    <ErrorWithText
      text="No projects found.."
      description="Time to start your first project!"
    />
    <br />
    <Link to="/projects/new">
      <Button type="submit" appearance="primary" align="center">
        Start New Project
      </Button>
    </Link>
  </React.Fragment>
);

export default EmptyView;
