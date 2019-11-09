defmodule Hippo.GraphQL.Queries.Projects do
  @moduledoc false
  use Absinthe.Schema.Notation
  alias Hippo.GraphQL.Resolvers

  object :projects_index_query do
    @desc "Query all projects known in the system"
    field :projects, list_of(:project) do
      resolve(&Resolvers.Project.all/2)
    end
  end

  object :project_get_query do
    @desc "Fetch a single project by its id"
    field :project, :project do
      arg(:id, :identifier, description: "the projects ID")
      resolve(&Resolvers.Project.find/2)
    end
  end
end
