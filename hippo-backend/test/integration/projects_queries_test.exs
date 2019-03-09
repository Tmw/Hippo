defmodule Hippo.Grapql.ProjectQueriesTest do
  use HippoWeb.GraphqlCase
  alias Hippo.Lanes.Lane
  alias Hippo.Repo
  import Hippo.Test.Factory
  import Ecto.Query

  setup %{conn: conn} do
    projects = insert_list(2, :project_with_lanes_and_cards)
    {:ok, conn: conn, projects: projects}
  end

  describe "ProjectQuery" do
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
        |> Enum.at(0)

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
          id
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
    test "query specified project", %{conn: conn, projects: [project | _]} do
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

    test "lanes are sorted by rank", %{conn: conn, projects: [project | _]} do
      conn = conn |> gql(skeleton(@query, %{"id" => project.id}))

      lanes =
        json_response(conn, 200)
        |> Map.get("data")
        |> Map.get("projects")
        |> Enum.at(0)
        |> Map.get("lanes")

      actual = lanes |> Enum.map(&Map.get(&1, "id"))

      expected =
        from(l in Lane,
          where: l.project_id == ^project.id,
          select: [:id],
          order_by: [:rank]
        )
        |> Repo.all()
        |> Enum.map(&Map.get(&1, :id))

      assert expected == actual
    end
  end
end
