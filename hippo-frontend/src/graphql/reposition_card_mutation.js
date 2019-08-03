import gql from "graphql-tag";
export default gql`
  mutation RepositionCard(
    $cardId: identifier!
    $laneId: identifier!
    $position: Int!
  ) {
    repositionCard(cardId: $cardId, laneId: $laneId, position: $position) {
      successful
    }
  }
`;
