defmodule Hippo.Cards.Card do
  use Ecto.Schema
  import Ecto.Changeset
  import EctoRanked

  @primary_key {:id, Ecto.ULID, autogenerate: true}
  @foreign_key_type Ecto.ULID
  schema "cards" do
    field :title, :string
    field :description, :string
    field :rank, :integer
    field :position, :any, virtual: true
    belongs_to :lane, Hippo.Lanes.Lane

    timestamps()
  end

  @doc false
  def changeset(card, attrs) do
    card
    |> cast(attrs, [:title, :description, :position])
    |> validate_required([:title])
    |> set_rank(scope: :lane_id)
  end

  def change_lane(%Ecto.Changeset{} = changeset, lane_id) do
    changeset |> Ecto.Changeset.put_change(:lane_id, lane_id)
  end
end
