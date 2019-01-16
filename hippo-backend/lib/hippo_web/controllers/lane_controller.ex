defmodule HippoWeb.LaneController do
  use HippoWeb, :controller

  alias Hippo.Projects
  alias Hippo.Projects.Lane

  action_fallback HippoWeb.FallbackController

  def index(conn, _params) do
    lanes = Projects.list_lanes()
    render(conn, "index.json", lanes: lanes)
  end

  def create(conn, %{"lane" => lane_params}) do
    with {:ok, %Lane{} = lane} <- Projects.create_lane(lane_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.lane_path(conn, :show, lane))
      |> render("show.json", lane: lane)
    end
  end

  def show(conn, %{"id" => id}) do
    lane = Projects.get_lane!(id)
    render(conn, "show.json", lane: lane)
  end

  def update(conn, %{"id" => id, "lane" => lane_params}) do
    lane = Projects.get_lane!(id)

    with {:ok, %Lane{} = lane} <- Projects.update_lane(lane, lane_params) do
      render(conn, "show.json", lane: lane)
    end
  end

  def delete(conn, %{"id" => id}) do
    lane = Projects.get_lane!(id)

    with {:ok, %Lane{}} <- Projects.delete_lane(lane) do
      send_resp(conn, :no_content, "")
    end
  end
end
