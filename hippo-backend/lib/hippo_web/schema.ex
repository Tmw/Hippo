defmodule HippoWeb.Schema do
  use Absinthe.Schema

  query do
    @desc "Query all projects known in the system"
    field :projects, list_of(:project) do

      @desc "The projects ID"
      arg :id, :id

      resolve &HippoWeb.Resolvers.Project.resolve/3
    end
  end

  object :project do
    field :id, :id
    field :name, :string
  end
end

defmodule HippoWeb.Resolvers.Project do
  alias Hippo.Projects

  @doc "Resolve by returning a single project by ID"
  def resolve(_, %{id: id}, _) do
    {:ok, Projects.get_project!(id)}
  end

  @doc "Resolve by returning all projects"
  def resolve(_, _, _) do
    {:ok, Projects.list_projects()}
  end
end
