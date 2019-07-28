defmodule Hippo.GraphQL.Resolvers.Lane do
  import Ecto.Query
  alias Hippo.Lanes
  alias Hippo.Lanes.Lane

  def data() do
    Dataloader.Ecto.new(Hippo.Repo, query: &query/2)
  end

  def query(queryable, _params) do
    from(queryable, order_by: [:rank, :id])
  end

  def create(%{lane: params, project_id: project_id}, _) do
    case Lanes.create_lane(params, for_project: project_id) do
      {:ok, lane} -> {:ok, lane: lane}
      {:error, error} -> {:error, error}
    end
  end

  def update(%{lane_id: lane_id, lane: params}, _) do
    with {:lane, %Lane{} = lane} <- {:lane, Lanes.get_lane(lane_id)},
         {:ok, lane} <- Lanes.update_lane(lane, params) do
      {:ok, lane: lane}
    else
      {:error, _} = error -> error
      {:lane, nil} -> {:error, "lane not found"}
    end
  end

  def delete(%{lane_id: lane_id}, _ctx) do
    case Lanes.delete_with_contents(lane_id) do
      {:ok, _} -> {:ok, message: "lane and its card deleted"}
      {:error, error} -> {:error, message: error}
    end
  end

  def reposition(%{lane_id: lane_id, position: position}, _ctx) do
    with {:lane, %Lane{} = lane} <- {:lane, Lanes.get_lane(lane_id)},
         {:ok, lane} <- Lanes.update_lane(lane, %{position: position}) do
      {:ok, lane: lane}
    else
      {:error, _} = err -> err
      {:lane, nil} -> {:error, "lane not found"}
    end
  end
end
