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
      {:error, _changeset} -> {:error, "Something blew up"}
    end
  end

  def update(%{lane_id: lane_id, lane: params}, _) do
    Lanes.get_lane!(lane_id) |> Lanes.update_lane(params)
  end

  def delete(%{lane_id: lane_id}, _ctx) do
    case Lanes.delete_with_contents(lane_id) do
      {:ok, _} -> {:ok, %{success: true, message: "lane and its card deleted"}}
      {:error, _} -> {:ok, %{success: false, message: "lane and its cards not deleted"}}
    end
  end
end
