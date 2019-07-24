import React from "react";
import { Pane } from "evergreen-ui";

const Wrapper = ({ children, ...other }) => (
  <Pane
    width={320}
    height="100%"
    marginRight={15}
    paddingRight={5}
    background="#f6f6f6"
    className="Lane"
    borderRadius="5px"
    display="flex"
    flexShrink={0}
    flexDirection="column"
    {...other}
  >
    {children}
  </Pane>
);

export default Wrapper;
