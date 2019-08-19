import { useSubscription } from "react-apollo-hooks";
import PROJECT_SUBSCRIPTION from "graphql/project_subscription";
// import ProjectsCache from "graphql/helpers/projects_cache";

const handleEvent = (client, event) => {
  switch (event.__typename) {
    case "ProjectUpdatedEvent":
      // No explicit action required, Apollo will update the project
      // since it has matching IDs in the payload.
      break;

    case "ProjectDeletedEvent":
      // ProjectsCache.deleteProject(client, event.projectId);
      break;

    case "ProjectCreatedEvent":
      // ProjectsCache.createProject(client, event.project);
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
        data: { projectUpdates }
      } = subscriptionData;

      handleEvent(client, projectUpdates);
    }
  });
};

export default useProjectRealtimeEvents;
