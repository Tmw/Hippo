import { gql } from "apollo-boost";
export default gql`
  query Projects {
    projects {
      id
      title
      description
    }
  }
`;
