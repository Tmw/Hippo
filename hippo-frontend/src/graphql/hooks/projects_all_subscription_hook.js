import { useSubscription } from "@apollo/react-hooks";
import PROJECTS_ALL_SUBSCRIPTION from "graphql/projects_all_subscription";
import ProjectCache from "graphql/helpers/project_cache";

const handleEvent = (client, event) => {
  switch (event.__typename) {
    case "ProjectUpdatedEvent":
      // No explicit action required, Apollo will update the project
      // since it has matching IDs in the payload.
      break;

    case "ProjectDeletedEvent":
      ProjectCache.deleteProject(client, event.projectId);
      break;

    case "ProjectCreatedEvent":
      ProjectCache.createProject(client, event.project);
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
