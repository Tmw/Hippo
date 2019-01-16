defmodule Hippo.Projects.Lane do
  use Ecto.Schema
  import Ecto.Changeset


  schema "lanes" do
    field :name, :string

    belongs_to :project, Hippo.Projects.Project
    has_many :cards, Hippo.Projects.Card

    timestamps()
  end

  @doc false
  def changeset(lane, attrs) do
    lane
    |> cast(attrs, [:name])
    |> validate_required([:name])
  end
end
