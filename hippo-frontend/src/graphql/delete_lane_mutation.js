import { gql } from "apollo-boost";
export default gql`
  mutation DeleteLane($laneId: identifier!) {
    deleteLane(laneId: $laneId) {
      successful
      errors {
        message
      }
    }
  }
`;
