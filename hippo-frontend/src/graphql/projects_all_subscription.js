import gql from "graphql-tag";
export default gql`
  subscription {
    projectsUpdates {
      triggeredBySelf
      payload {
        __typename

        ... on ProjectUpdatedEvent {
          project {
            id
            title
            description
          }
        }

        ... on ProjectDeletedEvent {
          projectId
        }

        ... on ProjectCreatedEvent {
          project {
            id
            title
            description
          }
        }
      }
    }
  }
`;
