import React from "react";
import { Button, Pane, Heading } from "evergreen-ui";
import Lane from "components/Lane";
import LaneWrapper from "components/Lane/Wrapper";

import Header from "components/Header";

const CreateLaneLane = ({ initial }) => {
  const cta = initial ? "Get started!" : "Running out of space?";
  return (
    <LaneWrapper>
      <Pane
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100%"
      >
        <Heading marginBottom="10px">{cta}</Heading>
        <Button iconBefore="plus">Add lane</Button>
      </Pane>
    </LaneWrapper>
  );
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
      <CreateLaneLane initial={lanes.length === 0} />
    </Pane>
  </React.Fragment>
);

export default Project;
