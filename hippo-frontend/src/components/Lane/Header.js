import React from "react";
import { Pane, Heading } from "evergreen-ui";

const Header = ({ title, children, ...other }) => {
  return (
    <Pane
      display="flex"
      marginRight={20}
      marginBottom={10}
      paddingTop={25}
      paddingRight={5}
      paddingLeft={25}
      alignItems="center"
      {...other}
    >
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
