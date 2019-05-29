import { gql } from "apollo-boost";
export default gql`
  mutation CreateProject($project: ProjectCreateParams!) {
    createProject(project: $project) {
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
