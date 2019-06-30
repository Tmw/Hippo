import { gql } from "apollo-boost";
export default gql`
  query Lane {
    lane(id: $id) {
      id
      title
      description
    }
  }
`;
