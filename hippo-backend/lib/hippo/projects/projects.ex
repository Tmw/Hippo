defmodule Hippo.Projects do
  @moduledoc """
  The Projects context.
  """

  import Ecto.Query, warn: false
  alias Hippo.Repo

  alias Hippo.Projects.Project
  alias Hippo.Cards.Card
  alias Hippo.Lanes.Lane

  @doc """
  Returns the list of projects.

  ## Examples

      iex> list_projects()
      [%Project{}, ...]

  """
  def list_projects, do: Repo.all(Project)

  def get_project(id), do: Repo.get(Project, id)

  @doc """
  Gets a single project.

  Raises `Ecto.NoResultsError` if the Project does not exist.

  ## Examples

      iex> get_project!(123)
      %Project{}

      iex> get_project!(456)
      ** (Ecto.NoResultsError)

  """
  def get_project!(id), do: Repo.get!(Project, id)

  @doc """
  Gets a single project with lanes and cards preloaded

  ## Examples

      iex> get_project!(123, :with_details)
      %Project{lanes: [%Lane{cards: [%Card{}]}]}

  """
  def get_project!(id, :with_details) do
    Repo.one(
      from p in Project,
        where: p.id == ^id,
        left_join: l in Lane,
        on: l.project_id == p.id,
        left_join: c in Card,
        on: c.lane_id == l.id,
        preload: [lanes: {l, cards: c}]
    )
  end

  @doc """
  Creates a project.

  ## Examples

      iex> create_project(%{field: value})
      {:ok, %Project{}}

      iex> create_project(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_project(attrs \\ %{}) do
    %Project{}
    |> Project.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a project.

  ## Examples

      iex> update_project(project, %{field: new_value})
      {:ok, %Project{}}

      iex> update_project(project, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_project(%Project{} = project, attrs) do
    project
    |> Project.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Project.

  ## Examples

      iex> delete_project(project)
      {:ok, %Project{}}

      iex> delete_project(project)
      {:error, %Ecto.Changeset{}}

  """
  def delete_project(%Project{} = project) do
    Repo.delete(project)
  end

  def lane_ids_for_project_id(project_id) do
    from l in Lane,
      where: l.project_id == ^project_id,
      select: l.id
  end

  def card_ids_for_lane_ids(lane_ids) do
    from c in Card,
      where: c.lane_id in ^lane_ids,
      select: c.id
  end

  def delete_with_contents(project_id) do
    project = Project |> Repo.get(project_id)

    case project do
      nil ->
        {:error, message: "project not found"}

      project ->
        lane_ids =
          project.id
          |> lane_ids_for_project_id()
          |> Repo.all()

        card_ids =
          lane_ids
          |> card_ids_for_lane_ids()
          |> Repo.all()

        # write one big multi that drops all the things.
        Ecto.Multi.new()
        |> Ecto.Multi.delete_all(:drop_cards, from(c in Card, where: c.id in ^card_ids))
        |> Ecto.Multi.delete_all(:drop_lanes, from(l in Lane, where: l.id in ^lane_ids))
        |> Ecto.Multi.delete_all(:drop_project, from(p in Project, where: p.id == ^project_id))
        |> Repo.transaction()
        |> case do
          {:ok, _} -> {:ok, message: "Projects and contents deleted"}
          {:error, _} = err -> err
        end
    end
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking project changes.

  ## Examples

      iex> change_project(project)
      %Ecto.Changeset{source: %Project{}}

  """
  def change_project(%Project{} = project) do
    Project.changeset(project, %{})
  end
end
