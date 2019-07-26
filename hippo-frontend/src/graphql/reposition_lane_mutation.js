import { gql } from "apollo-boost";
export default gql`
  mutation RepositionLane($laneId: identifier!, $position: Int!) {
    repositionLane(laneId: $laneId, position: $position) {
      successful
    }
  }
`;
