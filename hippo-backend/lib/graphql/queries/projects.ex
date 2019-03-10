defmodule Hippo.GraphQL.Queries.Projects do
  use Absinthe.Schema.Notation
  alias Hippo.GraphQL.Resolvers

  object :projects_index_query do
    @desc "Query all projects known in the system"
    field :projects, list_of(:project) do
      arg(:id, :identifier, description: "the projects ID")
      resolve(&Resolvers.Project.find/2)
    end
  end
end
