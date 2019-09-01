import { useSubscription } from "@apollo/react-hooks";
import PROJECTS_ALL_SUBSCRIPTION from "graphql/projects_all_subscription";
import ProjectCache from "graphql/helpers/project_cache";

const handleEvent = (client, event) => {
  // If the event was triggered by ourselves, drop the event since we do not want to replay the
  // same event twice.
  if (event.triggeredBySelf) return;

  const payload = event.payload;
  switch (payload.__typename) {
    case "ProjectUpdatedEvent":
      // No explicit action required, Apollo will update the project
      // since it has matching IDs in the payload.
      break;

    case "ProjectDeletedEvent":
      ProjectCache.deleteProject(client, payload.projectId);
      break;

    case "ProjectCreatedEvent":
      ProjectCache.createProject(client, payload.project);
      break;

    default:
      console.warn("unhandled event type");
      break;
  }
};

const useProjectsAllRealtimeEvents = () => {
  useSubscription(PROJECTS_ALL_SUBSCRIPTION, {
    onSubscriptionData: ({ client, subscriptionData }) => {
      const {
        data: { projectsUpdates }
      } = subscriptionData;

      handleEvent(client, projectsUpdates);
    }
  });
};

export default useProjectsAllRealtimeEvents;
