defmodule Hippo.GraphQL.Schema do
  @moduledoc false
  use Absinthe.Schema

  # setup dataloader
  def context(ctx) do
    loader =
      Dataloader.new()
      |> Dataloader.add_source(:lanes, Hippo.Lanes.data())
      |> Dataloader.add_source(:cards, Hippo.Cards.data())

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
  import_types(Hippo.GraphQL.Subscriptions)

  query do
    import_fields(:projects_index_query)
    import_fields(:project_get_query)
  end

  mutation do
    import_fields(:project_mutations)
    import_fields(:lane_mutations)
    import_fields(:card_mutations)
  end

  subscription do
    import_fields(:project_subscriptions)
  end
end
