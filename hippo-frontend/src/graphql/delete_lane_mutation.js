import gql from "graphql-tag";
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
