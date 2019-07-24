import React, { useCallback } from "react";
import { withRouter } from "react-router-dom";
import { DragDropContext } from "react-beautiful-dnd";
import LaneList from "components/LaneList";

import Header from "components/Header";

const Project = ({ project: { lanes }, project, history }) => {
  const onDragEnd = useCallback(dragInfo => {
    console.log("dragInfo:", dragInfo);
  }, []);

  return (
    <React.Fragment>
      <Header triggerTitle={project.title} />
      <DragDropContext onDragEnd={onDragEnd}>
        <LaneList lanes={lanes} projectId={project.id} />
      </DragDropContext>
    </React.Fragment>
  );
};

export default withRouter(Project);
