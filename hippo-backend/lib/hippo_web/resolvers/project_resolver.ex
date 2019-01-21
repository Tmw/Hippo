defmodule HippoWeb.Resolvers.Project do
  alias Hippo.Projects

  def data() do
    Dataloader.Ecto.new(Hippo.Repo, query: &query/2)
  end

  def query(queryable, _params) do
    queryable
  end

  @doc "Resolve by returning a single project by ID"
  def resolve(%{id: id}, _) do
    {:ok, Projects.get_project!(id)}
  end

  @doc "Resolve by returning all projects"
  def resolve(_, _) do
    {:ok, Projects.list_projects()}
  end

  def create(params, _) do
    case Projects.create_project(params) do
      {:ok, project} = result -> result
      {:error, _changeset} -> {:error, "Something blew up"}
    end
  end
end
