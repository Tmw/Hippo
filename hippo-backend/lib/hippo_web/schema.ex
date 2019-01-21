defmodule HippoWeb.Schema do
  import Absinthe.Resolution.Helpers, only: [dataloader: 1]
  use Absinthe.Schema

  def context(ctx) do
    loader =
      Dataloader.new
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

      @desc "The projects ID"
      arg :id, :id

      resolve &HippoWeb.Resolvers.Project.resolve/2
    end
  end

  mutation do
    @desc "create a new project"
    field :create_project, :project do
      arg :name, non_null(:string)
      resolve &HippoWeb.Resolvers.Project.create/2
    end
  end

  import_types __MODULE__.Types.Project
  import_types __MODULE__.Types.Lane
  import_types __MODULE__.Types.Card
end
