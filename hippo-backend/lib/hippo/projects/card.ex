defmodule Hippo.Projects.Card do
  use Ecto.Schema
  import Ecto.Changeset


  schema "cards" do
    field :content, :string

    belongs_to :lane, Hippo.Projects.Lane

    timestamps()
  end

  @doc false
  def changeset(card, attrs) do
    card
    |> cast(attrs, [:content])
    |> validate_required([:content])
  end
end
