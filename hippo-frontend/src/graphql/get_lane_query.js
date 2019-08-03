import gql from "graphql-tag";
export default gql`
  query Lane {
    lane(id: $id) {
      id
      title
      description
    }
  }
`;
