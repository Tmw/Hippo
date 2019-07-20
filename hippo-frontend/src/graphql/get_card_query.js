import { gql } from "apollo-boost";
export default gql`
  query Card {
    card(id: $id) {
      id
      title
      description
    }
  }
`;
