defmodule Hippo.GraphQL.Types.Project do
  use Absinthe.Schema.Notation
  import Absinthe.Resolution.Helpers, only: [dataloader: 1]

  object :project do
    field(:id, :identifier)
    field(:title, :string)
    field(:description, :string)
    field(:lanes, list_of(:lane), resolve: dataloader(:lanes))
  end

  input_object :project_create_params do
    field(:title, non_null(:string), description: "how shall we title your new project")
    field(:description, :string, description: "give your project an optional description")
  end

  input_object :project_update_params do
    field(:title, :string, description: "updated title for your project")
    field(:description, :string, description: "updated description for your project")
  end
end
