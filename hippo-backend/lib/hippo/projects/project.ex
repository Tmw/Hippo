defmodule Hippo.Projects.Project do
  @moduledoc false
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, Ecto.ULID, autogenerate: true}
  schema "projects" do
    field(:title, :string)
    field(:description, :string)

    has_many(:lanes, Hippo.Lanes.Lane)
    has_many(:cards, through: [:lanes, :cards])

    timestamps()
  end

  @doc false
  def changeset(project, attrs) do
    project
    |> cast(attrs, [:title, :description])
    |> cast_assoc(:lanes)
    |> validate_required([:title])
  end
end
