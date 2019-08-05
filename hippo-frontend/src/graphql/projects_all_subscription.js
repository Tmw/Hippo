import gql from "graphql-tag";
export default gql`
  subscription {
    projectsUpdates {
      __typename

      ... on ProjectUpdatedEvent {
        payload {
          id
          title
          description
        }
      }

      ... on ProjectDeletedEvent {
        projectId
      }

      ... on ProjectCreatedEvent {
        payload {
          id
          title
          description
        }
      }
    }
  }
`;
