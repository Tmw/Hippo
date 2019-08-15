defmodule Hippo.GraphQL.Resolvers.Project do
  alias Hippo.Projects
  alias Hippo.GraphQL.Events

  @doc "Resolve by returning a single project by ID"
  def find(%{id: id}, _) do
    case Projects.get_project(id) do
      nil -> {:error, "Project not found"}
      project -> {:ok, project}
    end
  end

  @doc "Resolve by returning all projects"
  def all(_, _) do
    {:ok, Projects.list_projects()}
  end

  def create(%{project: params}, _) do
    with {:ok, project} <- Projects.create_project(params),
         :ok <- publish(%Events.Project.Created{payload: project}) do
      {:ok, project: project}
    else
      error -> error
    end
  end

  def update(%{project_id: project_id, project: params}, _) do
    with {:project, %Projects.Project{} = project} <-
           {:project, Projects.get_project(project_id)},
         {:updated, {:ok, %Projects.Project{} = project}} <-
           {:updated, Projects.update_project(project, params)},
         :ok <- publish(%Events.Project.Updated{payload: project}) do
      {:ok, project: project}
    else
      {:project, nil} -> {:error, "project not found"}
      {:updated, {:error, error} = error} -> error
    end
  end

  def delete(%{project_id: project_id}, _ctx) do
    with {:ok, response} <- Projects.delete_with_contents(project_id),
         :ok <- publish(%Events.Project.Deleted{project_id: project_id}) do
      {:ok, response}
    else
      {:error, error} -> {:error, error}
    end
  end

  defp publish(event) do
    Events.publish(:projects_updates, "projects:all", event)
  end
end
