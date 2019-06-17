import { gql } from "apollo-boost";
export default gql`
  mutation UpdateLane($laneId: identifier!, $lane: LaneUpdateParams!) {
    updateLane(laneId: $laneId, lane: $lane) {
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
