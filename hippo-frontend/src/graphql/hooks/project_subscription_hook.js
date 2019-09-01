import { useSubscription } from "@apollo/react-hooks";
import PROJECT_SUBSCRIPTION from "graphql/project_subscription";
import LaneCache from "graphql/helpers/lane_cache";
import CardCache from "graphql/helpers/card_cache";

const handleEvent = (client, projectId, event) => {
  // If the event was triggered by ourselves, drop the event since we do not want to replay the
  // same event twice.
  if (event.triggeredBySelf) return;

  const payload = event.payload;
  switch (payload.__typename) {
    case "LaneCreatedEvent":
      LaneCache.createLane(client, projectId, payload.lane);
      break;

    case "LaneDeletedEvent":
      LaneCache.deleteLane(client, projectId, payload.laneId);
      break;

    case "LaneRepositionedEvent":
      LaneCache.repositionLane(
        client,
        projectId,
        payload.laneId,
        payload.position
      );
      break;

    case "CardCreatedEvent":
      CardCache.createCard(client, payload.laneId, payload.card);
      break;

    case "CardDeletedEvent":
      CardCache.deleteCard(client, payload.laneId, payload.cardId);
      break;

    case "CardRepositionedEvent":
      CardCache.repositionCard(
        client,
        payload.cardId,
        payload.sourceLaneId,
        payload.targetLaneId,
        payload.position
      );
      break;

    case "LaneUpdatedEvent":
    case "CardUpdatedEvent":
      // We don't have to explicitly handle these cases since Apollo already updates the entity
      // when it sees a matching identifier.
      break;

    default:
      console.warn("unhandled event type");
      console.log(event);
      break;
  }
};

const useProjectRealtimeEvents = projectId => {
  useSubscription(PROJECT_SUBSCRIPTION, {
    variables: {
      projectId
    },
    onSubscriptionData: ({ client, subscriptionData }) => {
      const {
        data: { projectUpdates: event }
      } = subscriptionData;

      handleEvent(client, projectId, event);
    }
  });
};

export default useProjectRealtimeEvents;
