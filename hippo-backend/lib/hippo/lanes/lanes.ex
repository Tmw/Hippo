defmodule Hippo.Lanes do
  import Ecto.Query, warn: false
  alias Hippo.Lanes.Lane
  alias Hippo.Cards.Card
  alias Hippo.Repo

  @doc """
  Returns the list of lanes.

  ## Examples

      iex> list_lanes()
      [%Lane{}, ...]

  """
  def list_lanes, do: Repo.all(Lane)

  @doc """
  Gets a single lane.

  Raises `Ecto.NoResultsError` if the Lane does not exist.

  ## Examples

      iex> get_lane!(123)
      %Lane{}

      iex> get_lane!(456)
      ** (Ecto.NoResultsError)

  """
  def get_lane!(id), do: Repo.get!(Lane, id)

  def get_lane!(id, :with_details) do
    Repo.one(
      from l in Lane,
        where: l.id == ^id,
        left_join: c in Card,
        on: c.lane_id == l.id,
        preload: [cards: c]
    )
  end

  @doc """
  Creates a lane.

  ## Examples

      iex> create_lane(%{field: value})
      {:ok, %Lane{}}

      iex> create_lane(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_lane(attrs \\ %{}, for_project: project_id) do
    attrs = attrs |> Map.put(:project_id, project_id)

    %Lane{}
    |> Lane.changeset(attrs, :create)
    |> Repo.insert()
  end

  @doc """
  Updates a lane.

  ## Examples

      iex> update_lane(lane, %{field: new_value})
      {:ok, %Lane{}}

      iex> update_lane(lane, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_lane(%Lane{} = lane, attrs) do
    lane
    |> Lane.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Lane.

  ## Examples

      iex> delete_lane(lane)
      {:ok, %Lane{}}

      iex> delete_lane(lane)
      {:error, %Ecto.Changeset{}}

  """
  def delete_lane(%Lane{} = lane) do
    Repo.delete(lane)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking lane changes.

  ## Examples

      iex> change_lane(lane)
      %Ecto.Changeset{source: %Lane{}}

  """
  def change_lane(%Lane{} = lane) do
    Lane.changeset(lane, %{})
  end
end
