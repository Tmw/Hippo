import React from "react";
import { IconButton, Pane, Heading } from "evergreen-ui";
import Card from "components/Card";

const LaneHeader = ({ title }) => (
  <Pane display="flex" marginRight={20} marginBottom={10} alignItems="center">
    <Heading size={500} flexGrow={1} align="left">
      {title}
    </Heading>

    <Pane align="right">
      <IconButton appearance="minimal" icon="plus" />
    </Pane>
  </Pane>
);

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
    <LaneHeader title={title} />

    <Pane paddingRight="20px" overflowY="scroll">
      {cards.map(c => (
        <Card data={c} key={c.id} />
      ))}
    </Pane>
  </Pane>
);

export default Lane;
