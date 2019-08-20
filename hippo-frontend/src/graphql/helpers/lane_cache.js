import { findIndex, move } from "ramda";
import GET_PROJECT_QUERY from "graphql/get_project_query";

const getProjectWithId = (client, projectId) =>
  client.readQuery({
    query: GET_PROJECT_QUERY,
    variables: {
      id: projectId
    }
  });

const persistUpdatedProject = (client, project) =>
  client.writeQuery({
    query: GET_PROJECT_QUERY,
    data: { project }
  });

const createLane = (client, projectId, lane) => {
  const { project } = getProjectWithId(client, projectId);
  const updatedProject = {
    ...project,
    lanes: [...project.lanes, lane]
  };

  persistUpdatedProject(client, updatedProject);
};

const deleteLane = (client, projectId, laneId) => {
  const { project } = getProjectWithId(client, projectId);

  const updatedProject = {
    ...project,
    lanes: project.lanes.filter(lane => lane.id !== laneId)
  };

  persistUpdatedProject(client, updatedProject);
};

const repositionLane = (client, projectId, laneId, position) => {
  const { project } = getProjectWithId(client, projectId);

  const sourceIndex = findIndex(lane => lane.id === laneId, project.lanes);

  const updatedProject = {
    ...project,
    lanes: move(sourceIndex, position, project.lanes)
  };

  persistUpdatedProject(client, updatedProject);
};

export default {
  createLane,
  deleteLane,
  repositionLane
};
