defmodule HippoWeb.Schema.Types.Project do
  use Absinthe.Schema.Notation

  object :project do
    field :id, :id
    field :name, :string
    field :description, :string

    # NOTE: I think at least this resolve step can be replaced with assoc?
    field :lanes, list_of(:lane), resolve: Absinthe.Resolution.Helpers.dataloader(:lanes)
  end

  input_object :project_input do
    field :name, non_null(:string), description: "how shall we name your new project"
    field :description, :string, description: "Give your project an optional description"
  end

  object :delete_project_result do
    @desc "object that describes wether deletion of the project succeeded"
    field :success, :boolean
    field :message, :string
  end
end
