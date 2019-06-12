import React from "react";
import { Pane } from "evergreen-ui";

const Wrapper = ({ children }) => (
  <Pane
    minWidth={350}
    height="100%"
    marginRight={15}
    padding={25}
    paddingRight={5}
    background="#f6f6f6"
    className="Lane"
    borderRadius="5px"
    display="flex"
    flexDirection="column"
  >
    {children}
  </Pane>
);

export default Wrapper;
