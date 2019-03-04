defmodule Hippo.Grapql.LanesMutationsTest do
  use HippoWeb.GraphqlCase
  import Hippo.Test.Factory

  alias Hippo.Repo
  alias Hippo.Lanes.Lane

  setup %{conn: conn} do
    project = insert(:project)
    lane = insert(:lane, project: project)

    {:ok,
     %{
       conn: conn,
       project: project,
       lane: lane
     }}
  end

  describe "create_lane_mutation" do
    @query """
      mutation CreateLane($projectId: UUID!, $lane: LaneCreateParams!) {
        createLane(projectId: $projectId, lane: $lane) {
          id
          title
          description
        }
      }
    """

    test "creates a lane if params are OK", %{conn: conn, project: project} do
      lane_params = params_for(:lane)

      variables = %{
        "projectId" => project.id,
        "lane" => lane_params
      }

      conn = conn |> gql(skeleton(@query, variables))

      response =
        json_response(conn, 200)
        |> Map.get("data")
        |> Map.get("createLane")

      lane = Repo.get!(Lane, response["id"])
      assert lane |> Map.take(~w(title description)a) == lane_params
    end

    test "responds with error if title is missing", %{conn: conn, project: project} do
      lane_params = %{"description" => "title is required too"}

      variables = %{
        "projectId" => project.id,
        "lane" => lane_params
      }

      conn = conn |> gql(skeleton(@query, variables))

      error =
        json_response(conn, 200)
        |> Map.get("errors")
        |> Enum.at(0)

      assert error["message"] =~ ~r/"lane" has invalid value/
    end

    test "responds with error if project is not found", %{conn: conn} do
      variables = %{
        "projectId" => Ecto.UUID.generate(),
        "lane" => params_for(:lane)
      }

      conn = conn |> gql(skeleton(@query, variables))

      error =
        json_response(conn, 200)
        |> Map.get("errors")
        |> Enum.at(0)

      assert error["message"] =~ "project not found"
    end
  end

  describe "update_lane_mutation" do
    @query """
      mutation UpdateLane($laneId: UUID!, $lane: LaneUpdateParams!){
        updateLane(laneId: $laneId, lane: $lane) {
          id
          title
          description
        }
      }
    """

    test "updates the lane", %{conn: conn, lane: lane} do
      lane_params = params_for(:lane)

      variables = %{
        "laneId" => lane.id,
        "lane" => lane_params
      }

      conn = conn |> gql(skeleton(@query, variables))

      response =
        json_response(conn, 200)
        |> Map.get("data")
        |> Map.get("updateLane")

      expected =
        Lane
        |> Repo.get(response["id"])
        |> Map.take(~w(title description)a)

      assert expected == lane_params
    end

    test "updates when only one params is present", %{conn: conn, lane: lane} do
      lane_params = %{"description" => "a description"}

      variables = %{
        "laneId" => lane.id,
        "lane" => lane_params
      }

      conn = conn |> gql(skeleton(@query, variables))

      response =
        json_response(conn, 200)
        |> Map.get("data")
        |> Map.get("updateLane")

      lane = Repo.get(Lane, response["id"])
      assert lane.description == lane_params["description"]
    end

    test "errors when lane_id is invalid", %{conn: conn} do
      variables = %{
        "laneId" => Ecto.UUID.generate(),
        "lane" => params_for(:lane)
      }

      conn = conn |> gql(skeleton(@query, variables))

      error =
        json_response(conn, 200)
        |> Map.get("errors")
        |> Enum.at(0)

      assert error["message"] =~ "lane not found"
    end
  end

  describe "delete_lane_mutation" do
    @query """
      mutation DeleteLane($laneId: UUID!) {
        deleteLane(laneId: $laneId) {
          success
          message
        }
      }
    """

    test "deletes the lane", %{conn: conn, lane: lane} do
      variables = %{"laneId" => lane.id}
      conn = conn |> gql(skeleton(@query, variables))

      response =
        json_response(conn, 200)
        |> Map.get("data")
        |> Map.get("deleteLane")

      assert response["success"] == true
      assert Repo.get(Lane, lane.id) == nil
    end

    test "errors when lane_id is invalid", %{conn: conn} do
      variables = %{"laneId" => Ecto.UUID.generate()}
      conn = conn |> gql(skeleton(@query, variables))

      error =
        json_response(conn, 200)
        |> Map.get("errors")
        |> Enum.at(0)

      assert error["message"] =~ "lane not found"
    end
  end
end
