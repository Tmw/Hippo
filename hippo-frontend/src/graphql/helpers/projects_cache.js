import GET_PROJECTS_QUERY from "graphql/get_projects_query";

const deleteProject = (client, projectId) => {
  try {
    const { projects } = client.readQuery({ query: GET_PROJECTS_QUERY });
    const updatedProjects = projects.filter(proj => proj.id !== projectId);

    client.writeQuery({
      query: GET_PROJECTS_QUERY,
      data: { projects: updatedProjects }
    });
  } catch {
    // swallow the error here since it basically means we havent fetched _all_
    // projects yet. The latest state will be reflected once the user asks for it.
  }
};

const createProject = (client, payload) => {
  try {
    const { projects } = client.readQuery({ query: GET_PROJECTS_QUERY });
    const updatedProjects = [...projects, payload];
    client.writeQuery({
      query: GET_PROJECTS_QUERY,
      data: { projects: updatedProjects }
    });
  } catch {
    // swallow the error here since it basically means we havent fetched _all_
    // projects yet. The latest state will be reflected once the user asks for it.
  }
};

export default {
  deleteProject,
  createProject
};
