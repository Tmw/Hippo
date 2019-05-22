import React from "react";
import { Pane, Icon, Text, Strong } from "evergreen-ui";

const ErrorWithText = ({ text, description }) => (
  <Pane align="center" display="flex" flexDirection="column">
    <Icon icon="error" size={40} marginBottom="10px" />
    <Strong weight={600}>{text}</Strong>
    <Text weight={600}>{description}</Text>
  </Pane>
);

export default ErrorWithText;
