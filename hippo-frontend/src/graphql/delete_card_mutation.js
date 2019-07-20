import { gql } from "apollo-boost";
export default gql`
  mutation DeleteCard($cardId: identifier!) {
    deleteCard(cardId: $cardId) {
      successful
      errors {
        message
      }
    }
  }
`;
