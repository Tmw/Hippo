defmodule Hippo.Projects.Project do
  use Ecto.Schema
  import Ecto.Changeset


  schema "projects" do
    field :name, :string

    has_many :lanes, Hippo.Projects.Lane

    timestamps()
  end

  @doc false
  def changeset(project, attrs) do
    project
    |> cast(attrs, [:name])
    |> validate_required([:name])
  end
end
