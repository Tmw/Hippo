import React, { useCallback } from "react";
import { withRouter } from "react-router-dom";
import { Pane, toaster } from "evergreen-ui";
import { useMutation } from "@apollo/react-hooks";

import { Droppable } from "react-beautiful-dnd";
import CreateLaneCTA from "components/CreateLaneCTA";

import {
  ConfirmAndMutate,
  useConfirmAndMutationState
} from "components/ConfirmAndMutate";

import DELETE_LANE_MUTATION from "graphql/delete_lane_mutation";
import GET_PROJECT from "graphql/get_project_query";
import Lane from "components/Lane";

const LaneList = ({ lanes, projectId, history }) => {
  const {
    visible: dialogVisible,
    identifier: selectedLaneId,
    showDialog,
    closeDialog
  } = useConfirmAndMutationState();

  // define the lane deletion mutation
  const [deleteLaneMutation] = useMutation(DELETE_LANE_MUTATION, {
    variables: { laneId: selectedLaneId },
    refetchQueries: [{ query: GET_PROJECT, variables: { id: projectId } }]
  });

  // toggle the lane deletion dialog
  const toggleDeleteLaneDialog = useCallback(laneId => showDialog(laneId), [
    showDialog
  ]);

  // State and callbacks for editing a lane
  const handleEditLaneClicked = useCallback(
    laneId => {
      history.push(`/projects/${projectId}/lanes/${laneId}/edit`);
    },
    [history, projectId]
  );

  // Lane creation callback
  const handleAddClicked = useCallback(
    () => history.push(`/projects/${projectId}/lanes/new`),
    [history, projectId]
  );

  const onLaneDeletionError = useCallback(() => {
    toaster.danger("Error deleting lane.. Please try again");
  }, []);

  const onLaneDeletionSuccess = useCallback(() => {
    toaster.success("Lane succesfully deleted", { duration: 2 });
  }, []);

  return (
    <React.Fragment>
      <Droppable
        droppableId={`project:${projectId}`}
        type="LANE"
        direction="horizontal"
      >
        {(provided, snapshot) => (
          <Pane
            width="100%"
            height="100%"
            display="flex"
            overflowY="scroll"
            padding="25px"
            innerRef={provided.innerRef}
          >
            {lanes.map((lane, index) => (
              <Lane
                key={lane.id}
                index={index}
                data={lane}
                onLaneDelete={toggleDeleteLaneDialog}
                onLaneEdit={handleEditLaneClicked}
              />
            ))}

            {provided.placeholder}

            <CreateLaneCTA
              initial={lanes.length === 0}
              onAdd={handleAddClicked}
            />
          </Pane>
        )}
      </Droppable>

      <ConfirmAndMutate
        mutation={deleteLaneMutation}
        title="Are you sure?"
        description="Are you sure you want to delete this lane?"
        confirmActionTitle="Delete lane"
        isVisible={dialogVisible}
        closeDialog={closeDialog}
        onError={onLaneDeletionError}
        onSuccess={onLaneDeletionSuccess}
      />
    </React.Fragment>
  );
};
export default withRouter(LaneList);
