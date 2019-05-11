import React from "react";
import { Pane, Heading, Paragraph } from "evergreen-ui";

const Card = ({ data: { title, description } }) => (
  <Pane
    width="100%"
    minHeight="150px"
    borderRadius="5px"
    marginBottom="15px"
    background="white"
    elevation={1}
    padding="15px"
  >
    <Heading size={500} align="left" marginBottom="10px">
      {title}
    </Heading>
    <Paragraph align="left">{description}</Paragraph>
  </Pane>
);

export default Card;
