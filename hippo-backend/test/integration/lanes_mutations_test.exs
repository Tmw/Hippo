defmodule Hippo.Grapql.LanesMutationsTest do
  use HippoWeb.GraphqlCase
  import Hippo.Test.Factory

  alias Hippo.Lanes.Lane
  alias Hippo.Repo
  import Ecto.Query

  setup %{conn: conn} do
    project = insert(:project)
    lane = insert(:lane, project: project)

    lanes = insert_list(3, :lane, project: project)

    {:ok,
     %{
       conn: conn,
       project: project,
       lane: lane,
       lanes: lanes
     }}
  end

  describe "create_lane_mutation" do
    @query """
      mutation CreateLane($projectId: identifier!, $lane: LaneCreateParams!) {
        createLane(projectId: $projectId, lane: $lane) {
          successful
          errors {
            message
          }
          lane {
            id
            title
            description
          }
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
        |> get_in(["data", "createLane", "lane"])

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
        |> get_in(["errors"])
        |> hd()

      assert error["message"] =~ ~r/"lane" has invalid value/
    end

    test "responds with error if project is not found", %{conn: conn} do
      variables = %{
        "projectId" => Ecto.ULID.generate(),
        "lane" => params_for(:lane)
      }

      conn = conn |> gql(skeleton(@query, variables))

      error =
        json_response(conn, 200)
        |> get_in(["data", "createLane", "errors"])
        |> hd()

      assert error["message"] =~ "project not found"
    end
  end

  describe "update_lane_mutation" do
    @query """
      mutation UpdateLane($laneId: identifier!, $lane: LaneUpdateParams!){
        updateLane(laneId: $laneId, lane: $lane) {
          successful
          errors {
            message
          }
          lane {
            id
            title
            description
          }
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
        |> get_in(["data", "updateLane", "lane"])

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
        |> get_in(["data", "updateLane", "lane"])

      lane = Repo.get(Lane, response["id"])
      assert lane.description == lane_params["description"]
    end

    test "errors when lane_id is invalid", %{conn: conn} do
      variables = %{
        "laneId" => Ecto.ULID.generate(),
        "lane" => params_for(:lane)
      }

      conn = conn |> gql(skeleton(@query, variables))

      error =
        json_response(conn, 200)
        |> get_in(["data", "updateLane", "errors"])
        |> hd()

      assert error["message"] =~ "lane not found"
    end
  end

  describe "delete_lane_mutation" do
    @query """
      mutation DeleteLane($laneId: identifier!) {
        deleteLane(laneId: $laneId) {
          successful
          errors {
            message
          }
        }
      }
    """

    test "deletes the lane", %{conn: conn, lane: lane} do
      variables = %{"laneId" => lane.id}
      conn = conn |> gql(skeleton(@query, variables))

      response =
        json_response(conn, 200)
        |> get_in(["data", "deleteLane"])

      assert response["successful"] == true
      assert Repo.get(Lane, lane.id) == nil
    end

    test "errors when lane_id is invalid", %{conn: conn} do
      variables = %{"laneId" => Ecto.ULID.generate()}
      conn = conn |> gql(skeleton(@query, variables))

      error =
        json_response(conn, 200)
        |> get_in(["data", "deleteLane", "errors"])
        |> hd()

      assert error["message"] =~ "lane not found"
    end
  end

  describe "reposition_lane_mutation" do
    @query """
      mutation RepositionLane($laneId: identifier!, $position: Int!) {
        repositionLane(laneId: $laneId, position: $position) {
          successful
          errors {
            message
          }
          lane {
            id
          }
        }
      }
    """

    test "repositions the lane", %{conn: conn, lanes: lanes} do
      [first, second, third] = lanes

      variables = %{laneId: second.id, position: 3}
      conn = conn |> gql(skeleton(@query, variables))

      # assert lane is included in response
      response =
        json_response(conn, 200)
        |> get_in(["data", "repositionLane"])

      refute is_nil(response["lane"])

      # grab all lane IDs
      ids = lanes |> Enum.map(&Map.get(&1, :id))

      expected =
        [first, third, second]
        |> Enum.map(&Map.get(&1, :id))

      actual =
        from(l in Lane,
          where: l.id in ^ids,
          order_by: [:rank],
          select: [:id]
        )
        |> Repo.all()
        |> Enum.map(&Map.get(&1, :id))

      assert actual == expected
    end

    test "errors when lane is not found", %{conn: conn} do
      variables = %{laneId: Ecto.ULID.generate(), position: 3}
      conn = conn |> gql(skeleton(@query, variables))

      errors =
        json_response(conn, 200)
        |> get_in(["data", "repositionLane", "errors"])
        |> hd()

      assert errors["message"] =~ "lane not found"
    end
  end
end
