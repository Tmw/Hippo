defmodule Hippo.GraphQL.Schema do
  use Absinthe.Schema
  alias Hippo.GraphQL.Resolvers

  # setup dataloader
  def context(ctx) do
    loader =
      Dataloader.new()
      |> Dataloader.add_source(:lanes, Resolvers.Lane.data())
      |> Dataloader.add_source(:cards, Resolvers.Card.data())

    Map.put(ctx, :loader, loader)
  end

  # hook dataloader into Absinthe
  def plugins do
    [Absinthe.Middleware.Dataloader] ++ Absinthe.Plugin.defaults()
  end

  # import and setup all types, queries and mutations
  import_types(Hippo.GraphQL.Types)
  import_types(Hippo.GraphQL.Queries)
  import_types(Hippo.GraphQL.Mutations)

  query do
    import_fields(:projects_index_query)
  end

  mutation do
    import_fields(:project_mutations)
    import_fields(:lane_mutations)
    import_fields(:card_mutations)
  end
end
