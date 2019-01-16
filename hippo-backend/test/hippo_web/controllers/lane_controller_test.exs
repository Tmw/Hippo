defmodule HippoWeb.LaneControllerTest do
  use HippoWeb.ConnCase

  alias Hippo.Projects
  alias Hippo.Projects.Lane

  @create_attrs %{
    name: "some name"
  }
  @update_attrs %{
    name: "some updated name"
  }
  @invalid_attrs %{name: nil}

  def fixture(:lane) do
    {:ok, lane} = Projects.create_lane(@create_attrs)
    lane
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all lanes", %{conn: conn} do
      conn = get(conn, Routes.lane_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create lane" do
    test "renders lane when data is valid", %{conn: conn} do
      conn = post(conn, Routes.lane_path(conn, :create), lane: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.lane_path(conn, :show, id))

      assert %{
               "id" => id,
               "name" => "some name"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.lane_path(conn, :create), lane: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update lane" do
    setup [:create_lane]

    test "renders lane when data is valid", %{conn: conn, lane: %Lane{id: id} = lane} do
      conn = put(conn, Routes.lane_path(conn, :update, lane), lane: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.lane_path(conn, :show, id))

      assert %{
               "id" => id,
               "name" => "some updated name"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, lane: lane} do
      conn = put(conn, Routes.lane_path(conn, :update, lane), lane: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete lane" do
    setup [:create_lane]

    test "deletes chosen lane", %{conn: conn, lane: lane} do
      conn = delete(conn, Routes.lane_path(conn, :delete, lane))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.lane_path(conn, :show, lane))
      end
    end
  end

  defp create_lane(_) do
    lane = fixture(:lane)
    {:ok, lane: lane}
  end
end
