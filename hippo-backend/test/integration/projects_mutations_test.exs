defmodule Hippo.Grapql.ProjectMutationsTest do
  use HippoWeb.ConnCase
  import Hippo.Test.Factory

  alias Hippo.Repo
  alias Hippo.Projects.Project

  setup %{conn: conn} do
    project = insert(:project)
    project_params = params_for(:project)

    {:ok,
     %{
       conn: conn,
       project: project,
       project_params: project_params
     }}
  end

  describe "create_project_mutation" do
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
      mutation CreateProject($project: ProjectInput!) {
        project:createProject(project: $project) {
          id
        }
      }
    """

    test "create a project", %{conn: conn, project_params: project_params} do
      params = %{"project" => project_params}
      conn = conn |> gql(skeleton(@query, params))

      response =
        json_response(conn, 200)
        |> Map.get("data")
        |> Map.get("project")

      persisted_project = Repo.get(Project, response["id"])

      with persisted <- Map.from_struct(persisted_project),
           %{title: title, description: description} <- persisted do
        assert title == project_params[:title]
        assert description == project_params[:description]
      else
        _ -> assert false
      end
    end

    @tag :skip
    test "update a project", %{conn: conn, project: project} do
      # to be implemented
    end

    @tag :skip
    test "delete a project", %{conn: conn, project: project} do
      # to be implemented
    end
  end
end
