defmodule Hippo.GraphQL.Types.Project do
  use Absinthe.Schema.Notation

  object :project do
    field :id, :identifier
    field :title, :string
    field :description, :string

    # NOTE: I think at least this resolve step can be replaced with assoc?
    field :lanes, list_of(:lane), resolve: Absinthe.Resolution.Helpers.dataloader(:lanes)
  end

  input_object :project_create_params do
    field :title, non_null(:string), description: "how shall we title your new project"
    field :description, :string, description: "give your project an optional description"
  end

  input_object :project_update_params do
    field :title, :string, description: "updated title for your project"
    field :description, :string, description: "updated description for your project"
  end

  object :delete_project_result do
    @desc "object that describes wether deletion of the project succeeded"
    field :success, :boolean
    field :message, :string
  end
end
