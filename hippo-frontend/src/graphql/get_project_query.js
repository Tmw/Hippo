import gql from "graphql-tag";
export default gql`
  query Project($id: identifier!) {
    project(id: $id) {
      id
      title
      description
      lanes {
        id
        title
        description
        cards {
          id
          title
          description
        }
      }
    }
  }
`;
