import gql from "graphql-tag";
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
