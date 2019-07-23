import React, { useState, useCallback } from "react";
import { withRouter } from "react-router-dom";
import { Dialog, toaster } from "evergreen-ui";
import { useMutation } from "react-apollo-hooks";

import DELETE_LANE_MUTATION from "graphql/delete_lane_mutation";
import GET_PROJECT from "graphql/get_project_query";
import Lane from "components/Lane";

const LaneList = ({ lanes, projectId, history }) => {
  // Lane deletion state management, callbacks and GraphQL Mutation
  const [isDeleteDialogVisible, setLaneDeletionDialogVisible] = useState(false);
  const [isLaneDeleting, setLaneDeleting] = useState(false);
  const [selectedLaneIdentifier, setSelectedLaneIdentifier] = useState(null);

  // define the lane deletion mutation
  const deleteLane = useMutation(DELETE_LANE_MUTATION, {
    variables: { laneId: selectedLaneIdentifier },
    refetchQueries: [{ query: GET_PROJECT, variables: { id: projectId } }]
  });

  // toggle the lane deletion dialog
  const toggleDeleteLaneDialog = useCallback(laneId => {
    setSelectedLaneIdentifier(laneId);
    setLaneDeletionDialogVisible(true);
  }, []);

  // State and callbacks for editing a lane
  const handleEditLaneClicked = useCallback(
    laneId => {
      history.push(`/projects/${projectId}/lanes/${laneId}/edit`);
    },
    [history, projectId]
  );

  // perform the actual lane deletion mutation
  const handleDeleteLane = useCallback(() => {
    setLaneDeleting(true);

    deleteLane()
      .then(() => {
        setLaneDeleting(true);
        setSelectedLaneIdentifier(null);
        setLaneDeletionDialogVisible(false);
        toaster.success("Lane succesfully deleted", { duration: 2 });
      })
      .catch(error => {
        console.error(error);
        toaster.danger("Error deleting lane.. Please try again");
      });
  }, [deleteLane]);

  return lanes.map(lane => (
    <React.Fragment>
      <Lane
        key={lane.id}
        data={lane}
        onLaneDelete={toggleDeleteLaneDialog}
        onLaneEdit={handleEditLaneClicked}
      />

      <Dialog
        isShown={isDeleteDialogVisible}
        title="Are you sure?"
        intent="danger"
        onCloseComplete={() => setLaneDeletionDialogVisible(false)}
        onConfirm={handleDeleteLane}
        isConfirmLoading={isLaneDeleting}
        confirmLabel="Delete Lane"
      >
        Are you sure you want to delete this lane?
      </Dialog>
    </React.Fragment>
  ));
};
export default withRouter(LaneList);
