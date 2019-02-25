defmodule Hippo.GraphQL.Schema do
  import Absinthe.Resolution.Helpers, only: [dataloader: 1]
  use Absinthe.Schema

  alias Hippo.GraphQL.Resolvers

  def context(ctx) do
    loader =
      Dataloader.new()
      |> Dataloader.add_source(:lanes, Resolvers.Project.data())
      |> Dataloader.add_source(:cards, Resolvers.Project.data())

    Map.put(ctx, :loader, loader)
  end

  def plugins do
    [Absinthe.Middleware.Dataloader] ++ Absinthe.Plugin.defaults()
  end

  query do
    @desc "Query all projects known in the system"
    field :projects, list_of(:project) do
      arg(:id, :id, description: "the projects ID")
      resolve(&Resolvers.Project.find/2)
    end
  end

  import_types(Hippo.GraphQL.Mutations.Project)
  import_types(Hippo.GraphQL.Mutations.Lane)
  import_types(Hippo.GraphQL.Mutations.Card)

  mutation do
    import_fields(:project_mutations)
    import_fields(:lane_mutations)
    import_fields(:card_mutations)
  end

  import_types(Hippo.GraphQL.Types.Project)
  import_types(Hippo.GraphQL.Types.Lane)
  import_types(Hippo.GraphQL.Types.Card)
end
