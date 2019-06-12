import React from "react";
import { IconButton, Pane, Heading } from "evergreen-ui";

const Header = ({ title }) => (
  <Pane display="flex" marginRight={20} marginBottom={10} alignItems="center">
    <Heading size={500} flexGrow={1} align="left">
      {title}
    </Heading>

    <Pane align="right">
      <IconButton appearance="minimal" icon="plus" />
    </Pane>
  </Pane>
);

export default Header;
