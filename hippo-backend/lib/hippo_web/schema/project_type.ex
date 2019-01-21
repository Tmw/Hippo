defmodule HippoWeb.Schema.Types.Project do
  use Absinthe.Schema.Notation

  object :project do
    field :id, :id
    field :name, :string
    field :lanes, list_of(:lane), resolve: Absinthe.Resolution.Helpers.dataloader(:lanes)
  end
end
