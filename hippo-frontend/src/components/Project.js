import React, { useCallback } from "react";
import { withRouter } from "react-router-dom";
import { DragDropContext } from "react-beautiful-dnd";
import { useMutation } from "react-apollo-hooks";

import GET_PROJECT from "graphql/get_project_query";
import REPOSITION_CARD_MUTATION from "graphql/reposition_card_mutation";
import REPOSITION_LANE_MUTATION from "graphql/reposition_lane_mutation";

import LaneList from "components/LaneList";
import Header from "components/Header";

const toActualId = identifier => identifier.split(":")[1];

const Project = ({ project: { lanes }, project }) => {
  const repositionLaneMutation = useMutation(REPOSITION_LANE_MUTATION, {
    refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }]
  });

  const repositionCardMutation = useMutation(REPOSITION_CARD_MUTATION, {
    refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }]
  });

  const onDragEnd = useCallback(
    dragInfo => {
      const draggableType = dragInfo.draggableId.split(":")[0];
      const { draggableId, source, destination } = dragInfo;

      switch (draggableType) {
        case "card":
          // unwrap actual IDs from drag event
          const cardId = toActualId(draggableId);
          const sourceLaneId = toActualId(source.droppableId);
          const targetLaneId = toActualId(destination.droppableId);

          // if source and target are the same, early return to save a mutation
          if (
            sourceLaneId === targetLaneId &&
            source.index === destination.index
          ) {
            return;
          }

          // fire the mutation
          repositionCardMutation({
            variables: {
              cardId,
              laneId: targetLaneId,
              position: destination.index
            }
          }).catch(error => console.error(error));
          break;

        case "lane":
          // grab the lane id from the drag event
          const laneId = toActualId(draggableId);

          // if nothing changed, early return to save a mutation
          if (source.index === destination.index) {
            return;
          }

          // fire the mutation
          repositionLaneMutation({
            variables: {
              laneId,
              position: destination.index
            }
          }).catch(error => console.error(error));
          break;

        default:
          console.log("Unsupported draggable type", draggableType);
      }
    },
    [repositionCardMutation, repositionLaneMutation]
  );

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
