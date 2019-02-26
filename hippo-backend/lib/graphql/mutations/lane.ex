defmodule Hippo.GraphQL.Mutations.Lane do
  use Absinthe.Schema.Notation
  alias Hippo.GraphQL.Resolvers

  object :lane_mutations do
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

    @desc "delete a lane by its ID"
    field :delete_lane, :delete_lane_result do
      arg(:lane_id, non_null(:id), description: "the id of the lane to delete")
      resolve(&Resolvers.Lane.delete/2)
    end
  end
end