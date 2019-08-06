import React, { useCallback } from "react";
import { withRouter } from "react-router-dom";
import { DragDropContext } from "react-beautiful-dnd";
import { useMutation, useSubscription } from "react-apollo-hooks";
import { move } from "ramda";

import REPOSITION_CARD_MUTATION from "graphql/reposition_card_mutation";
import REPOSITION_LANE_MUTATION from "graphql/reposition_lane_mutation";
import GET_PROJECT_QUERY from "graphql/get_project_query";
import PROJECTS_ALL_SUBSCRIPTION from "graphql/projects_all_subscription";

import ProjectsCache from "graphql/helpers/projects_cache";
import moveCard from "graphql/helpers/moveCard";

import LaneList from "components/LaneList";
import Header from "components/Header";

const toActualId = identifier => identifier.split(":")[1];

const Project = ({ project: { lanes }, project }) => {
  const repositionLaneMutation = useMutation(REPOSITION_LANE_MUTATION);
  const repositionCardMutation = useMutation(REPOSITION_CARD_MUTATION);

  const onDragEnd = useCallback(
    dragInfo => {
      const draggableType = dragInfo.draggableId.split(":")[0];
      const { draggableId, source, destination } = dragInfo;

      switch (draggableType) {
        case "card":
          // unwrap actual IDs from drag event
          const cardId = toActualId(draggableId);
          const sourceLaneId = toActualId(source.droppableId);
          const destinationLaneId = toActualId(destination.droppableId);

          // if source and target are the same, early return to save a mutation
          if (
            sourceLaneId === destinationLaneId &&
            source.index === destination.index
          ) {
            return;
          }

          // fire the mutation
          repositionCardMutation({
            variables: {
              cardId,
              laneId: destinationLaneId,
              position: destination.index
            },
            optimisticResponse: {
              __typename: "Mutation",
              repositionCard: {
                __typename: "RepositionCardPayload",
                successful: true
              }
            },
            update: store => {
              moveCard(
                store,
                sourceLaneId,
                source.index,
                destinationLaneId,
                destination.index,
                cardId
              );
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
            },
            optimisticResponse: {
              __typename: "Mutation",
              repositionLane: {
                __typename: "RepositionLanePayload",
                successful: true
              }
            },
            update: store => {
              // update the order of the lanes
              const updatedProject = {
                ...project,
                lanes: move(source.index, destination.index, project.lanes)
              };

              // write updated project back into the store
              store.writeQuery({
                query: GET_PROJECT_QUERY,
                data: { project: updatedProject }
              });
            }
          }).catch(error => console.error(error));
          break;

        default:
          console.log("Unsupported draggable type", draggableType);
      }
    },
    [project, repositionCardMutation, repositionLaneMutation]
  );

  useSubscription(PROJECTS_ALL_SUBSCRIPTION, {
    onSubscriptionData: ({ client, subscriptionData }) => {
      const {
        data: { projectsUpdates }
      } = subscriptionData;

      switch (projectsUpdates.__typename) {
        case "ProjectUpdatedEvent":
          // No explicit action required, Apollo will update the project
          // since it has matching IDs in the payload.
          break;

        case "ProjectDeletedEvent":
          ProjectsCache.deleteProject(client, projectsUpdates.projectId);
          break;

        case "ProjectCreatedEvent":
          ProjectsCache.createProject(client, projectsUpdates.payload);
          break;

        default:
          console.warn("unhandled event type");
          break;
      }
    }
  });

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
