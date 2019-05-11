import { gql } from "apollo-boost";
export default gql`
  {
    projects {
      id
      title
      description
    }
  }
`;
