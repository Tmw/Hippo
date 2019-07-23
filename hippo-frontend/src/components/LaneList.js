import React, { useCallback } from "react";
import { withRouter } from "react-router-dom";
import { toaster } from "evergreen-ui";
import { useMutation } from "react-apollo-hooks";

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
  const deleteLaneMutation = useMutation(DELETE_LANE_MUTATION, {
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

  const onLaneDeletionError = useCallback(() => {
    toaster.danger("Error deleting lane.. Please try again");
  }, []);

  const onLaneDeletionSuccess = useCallback(() => {
    toaster.success("Lane succesfully deleted", { duration: 2 });
  }, []);

  return lanes.map(lane => (
    <React.Fragment>
      <Lane
        key={lane.id}
        data={lane}
        onLaneDelete={toggleDeleteLaneDialog}
        onLaneEdit={handleEditLaneClicked}
      />

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
  ));
};
export default withRouter(LaneList);
