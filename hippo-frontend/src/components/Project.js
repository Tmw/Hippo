import React, { useCallback, useState } from "react";
import { Button, Pane, Heading, Dialog, toaster } from "evergreen-ui";
import { withRouter } from "react-router-dom";

import { useMutation } from "react-apollo-hooks";

import DELETE_LANE_MUTATION from "graphql/delete_lane_mutation";
import GET_PROJECT from "graphql/get_project_query";

import Lane from "components/Lane";
import LaneWrapper from "components/Lane/Wrapper";
import Header from "components/Header";

const CreateLaneLane = ({ initial, onAdd }) => {
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
        <Button iconBefore="plus" onClick={onAdd}>
          Add lane
        </Button>
      </Pane>
    </LaneWrapper>
  );
};

const Project = ({ project: { lanes }, project, history }) => {
  // Lane deletion state management, callbacks and GraphQL Mutation
  const [isDeleteDialogVisible, setLaneDeletionDialogVisible] = useState(false);
  const [isLaneDeleting, setLaneDeleting] = useState(false);
  const [selectedLaneIdentifier, setSelectedLaneIdentifier] = useState(null);

  // define the lane deletion mutation
  const deleteLane = useMutation(DELETE_LANE_MUTATION, {
    variables: { laneId: selectedLaneIdentifier },
    refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }]
  });

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

  // toggle the lane deletion dialog
  const toggleDeleteLaneDialog = useCallback(laneId => {
    setSelectedLaneIdentifier(laneId);
    setLaneDeletionDialogVisible(true);
  }, []);

  // State and callbacks for editing a lane
  const handleEditLaneClicked = useCallback(
    laneId => {
      history.push(`/projects/${project.id}/lanes/${laneId}/edit`);
    },
    [history, project.id]
  );

  // Lane creation callback
  const handleAddClicked = useCallback(
    () => history.push(`/projects/${project.id}/lanes/new`),
    [history, project.id]
  );

  return (
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
          <Lane
            key={lane.id}
            data={lane}
            onLaneDelete={toggleDeleteLaneDialog}
            onLaneEdit={handleEditLaneClicked}
          />
        ))}
        <CreateLaneLane initial={lanes.length === 0} onAdd={handleAddClicked} />
      </Pane>

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
  );
};

export default withRouter(Project);
