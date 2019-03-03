defmodule Hippo.GraphQL.Mutations.Project do
  use Absinthe.Schema.Notation
  alias Hippo.GraphQL.Resolvers

  object :project_mutations do
    @desc "create a new project"
    field :create_project, :project do
      arg(:project, non_null(:project_input))
      resolve(&Resolvers.Project.create/2)
    end

    @desc "update an existing project"
    field :update_project, :project do
      arg(:project_id, non_null(:UUID))
      arg(:project, non_null(:project_input))
      resolve(&Resolvers.Project.update/2)
    end

    @desc "delete a project by its ID"
    field :delete_project, :delete_project_result do
      arg(:project_id, non_null(:UUID), description: "the id of the project to delete")
      resolve(&Resolvers.Project.delete/2)
    end
  end
end
