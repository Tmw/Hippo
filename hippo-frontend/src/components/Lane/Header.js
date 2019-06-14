import React from "react";
import { Pane, Heading } from "evergreen-ui";

const Header = ({ title, children }) => {
  return (
    <Pane display="flex" marginRight={20} marginBottom={10} alignItems="center">
      <Heading size={500} flexGrow={1} align="left">
        {title}
      </Heading>

      <Pane align="right" display="flex">
        {children}
      </Pane>
    </Pane>
  );
};

export default Header;
