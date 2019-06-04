import { gql } from "apollo-boost";
export default gql`
  mutation UpdateProject(
    $projectId: identifier!
    $params: ProjectUpdateParams!
  ) {
    updateProject(projectId: $projectId, project: $params) {
      successful
      errors {
        message
      }
      project {
        id
        title
        description
      }
    }
  }
`;
