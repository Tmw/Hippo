import gql from "graphql-tag";
export default gql`
  mutation UpdateCard($cardId: identifier!, $card: CardUpdateParams!) {
    updateCard(cardId: $cardId, card: $card) {
      successful
      errors {
        message
      }
      card {
        id
        title
        description
      }
    }
  }
`;
