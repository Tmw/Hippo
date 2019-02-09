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

  mutation do
    @desc "create a new project"
    field :create_project, :project do
      arg(:project, non_null(:project_input))
      resolve(&Resolvers.Project.create/2)
    end

    @desc "update an existing project"
    field :update_project, :project do
      arg(:project_id, non_null(:id))
      arg(:project, non_null(:project_input))
      resolve(&Resolvers.Project.update/2)
    end

    @desc "create lane within project"
    field :create_lane, :lane do
      arg(:project_id, non_null(:id), description: "the parent project ID to create the lane into")

      arg(:lane, non_null(:lane_input))
      resolve(&Resolvers.Lane.create/2)
    end

    @desc "update an existing lane"
    field :update_lane, :lane do
      arg(:lane_id, non_null(:id), description: "the lane to update")
      arg(:lane, non_null(:lane_input))
      resolve(&Resolvers.Lane.update/2)
    end

    @desc "create card within lane"
    field :create_card, :card do
      arg(:lane_id, non_null(:id), description: "the parent lane ID to create the card into")
      arg(:card, non_null(:card_input))
      resolve(&Resolvers.Card.create/2)
    end

    @desc "update an existing card"
    field :update_card, :card do
      arg(:card_id, non_null(:id), description: "which card do we want to update")
      arg(:card, non_null(:card_input), description: "updated card parameters")
      resolve(&Resolvers.Card.update/2)
    end

    @desc "delete a card by its ID"
    field :delete_card, :delete_card_result do
      arg(:card_id, non_null(:id), description: "the id of the card to delete")
      resolve(&Resolvers.Card.delete/2)
    end

    @desc "delete a lane by its ID"
    field :delete_lane, :delete_lane_result do
      arg(:lane_id, non_null(:id), description: "the id of the lane to delete")
      resolve(&Resolvers.Lane.delete/2)
    end

    @desc "delete a project by its ID"
    field :delete_project, :delete_project_result do
      arg(:project_id, non_null(:id), description: "the id of the project to delete")
      resolve(&Resolvers.Project.delete/2)
    end
  end

  import_types(Hippo.GraphQL.Types.Project)
  import_types(Hippo.GraphQL.Types.Lane)
  import_types(Hippo.GraphQL.Types.Card)
end
