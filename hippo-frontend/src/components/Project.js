import React from "react";
import { Pane } from "evergreen-ui";
import Lane from "components/Lane";
import Header from "components/Header";

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
    </Pane>
  </React.Fragment>
);

export default Project;
