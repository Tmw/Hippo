defmodule Hippo.Cards.Card do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, Ecto.ULID, autogenerate: true}
  @foreign_key_type Ecto.ULID
  schema "cards" do
    field :title, :string
    field :description, :string

    belongs_to :lane, Hippo.Lanes.Lane

    timestamps()
  end

  @doc false
  def changeset(card, attrs) do
    card
    |> cast(attrs, [:title, :description])
    |> validate_required([:title])
  end
end
