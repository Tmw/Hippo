defmodule Hippo.ProjectsTest do
  use Hippo.DataCase
  @moduletag :skip

  alias Hippo.Projects

  describe "projects" do
    alias Hippo.Projects.Project

    @valid_attrs %{name: "some name"}
    @update_attrs %{name: "some updated name"}
    @invalid_attrs %{name: nil}

    def project_fixture(attrs \\ %{}) do
      {:ok, project} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Projects.create_project()

      project
    end

    test "list_projects/0 returns all projects" do
      project = project_fixture()
      assert Projects.list_projects() == [project]
    end

    test "get_project!/1 returns the project with given id" do
      project = project_fixture()
      assert Projects.get_project!(project.id) == project
    end

    test "create_project/1 with valid data creates a project" do
      assert {:ok, %Project{} = project} = Projects.create_project(@valid_attrs)
      assert project.name == "some name"
    end

    test "create_project/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Projects.create_project(@invalid_attrs)
    end

    test "update_project/2 with valid data updates the project" do
      project = project_fixture()
      assert {:ok, %Project{} = project} = Projects.update_project(project, @update_attrs)
      assert project.name == "some updated name"
    end

    test "update_project/2 with invalid data returns error changeset" do
      project = project_fixture()
      assert {:error, %Ecto.Changeset{}} = Projects.update_project(project, @invalid_attrs)
      assert project == Projects.get_project!(project.id)
    end

    test "delete_project/1 deletes the project" do
      project = project_fixture()
      assert {:ok, %Project{}} = Projects.delete_project(project)
      assert_raise Ecto.NoResultsError, fn -> Projects.get_project!(project.id) end
    end

    test "change_project/1 returns a project changeset" do
      project = project_fixture()
      assert %Ecto.Changeset{} = Projects.change_project(project)
    end
  end

  describe "lanes" do
    alias Hippo.Lanes.Lane

    @valid_attrs %{name: "some name"}
    @update_attrs %{name: "some updated name"}
    @invalid_attrs %{name: nil}

    def lane_fixture(attrs \\ %{}) do
      {:ok, lane} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Projects.create_lane()

      lane
    end

    test "list_lanes/0 returns all lanes" do
      lane = lane_fixture()
      assert Projects.list_lanes() == [lane]
    end

    test "get_lane!/1 returns the lane with given id" do
      lane = lane_fixture()
      assert Projects.get_lane!(lane.id) == lane
    end

    test "create_lane/1 with valid data creates a lane" do
      assert {:ok, %Lane{} = lane} = Projects.create_lane(@valid_attrs)
      assert lane.name == "some name"
    end

    test "create_lane/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Projects.create_lane(@invalid_attrs)
    end

    test "update_lane/2 with valid data updates the lane" do
      lane = lane_fixture()
      assert {:ok, %Lane{} = lane} = Projects.update_lane(lane, @update_attrs)
      assert lane.name == "some updated name"
    end

    test "update_lane/2 with invalid data returns error changeset" do
      lane = lane_fixture()
      assert {:error, %Ecto.Changeset{}} = Projects.update_lane(lane, @invalid_attrs)
      assert lane == Projects.get_lane!(lane.id)
    end

    test "delete_lane/1 deletes the lane" do
      lane = lane_fixture()
      assert {:ok, %Lane{}} = Projects.delete_lane(lane)
      assert_raise Ecto.NoResultsError, fn -> Projects.get_lane!(lane.id) end
    end

    test "change_lane/1 returns a lane changeset" do
      lane = lane_fixture()
      assert %Ecto.Changeset{} = Projects.change_lane(lane)
    end
  end

  describe "cards" do
    alias Hippo.Projects.Card

    @valid_attrs %{content: "some content"}
    @update_attrs %{content: "some updated content"}
    @invalid_attrs %{content: nil}

    def card_fixture(attrs \\ %{}) do
      {:ok, card} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Projects.create_card()

      card
    end

    test "list_cards/0 returns all cards" do
      card = card_fixture()
      assert Projects.list_cards() == [card]
    end

    test "get_card!/1 returns the card with given id" do
      card = card_fixture()
      assert Projects.get_card!(card.id) == card
    end

    test "create_card/1 with valid data creates a card" do
      assert {:ok, %Card{} = card} = Projects.create_card(@valid_attrs)
      assert card.content == "some content"
    end

    test "create_card/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Projects.create_card(@invalid_attrs)
    end

    test "update_card/2 with valid data updates the card" do
      card = card_fixture()
      assert {:ok, %Card{} = card} = Projects.update_card(card, @update_attrs)
      assert card.content == "some updated content"
    end

    test "update_card/2 with invalid data returns error changeset" do
      card = card_fixture()
      assert {:error, %Ecto.Changeset{}} = Projects.update_card(card, @invalid_attrs)
      assert card == Projects.get_card!(card.id)
    end

    test "delete_card/1 deletes the card" do
      card = card_fixture()
      assert {:ok, %Card{}} = Projects.delete_card(card)
      assert_raise Ecto.NoResultsError, fn -> Projects.get_card!(card.id) end
    end

    test "change_card/1 returns a card changeset" do
      card = card_fixture()
      assert %Ecto.Changeset{} = Projects.change_card(card)
    end
  end
end
