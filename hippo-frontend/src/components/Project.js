import React from "react";
import { Button, Pane, Heading } from "evergreen-ui";
import Lane from "components/Lane";
import Header from "components/Header";

const titleForAddLaneHeader = lanes => {
  if (lanes.length > 0) {
    return "Running out of space?";
  } else {
    return "Get started";
  }
};

const Project = ({ project: { lanes }, project }) => (
  <React.Fragment>
    <Header triggerTitle={project.title} />
    <Pane
      width="100%"
      height="100%"
      display="flex"
      overflowX="scroll"
      padding="25px"
    >
      {lanes.map(lane => (
        <Lane data={lane} key={lane.id} />
      ))}
      <Pane
        minWidth={350}
        height="100%"
        marginRight={15}
        padding={25}
        background="#f6f6f6"
        className="Lane"
        borderRadius="5px"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Heading>{titleForAddLaneHeader(lanes)}</Heading>
        <Button iconBefore="plus">Add lane</Button>
      </Pane>
    </Pane>
  </React.Fragment>
);

export default Project;
