defmodule HippoWeb.Resolvers.Lane do
  alias Hippo.Lanes

  # def data() do
  #   Dataloader.Ecto.new(Hippo.Repo, query: &query/2)
  # end

  # def query(queryable, _params) do
  #   queryable
  # end

  def create(%{lane: params, project_id: project_id}, _) do
    case Lanes.create_lane(params, for_project: project_id) do
      {:ok, _} = result -> result
      {:error, changeset} -> {:error, "Something blew up"}
    end
  end
end
