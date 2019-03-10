defmodule Hippo.GraphQL.Resolvers.Lane do
  alias Hippo.Lanes

  def create(%{lane: params, project_id: project_id}, _) do
    case Lanes.create_lane(params, for_project: project_id) do
      {:ok, _} = result -> result
      {:error, error} -> {:error, error}
    end
  end

  def update(%{lane_id: lane_id, lane: params}, _) do
    case Lanes.get_lane(lane_id) do
      nil -> {:error, "lane not found"}
      lane -> lane |> Lanes.update_lane(params)
    end
  end

  def delete(%{lane_id: lane_id}, _ctx) do
    case Lanes.delete_with_contents(lane_id) do
      {:ok, _} -> {:ok, %{success: true, message: "lane and its card deleted"}}
      {:error, error} -> {:error, message: error}
    end
  end

  def reposition(%{lane_id: lane_id, position: position}, _ctx) do
    case Lanes.get_lane(lane_id) do
      nil ->
        {:error, "lane not found"}

      lane ->
        case Lanes.update_lane(lane, %{position: position}) do
          {:ok, _} -> {:ok, lane}
          {:error, _} = err -> err
        end
    end
  end
end
