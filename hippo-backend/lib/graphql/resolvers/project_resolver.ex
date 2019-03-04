defmodule Hippo.GraphQL.Resolvers.Project do
  alias Hippo.Projects

  def data() do
    Dataloader.Ecto.new(Hippo.Repo, query: &query/2)
  end

  def query(queryable, _params) do
    queryable
  end

  @doc "Resolve by returning a single project by ID"
  def find(%{id: id}, _) do
    {:ok, Projects.get_project!(id)}
  end

  @doc "Resolve by returning all projects"
  def find(_, _) do
    {:ok, Projects.list_projects()}
  end

  def create(%{project: params}, _) do
    case Projects.create_project(params) do
      {:ok, _} = result -> result
      {:error, _changeset} -> {:error, "Something blew up"}
    end
  end

  def update(%{project_id: project_id, project: params}, _) do
    case Projects.get_project(project_id) do
      nil -> {:error, "project not found"}
      project -> project |> Projects.update_project(params)
    end
  end

  def delete(%{project_id: project_id}, _ctx) do
    case Projects.delete_with_contents(project_id) do
      {:ok, _} -> {:ok, %{success: true, message: "Project and its contents deleted"}}
      {:error, err} -> {:error, err}
    end
  end
end
