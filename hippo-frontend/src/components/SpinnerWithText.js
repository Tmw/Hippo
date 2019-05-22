import React from "react";
import { Pane, Spinner, Text } from "evergreen-ui";

const SpinnerWithText = ({ text }) => (
  <Pane align="center">
    <Spinner marginBottom="10px" />
    <Text>{text}</Text>
  </Pane>
);

export default SpinnerWithText;
