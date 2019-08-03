import gql from "graphql-tag";
export default gql`
  query Card {
    card(id: $id) {
      id
      title
      description
    }
  }
`;
