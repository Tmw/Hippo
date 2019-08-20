import { useSubscription } from "react-apollo-hooks";
import PROJECT_SUBSCRIPTION from "graphql/project_subscription";
import LaneCache from "graphql/helpers/lane_cache";
import CardCache from "graphql/helpers/card_cache";

const handleEvent = (client, projectId, event) => {
  switch (event.__typename) {
    case "LaneCreatedEvent":
      LaneCache.createLane(client, projectId, event.lane);
      break;

    case "LaneDeletedEvent":
      LaneCache.deleteLane(client, projectId, event.laneId);
      break;

    case "LaneRepositionedEvent":
      LaneCache.repositionLane(client, projectId, event.laneId, event.position);
      break;

    case "CardCreatedEvent":
      CardCache.createCard(client, event.laneId, event.card);
      break;

    case "CardDeletedEvent":
      CardCache.deleteCard(client, event.laneId, event.cardId);
      break;

    case "CardRepositionedEvent":
      CardCache.repositionCard(
        client,
        event.cardId,
        event.sourceLaneId,
        event.targetLaneId,
        event.position
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
