import gql from "graphql-tag";
export default gql`
  subscription ProjectUpdates($projectId: identifier!) {
    projectUpdates(projectId: $projectId) {
      __typename

      ... on LaneCreatedEvent {
        lane {
          id
          title
          description
          cards {
            id
            title
            description
          }
        }
      }

      ... on LaneDeletedEvent {
        laneId
      }

      ... on LaneUpdatedEvent {
        lane {
          id
          title
          description
        }
      }

      ... on LaneRepositionedEvent {
        laneId
        position
      }

      ... on CardCreatedEvent {
        card {
          id
          title
          description
        }
        laneId
      }

      ... on CardUpdatedEvent {
        card {
          id
          title
          description
        }
      }

      ... on CardDeletedEvent {
        cardId
        laneId
      }

      ... on CardRepositionedEvent {
        cardId
        sourceLaneId
        targetLaneId
        position
      }
    }
  }
`;
