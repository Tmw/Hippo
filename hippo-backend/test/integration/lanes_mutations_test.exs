defmodule Hippo.Grapql.LanesMutationsTest do
  use HippoWeb.GraphqlCase
  import Hippo.Test.Factory

  alias Hippo.Repo
  alias Hippo.Lanes.Lane

  setup %{conn: conn} do
    project = insert(:project)
    lanes = insert_list(2, :lane, project: project)

    {:ok,
     %{
       conn: conn,
       project: project,
       lanes: lanes
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
end
