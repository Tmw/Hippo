defmodule Hippo.Grapql.ProjectMutationsTest do
  use HippoWeb.GraphqlCase
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
    @query """
      mutation CreateProject($project: ProjectInput!) {
        project:createProject(project: $project) {
          id
        }
      }
    """

    test "creates a project if all is well", %{conn: conn, project_params: project_params} do
      variables = %{"project" => project_params}
      conn = conn |> gql(skeleton(@query, variables))

      response =
        json_response(conn, 200)
        |> Map.get("data")
        |> Map.get("project")

      expected =
        Project
        |> Repo.get(response["id"])
        |> Map.take(~w(title description)a)

      assert project_params == expected
    end
  end

  describe "UpdateProject mutation" do
    @query """
    mutation UpdateProject($projectId: UUID!, $params: ProjectInput!) {
      project: updateProject(projectId: $projectId, project: $params) {
        id
        title
        description
      }
    }
    """

    test "update a project", %{conn: conn, project: project, project_params: project_params} do
      variables = %{
        "projectId" => project.id,
        "params" => project_params
      }

      conn = conn |> gql(skeleton(@query, variables))

      response =
        json_response(conn, 200)
        |> Map.get("data")
        |> Map.get("project")

      expected =
        Project
        |> Repo.get(response["id"])
        |> Map.take(~w(title description)a)

      assert project_params == expected
    end
  end

  describe "DeleteProject mutation" do
    @query """
    mutation DeleteProject($projectId: UUID!) {
      deleteProject(projectId: $projectId) {
        success
        message
      }
    }
    """

    test "responds with success message", %{conn: conn, project: project} do
      variables = %{"projectId" => project.id}
      conn = conn |> gql(skeleton(@query, variables))

      response =
        json_response(conn, 200)
        |> Map.get("data")
        |> Map.get("deleteProject")

      assert response["success"]
      assert response["message"] =~ ~r/project and its contents deleted/i
    end

    test "returns not found when invalid id", %{conn: conn, project: project} do
      variables = %{"projectId" => Ecto.UUID.generate()}
      conn = conn |> gql(skeleton(@query, variables))

      errors =
        json_response(conn, 200)
        |> Map.get("errors")
        |> Enum.at(0)

      assert errors["message"] =~ "project not found"
    end

    test "deletes from database", %{conn: conn, project: project} do
      variables = %{"projectId" => project.id}
      conn |> gql(skeleton(@query, variables))

      refute Repo.get(Project, project.id)
    end
  end
end
