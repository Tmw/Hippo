import React from "react";
import { Pane, Heading } from "evergreen-ui";
import Card from "components/Card";

const Lane = ({ data: { title, cards } }) => (
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
    <Heading size={500} marginBottom={10} align="left">
      {title}
    </Heading>

    <Pane paddingRight="20px" overflowY="scroll">
      {cards.map(c => (
        <Card data={c} key={c.id} />
      ))}
    </Pane>
  </Pane>
);

export default Lane;
