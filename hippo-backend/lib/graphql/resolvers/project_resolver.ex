defmodule Hippo.GraphQL.Resolvers.Project do
  alias Hippo.Projects
  import Ecto.Query

  def data() do
    Dataloader.Ecto.new(Hippo.Repo, query: &query/2)
  end

  def query(queryable, _params)
      when queryable in [Hippo.Lanes.Lane, Hippo.Cards.Card] do
    from(queryable, order_by: [:rank])
  end

  # fallback queryable; no ordering here
  def query(queryable, _params), do: queryable

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
      {:ok, project} -> {:ok, project: project}
      error -> error
    end
  end

  def update(%{project_id: project_id, project: params}, _) do
    case Projects.get_project(project_id) do
      nil ->
        {:error, "project not found"}

      project ->
        {:ok, project} = project |> Projects.update_project(params)
        {:ok, project: project}
    end
  end

  def delete(%{project_id: project_id}, _ctx) do
    Projects.delete_with_contents(project_id)
  end
end
