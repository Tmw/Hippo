defmodule Hippo.GraphQL.Resolvers.Project do
  alias Hippo.Projects

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
    case Projects.create_project(params) do
      {:ok, project} -> {:ok, project: project}
      error -> error
    end
  end

  def update(%{project_id: project_id, project: params}, _) do
    with {:project, %Projects.Project{} = project} <-
           {:project, Projects.get_project(project_id)},
         {:updated, {:ok, %Projects.Project{} = project}} <-
           {:updated, Projects.update_project(project, params)} do
      {:ok, project: project}
    else
      {:project, nil} -> {:error, "project not found"}
      {:updated, {:error, error} = error} -> error
    end
  end

  def delete(%{project_id: project_id}, _ctx) do
    Projects.delete_with_contents(project_id)
  end
end
