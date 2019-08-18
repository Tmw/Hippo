defmodule Hippo.GraphQL.Resolvers.Lane do
  alias Hippo.Lanes
  alias Hippo.Lanes.Lane
  alias Hippo.GraphQL.Events

  def create(%{lane: params, project_id: project_id}, _) do
    with {:ok, lane} <- Lanes.create_lane(params, for_project: project_id),
         :ok <- publish(project_id, %Events.Lane.Created{lane: lane}) do
      {:ok, lane: lane}
    end
  end

  def update(%{lane_id: lane_id, lane: params}, _) do
    with {:lane, %Lane{} = lane} <- {:lane, Lanes.get_lane(lane_id)},
         {:ok, lane} <- Lanes.update_lane(lane, params),
         project_id <- Lanes.owning_project_id(lane),
         :ok <- publish(project_id, %Events.Lane.Updated{lane: lane}) do
      {:ok, lane: lane}
    else
      {:error, _} = error -> error
      {:lane, nil} -> {:error, "lane not found"}
    end
  end

  def delete(%{lane_id: lane_id}, _ctx) do
    with project_id <- Lanes.owning_project_id(lane_id),
         {:ok, _} <- Lanes.delete_with_contents(lane_id),
         :ok <- publish(project_id, %Events.Lane.Deleted{lane_id: lane_id}) do
      {:ok, message: "lane and its card deleted"}
    end
  end

  def reposition(%{lane_id: lane_id, position: position}, _ctx) do
    with {:lane, %Lane{} = lane} <- {:lane, Lanes.get_lane(lane_id)},
         {:ok, lane} <- Lanes.update_lane(lane, %{position: position}),
         project_id <- Lanes.owning_project_id(lane_id),
         :ok <-
           publish(project_id, %Events.Lane.Repositioned{
             lane_id: lane_id,
             position: position
           }) do
      {:ok, lane: lane}
    else
      {:error, _} = err -> err
      {:lane, nil} -> {:error, "lane not found"}
    end
  end

  defp publish(project_id, event) when is_binary(project_id) do
    Events.publish(:project_updates, "projects:#{project_id}", event)
  end
end
