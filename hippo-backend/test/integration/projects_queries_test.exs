defmodule Hippo.Grapql.ProjectQueriesTest do
  use HippoWeb.GraphqlCase
  alias Hippo.Lanes.Lane
  alias Hippo.Cards.Card
  alias Hippo.Repo
  import Hippo.Test.Factory
  import Ecto.Query

  setup %{conn: conn} do
    # list of 2 projects (no lanes or cards)
    insert_list(2, :project)

    # single project with three lanes, each three cards sorted by rank
    lanes =
      insert_list(3, :lane)
      |> Enum.map(fn lane ->
        Map.put(lane, :cards, [
          insert(:card, lane: lane, rank: 0),
          insert(:card, lane: lane, rank: 1),
          insert(:card, lane: lane, rank: 2)
        ])
      end)

    project = insert(:project, lanes: lanes)
    projects = Hippo.Projects.list_projects()

    {:ok, conn: conn, projects: projects, project: project}
  end

  describe "ProjectQuery - All Projects" do
    @query """
      query Projects {
        projects {
          id
          title
          description
        }
      }
    """

    test "query all projects", %{conn: conn, projects: projects} do
      conn = conn |> gql(skeleton(@query))

      response =
        json_response(conn, 200)
        |> Map.get("data")
        |> Map.get("projects")

      response
      |> Enum.zip(projects)
      |> Enum.each(fn {expected, actual} ->
        assert expected["id"] == actual.id
        assert expected["title"] == actual.title
        assert expected["description"] == actual.description
      end)
    end
  end

  describe "ProjectQuery - Specific project" do
    @query """
    query Project($id: ID) {
      project (id: $id) {
        id
        title
        description
        lanes {
          id
          title
          description
          cards {
            id
            title
            description
          }
        }
      }
    }
    """
    test "query specified project", %{conn: conn, project: project} do
      conn = conn |> gql(skeleton(@query, %{"id" => project.id}))

      project_response =
        conn
        |> json_response(200)
        |> get_in(~w(data project))

      assert project_response["id"] == project.id
      assert project_response["title"] == project.title
      assert project_response["description"] == project.description
      refute is_nil(project_response["lanes"])
    end

    test "lanes are sorted by rank", %{conn: conn, project: project} do
      conn = conn |> gql(skeleton(@query, %{"id" => project.id}))

      actual =
        conn
        |> json_response(200)
        |> get_in(~w(data project lanes))
        |> Enum.map(&Map.get(&1, "id"))

      expected =
        from(l in Lane,
          where: l.project_id == ^project.id,
          select: [:id],
          order_by: [:rank, :id]
        )
        |> Repo.all()
        |> Enum.map(&Map.get(&1, :id))

      assert expected == actual
    end

    test "cards are sorted by rank", %{conn: conn, project: project} do
      conn = conn |> gql(skeleton(@query, %{"id" => project.id}))
      first_lane = project.lanes |> Enum.at(0)

      actual =
        conn
        |> json_response(200)
        |> get_in(~w(data project lanes))
        |> Enum.find(&(&1["id"] == first_lane.id))
        |> Map.get("cards")
        |> Enum.map(&Map.get(&1, "id"))

      expected =
        from(c in Card,
          where: c.lane_id == ^first_lane.id,
          select: [:id],
          order_by: [asc: :rank, desc: :id]
        )
        |> Repo.all()
        |> Enum.map(&Map.get(&1, :id))

      assert expected == actual
    end
  end
end
