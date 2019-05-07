import React from "react";
import { Pane, Heading, Text } from "evergreen-ui";
import { Link } from "react-router-dom";

const Header = ({ height, triggerTitle }) => {
  return (
    <Pane display="flex" padding={16} height={height} background="white">
      <Heading size={600}>
        Hippo ·{" "}
        <Text size={600}>
          <Link to="/projects">{triggerTitle}</Link>
        </Text>
      </Heading>
    </Pane>
  );
};

export default Header;
