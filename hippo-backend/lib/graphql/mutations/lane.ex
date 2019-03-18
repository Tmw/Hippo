defmodule Hippo.GraphQL.Mutations.Lane do
  use Absinthe.Schema.Notation
  alias Hippo.GraphQL.Resolvers
  import Freight.Payload

  define_payload(:create_lane_payload, lane: :lane)
  define_payload(:update_lane_payload, lane: :lane)
  define_payload(:reposition_lane_payload, lane: :lane)
  define_payload(:delete_lane_payload)

  object :lane_mutations do
    @desc "create lane within project"
    field :create_lane, :create_lane_payload do
      arg(:project_id, non_null(:identifier),
        description: "the parent project ID to create the lane into"
      )

      arg(:lane, non_null(:lane_create_params))
      resolve(&Resolvers.Lane.create/2)
      middleware(&build_payload/2)
    end

    @desc "update an existing lane"
    field :update_lane, :update_lane_payload do
      arg(:lane_id, non_null(:identifier), description: "the lane to update")
      arg(:lane, non_null(:lane_update_params))
      resolve(&Resolvers.Lane.update/2)
      middleware(&build_payload/2)
    end

    @desc "delete a lane by its ID"
    field :delete_lane, :delete_lane_payload do
      arg(:lane_id, non_null(:identifier), description: "the id of the lane to delete")
      resolve(&Resolvers.Lane.delete/2)
      middleware(&build_payload/2)
    end

    @desc "reposition the lane within a project"
    field :reposition_lane, :reposition_lane_payload do
      arg(:lane_id, non_null(:identifier), description: "the id of the lane to reposition")
      arg(:position, non_null(:integer), description: "new position of the lane")
      resolve(&Resolvers.Lane.reposition/2)
      middleware(&build_payload/2)
    end
  end
end
