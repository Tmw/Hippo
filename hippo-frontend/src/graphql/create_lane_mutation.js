import { gql } from "apollo-boost";
export default gql`
  mutation CreateLane($projectId: identifier!, $lane: LaneCreateParams!) {
    createLane(projectId: $projectId, lane: $lane) {
      successful
      errors {
        message
      }
      lane {
        id
        title
        description
      }
    }
  }
`;
