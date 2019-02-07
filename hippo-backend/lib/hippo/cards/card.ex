defmodule Hippo.Cards.Card do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "cards" do
    field :content, :string

    belongs_to :lane, Hippo.Lanes.Lane

    timestamps()
  end

  def changeset(card, attrs, :create) do
    changeset(card, attrs)
    |> cast(attrs, [:lane_id])
    |> validate_required(:lane_id)
    |> foreign_key_constraint(:lane_id)
  end

  @doc false
  def changeset(card, attrs) do
    card
    |> cast(attrs, [:content])
    |> validate_required([:content])
  end
end
