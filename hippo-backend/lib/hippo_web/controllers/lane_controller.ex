defmodule HippoWeb.LaneController do
  use HippoWeb, :controller

  alias Hippo.Lanes
  alias Hippo.Lanes.Lane

  action_fallback HippoWeb.FallbackController

  def index(conn, _params) do
    lanes = Lanes.list_lanes()
    render(conn, "index.json", lanes: lanes)
  end

  def create(conn, %{"lane" => lane_params, "project_id" => project_id}) do
    with {:ok, %Lane{} = lane} <- Lanes.create_lane(lane_params, for_project: project_id) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.lane_path(conn, :show, lane))
      |> render("create.json", lane: lane)
    end
  end

  def show(conn, %{"id" => id}) do
    lane = Lanes.get_lane!(id, :with_details)
    render(conn, "show.json", lane: lane)
  end

  def update(conn, %{"id" => id, "lane" => lane_params}) do
    lane = Lanes.get_lane!(id)

    with {:ok, %Lane{} = lane} <- Lanes.update_lane(lane, lane_params) do
      render(conn, "show.json", lane: lane)
    end
  end

  def delete(conn, %{"id" => id}) do
    lane = Lanes.get_lane!(id)

    with {:ok, %Lane{}} <- Lanes.delete_lane(lane) do
      send_resp(conn, :no_content, "")
    end
  end
end
