import gql from "graphql-tag";
export default gql`
  query Projects {
    projects {
      id
      title
      description
    }
  }
`;
