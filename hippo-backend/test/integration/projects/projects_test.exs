defmodule Hippo.Grapql.ProjectMutationsTest do
  use HippoWeb.ConnCase
  import Hippo.Test.Factory

  setup %{conn: conn} do
    projects = insert_list(2, :project_with_lanes_and_cards)
    {:ok, conn: conn, projects: projects}
  end

  describe "ProjectQuery" do
    defp skeleton(query, variables \\ %{}) do
      %{
        "operationName" => nil,
        "query" => query,
        "variables" => variables
      }
    end

    defp gql(conn, query) do
      conn
      |> put_req_header("content-type", "application/json")
      |> post("/graphql", query)
    end

    @query """
      query Projects {
        projects {
          id
          title
          description
          lanes {
            title
            description
            cards {
              title
              description
            }
          }
        }
      }
    """

    test "query all projects", %{conn: conn, projects: [project | _]} do
      conn = conn |> gql(skeleton(@query))

      project_response =
        json_response(conn, 200)
        |> Map.get("data")
        |> Map.get("projects")
        |> hd()

      assert project_response["id"] == project.id
      assert project_response["title"] == project.title
      assert project_response["description"] == project.description
      refute is_nil(project_response["lanes"])
    end

    @query """
    query Project($id: ID) {
      projects (id: $id) {
        id
        title
        description
        lanes {
          title
          description
          cards {
            title
            description
          }
        }
      }
    }
    """
    test "query specified project", %{conn: conn, projects: projects} do
      project = projects |> Enum.at(1)

      conn = conn |> gql(skeleton(@query, %{"id" => project.id}))

      project_response =
        json_response(conn, 200)
        |> Map.get("data")
        |> Map.get("projects")
        |> hd()

      assert project_response["id"] == project.id
      assert project_response["title"] == project.title
      assert project_response["description"] == project.description
      refute is_nil(project_response["lanes"])
    end
  end
end
