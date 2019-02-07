defmodule Hippo.Projects.Project do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  schema "projects" do
    field :name, :string
    field :description, :string

    has_many :lanes, Hippo.Lanes.Lane
    has_many :cards, through: [:lanes, :cards]

    timestamps()
  end

  @doc false
  def changeset(project, attrs) do
    project
    |> cast(attrs, [:name, :description])
    |> validate_required([:name])
  end
end
