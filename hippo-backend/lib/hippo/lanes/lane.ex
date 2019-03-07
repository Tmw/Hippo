defmodule Hippo.Lanes.Lane do
  use Ecto.Schema
  import Ecto.Changeset
  import EctoRanked

  @primary_key {:id, Ecto.ULID, autogenerate: true}
  @foreign_key_type Ecto.ULID
  schema "lanes" do
    field :title, :string
    field :description, :string
    field :rank, :integer
    field :position, :any, virtual: true
    belongs_to :project, Hippo.Projects.Project
    has_many :cards, Hippo.Cards.Card

    timestamps()
  end

  @doc false
  def changeset(lane, attrs) do
    lane
    |> cast(attrs, [:title, :description, :position])
    |> validate_required([:title])
    |> set_rank(scope: :project_id)
  end
end
