defmodule Hippo.Cards do
  alias Hippo.Cards.Card
  alias Hippo.Repo
  import Ecto.Query

  @doc """
  Returns the list of cards.

  ## Examples

      iex> list_cards()
      [%Card{}, ...]

  """
  def list_cards, do: Repo.all(Card)

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
    attrs = attrs |> Map.put(:lane_id, lane_id)

    %Card{}
    |> Card.changeset(attrs, :create)
    |> Repo.insert()
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
    from(c in Card, where: c.id == ^id)
    |> Repo.delete_all()
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
