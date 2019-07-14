import { gql } from "apollo-boost";
export default gql`
  mutation CreateCard($laneId: identifier!, $cardParams: CardCreateParams!) {
    createCard(laneId: $laneId, card: $cardParams) {
      successful
      card {
        id
        title
        description
      }
    }
  }
`;
