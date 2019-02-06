defmodule HippoWeb.Schema.Types.Project do
  use Absinthe.Schema.Notation
  # use Absinthe.Ecto

  object :project do
    field :id, :id
    field :name, :string

    # NOTE: I think at least this resolve step can be replaced with assoc?
    field :lanes, list_of(:lane), resolve: Absinthe.Resolution.Helpers.dataloader(:lanes)
  end

  input_object :project_input do
    field :name, non_null(:string), description: "how shall we name your new project"
  end

  object :delete_project_result do
    @desc "object that describes wether deletion of the project succeeded"
    field :success, :boolean
    field :message, :string
  end
end
