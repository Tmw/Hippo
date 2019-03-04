defmodule Hippo.Lanes.Lane do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, Ecto.ULID, autogenerate: true}
  @foreign_key_type Ecto.ULID
  schema "lanes" do
    field :title, :string
    field :description, :string

    belongs_to :project, Hippo.Projects.Project
    has_many :cards, Hippo.Cards.Card

    timestamps()
  end

  @doc false
  def changeset(lane, attrs) do
    lane
    |> cast(attrs, [:title, :description])
    |> validate_required([:title])
  end
end
