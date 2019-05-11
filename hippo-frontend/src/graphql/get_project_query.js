import { gql } from "apollo-boost";
export default gql`
  query Projects($id: identifier!) {
    projects(id: $id) {
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
