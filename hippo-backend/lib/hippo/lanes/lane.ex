defmodule Hippo.Lanes.Lane do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "lanes" do
    field :name, :string

    belongs_to :project, Hippo.Projects.Project
    has_many :cards, Hippo.Cards.Card

    timestamps()
  end

  def changeset(lane, attrs, :create) do
    changeset(lane, attrs)
    |> cast(attrs, [:project_id])
    |> validate_required([:project_id])
    |> foreign_key_constraint(:project_id)
  end

  @doc false
  def changeset(lane, attrs) do
    lane
    |> cast(attrs, [:name])
    |> validate_required([:name])
  end
end
