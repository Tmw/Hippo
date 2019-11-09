defmodule Hippo.GraphQL.Mutations.Project do
  @moduledoc false
  use Absinthe.Schema.Notation
  alias Hippo.GraphQL.Resolvers
  import Freight.Payload

  define_payload(:create_project_payload, project: :project)
  define_payload(:update_project_payload, project: :project)
  define_payload(:delete_project_payload)

  object :project_mutations do
    @desc "create a new project"
    field :create_project, :create_project_payload do
      arg(:project, non_null(:project_create_params))
      resolve(&Resolvers.Project.create/2)
      middleware(&build_payload/2)
    end

    @desc "update an existing project"
    field :update_project, :update_project_payload do
      arg(:project_id, non_null(:identifier))
      arg(:project, non_null(:project_update_params))
      resolve(&Resolvers.Project.update/2)
      middleware(&build_payload/2)
    end

    @desc "delete a project by its ID"
    field :delete_project, :delete_project_payload do
      arg(:project_id, non_null(:identifier), description: "the id of the project to delete")
      resolve(&Resolvers.Project.delete/2)
      middleware(&build_payload/2)
    end
  end
end
