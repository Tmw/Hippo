defmodule HippoWeb.Schema do
  import Absinthe.Resolution.Helpers, only: [dataloader: 1]
  use Absinthe.Schema

  def context(ctx) do
    loader =
      Dataloader.new()
      |> Dataloader.add_source(:lanes, HippoWeb.Resolvers.Project.data())
      |> Dataloader.add_source(:cards, HippoWeb.Resolvers.Project.data())

    Map.put(ctx, :loader, loader)
  end

  def plugins do
    [Absinthe.Middleware.Dataloader] ++ Absinthe.Plugin.defaults()
  end

  query do
    @desc "Query all projects known in the system"
    field :projects, list_of(:project) do
      arg(:id, :id, description: "the projects ID")
      resolve(&HippoWeb.Resolvers.Project.find/2)
    end
  end

  mutation do
    @desc "create a new project"
    field :create_project, :project do
      arg(:project, non_null(:project_input))
      resolve(&HippoWeb.Resolvers.Project.create/2)
    end

    @desc "create lane within project"
    field :create_lane, :lane do
      arg(:project_id, non_null(:id), description: "the parent project ID to create the lane into")

      arg(:lane, non_null(:lane_input))
      resolve(&HippoWeb.Resolvers.Lane.create/2)
    end

    @desc "update an existing lane"
    field :update_lane, :lane do
      arg(:lane_id, non_null(:id), description: "the lane to update")
      arg(:lane, non_null(:lane_input))
      resolve(&HippoWeb.Resolvers.Lane.update/2)
    end

    @desc "create card within lane"
    field :create_card, :card do
      arg(:lane_id, non_null(:id), description: "the parent lane ID to create the card into")
      arg(:card, non_null(:card_input))
      resolve(&HippoWeb.Resolvers.Card.create/2)
    end

    @desc "update an existing card"
    field :update_card, :card do
      arg(:card_id, non_null(:id), description: "which card do we want to update")
      arg(:card, non_null(:card_input), description: "updated card parameters")
      resolve(&HippoWeb.Resolvers.Card.update/2)
    end
  end

  import_types(__MODULE__.Types.Project)
  import_types(__MODULE__.Types.Lane)
  import_types(__MODULE__.Types.Card)
end
