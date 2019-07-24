import React, { useCallback } from "react";
import { Pane } from "evergreen-ui";
import { withRouter } from "react-router-dom";
import { DragDropContext } from "react-beautiful-dnd";
import CreateLaneCTA from "components/CreateLaneCTA";
import LaneList from "components/LaneList";

import Header from "components/Header";

const Project = ({ project: { lanes }, project, history }) => {
  // Lane creation callback
  const handleAddClicked = useCallback(
    () => history.push(`/projects/${project.id}/lanes/new`),
    [history, project.id]
  );

  const onDragEnd = useCallback(dragInfo => {
    console.log("dragInfo:", dragInfo);
  }, []);

  return (
    <React.Fragment>
      <Header triggerTitle={project.title} />
      <Pane width="100%" height="100%" display="flex" padding="25px">
        <DragDropContext onDragEnd={onDragEnd}>
          <LaneList lanes={lanes} projectId={project.id} />
        </DragDropContext>

        <CreateLaneCTA initial={lanes.length === 0} onAdd={handleAddClicked} />
      </Pane>
    </React.Fragment>
  );
};

export default withRouter(Project);
