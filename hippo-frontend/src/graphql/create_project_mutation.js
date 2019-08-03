import gql from "graphql-tag";
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
