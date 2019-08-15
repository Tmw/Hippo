defmodule Hippo.Cards do
  import Ecto.Query
  alias Hippo.{Cards.Card, Lanes.Lane, Repo}

  def data() do
    Dataloader.Ecto.new(Hippo.Repo, query: &query/2)
  end

  def query(queryable, _params) do
    from(queryable, order_by: [asc: :rank, desc: :id])
  end

  def find_owning_project_id(%Card{id: card_id}),
    do: find_owning_project_id(card_id)

  def find_owning_project_id(card_id) when is_binary(card_id) do
    from(card in Card)
    |> where([card], card.id == ^card_id)
    |> join(:left, [card], lane in assoc(card, :lane))
    |> select([..., lane], lane.project_id)
    |> Repo.one()
  end

  @doc """
  Returns the list of cards.

  ## Examples

      iex> list_cards()
      [%Card{}, ...]

  """
  def list_cards, do: Repo.all(Card)
  def get_card(id), do: Repo.get(Card, id)

  @doc """
  Gets a single card.

  Raises `Ecto.NoResultsError` if the Card does not exist.

  ## Examples

      iex> get_card!(123)
      %Card{}

      iex> get_card!(456)
      ** (Ecto.NoResultsError)

  """
  def get_card!(id), do: Repo.get!(Card, id)

  @doc """
  Creates a card.

  ## Examples

      iex> create_card(%{field: value})
      {:ok, %Card{}}

      iex> create_card(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_card(attrs \\ %{}, for_lane: lane_id) do
    case Repo.get(Lane, lane_id) do
      nil ->
        {:error, "lane not found"}

      lane ->
        attrs = Map.merge(attrs, %{position: :first, lane_id: lane.id})

        %Card{}
        |> Card.changeset(attrs)
        |> Repo.insert()
    end
  end

  @doc """
  Updates a card.

  ## Examples

      iex> update_card(card, %{field: new_value})
      {:ok, %Card{}}

      iex> update_card(card, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_card(%Card{} = card, attrs) do
    card
    |> Card.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Card.

  ## Examples

      iex> delete_card(card)
      {:ok, %Card{}}

      iex> delete_card(card)
      {:error, %Ecto.Changeset{}}

  """
  def delete_card(%Card{} = card) do
    Repo.delete(card)
  end

  def delete_card_by_id(id) do
    case Repo.get(Card, id) do
      nil -> {:error, "card not found"}
      card -> Repo.delete(card)
    end
  end

  def reposition_card(card_id, lane_id, position) do
    with {:lane, %Lane{} = lane} <- {:lane, Repo.get(Lane, lane_id)},
         {:card, %Card{} = card} <- {:card, Repo.get(Card, card_id)} do
      card
      |> Card.changeset(%{position: position})
      |> Card.change_lane(lane.id)
      |> Repo.update()
    else
      {:lane, nil} -> {:error, "lane not found"}
      {:card, nil} -> {:error, "card not found"}
    end
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking card changes.

  ## Examples

      iex> change_card(card)
      %Ecto.Changeset{source: %Card{}}

  """
  def change_card(%Card{} = card) do
    Card.changeset(card, %{})
  end
end
