import gql from "graphql-tag";
export default gql`
  mutation DeleteProject($projectId: identifier!) {
    deleteProject(projectId: $projectId) {
      successful
      errors {
        message
      }
    }
  }
`;
