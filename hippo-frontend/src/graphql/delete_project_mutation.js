import { gql } from "apollo-boost";
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
