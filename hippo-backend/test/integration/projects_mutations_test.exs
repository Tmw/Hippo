defmodule Hippo.Grapql.ProjectMutationsTest do
  use HippoWeb.GraphqlCase
  import Hippo.Test.Factory

  alias Hippo.Repo
  alias Hippo.Projects.Project

  setup %{conn: conn} do
    project = insert(:project)

    {:ok,
     %{
       conn: conn,
       project: project
     }}
  end

  describe "create_project_mutation" do
    @query """
      mutation CreateProject($project: ProjectCreateParams!) {
        createProject(project: $project) {
          successful
          errors {
            message
          }
          project {
            id
          }
        }
      }
    """

    test "creates a project if params are OK", %{conn: conn} do
      project_params = params_for(:project)
      variables = %{"project" => project_params}
      conn = conn |> gql(skeleton(@query, variables))

      response =
        json_response(conn, 200)
        |> get_in(["data", "createProject", "project"])

      expected =
        Project
        |> Repo.get(response["id"])
        |> Map.take(~w(title description)a)

      assert project_params == expected
    end

    test "responds with error if params are not OK", %{conn: conn} do
      project_params = %{"description" => "title is required too"}
      variables = %{"project" => project_params}
      conn = conn |> gql(skeleton(@query, variables))

      error =
        json_response(conn, 200)
        |> Map.get("errors")
        |> Enum.at(0)

      assert error["message"] =~ ~r/"project" has invalid value/
    end
  end

  describe "UpdateProject mutation" do
    @query """
    mutation UpdateProject($projectId: identifier!, $params: ProjectUpdateParams!) {
      updateProject(projectId: $projectId, project: $params) {
        successful
        errors {
          message
        }
        project {
          id
          title
          description
        }
      }
    }
    """
    test "updates successfully when params are OK", %{conn: conn, project: project} do
      project_params = params_for(:project)

      variables = %{
        "projectId" => project.id,
        "params" => project_params
      }

      conn = conn |> gql(skeleton(@query, variables))

      response =
        json_response(conn, 200)
        |> get_in(["data", "updateProject", "project"])

      expected =
        Project
        |> Repo.get(response["id"])
        |> Map.take(~w(title description)a)

      assert project_params == expected
    end

    test "updates when only one param is present", %{conn: conn, project: project} do
      variables = %{
        "projectId" => project.id,
        "params" => %{
          "description" => "some new description"
        }
      }

      conn = conn |> gql(skeleton(@query, variables))

      errors =
        json_response(conn, 200)
        |> Map.get("errors")

      assert is_nil(errors)

      updated_project = Repo.get(Project, project.id)
      assert updated_project.description == "some new description"
    end

    test "fails when project_id is invalid", %{conn: conn} do
      variables = %{
        "projectId" => Ecto.ULID.generate(),
        "params" => %{
          "title" => "lol, nope!"
        }
      }

      conn = conn |> gql(skeleton(@query, variables))

      error =
        json_response(conn, 200)
        |> get_in(["data", "updateProject", "errors"])
        |> Enum.at(0)

      assert error["message"] == "project not found"
    end
  end

  describe "DeleteProject mutation" do
    @query """
    mutation DeleteProject($projectId: identifier!) {
      deleteProject(projectId: $projectId) {
        successful
        errors {
          message
        }
      }
    }
    """

    test "deletes from database", %{conn: conn, project: project} do
      variables = %{"projectId" => project.id}
      conn = conn |> gql(skeleton(@query, variables))

      response =
        json_response(conn, 200)
        |> get_in(["data", "deleteProject"])

      assert response["errors"] |> Enum.empty?()
      assert response["successful"]

      assert Repo.get(Project, project.id) == nil
    end

    test "returns not found when invalid id", %{conn: conn} do
      variables = %{"projectId" => Ecto.ULID.generate()}
      conn = conn |> gql(skeleton(@query, variables))

      response =
        json_response(conn, 200)
        |> get_in(["data", "deleteProject"])

      refute response["successful"]
      assert response["errors"] |> hd() |> Map.get("message") =~ "project not found"
    end
  end
end
