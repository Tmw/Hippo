defmodule Hippo.GraphQL.Mutations.Card do
  use Absinthe.Schema.Notation
  alias Hippo.GraphQL.Resolvers

  object :card_mutations do
    @desc "create card within lane"
    field :create_card, :card do
      arg(:lane_id, non_null(:identifier),
        description: "the parent lane ID to create the card into"
      )

      arg(:card, non_null(:card_create_params))
      resolve(&Resolvers.Card.create/2)
    end

    @desc "update an existing card"
    field :update_card, :card do
      arg(:card_id, non_null(:identifier), description: "which card do we want to update")
      arg(:card, non_null(:card_update_params), description: "updated card parameters")
      resolve(&Resolvers.Card.update/2)
    end

    @desc "delete a card by its ID"
    field :delete_card, :delete_card_result do
      arg(:card_id, non_null(:identifier), description: "the id of the card to delete")
      resolve(&Resolvers.Card.delete/2)
    end

    @desc "reposition the card. Within same lane or between lanes"
    field :reposition_card, :card do
      arg(:card_id, non_null(:identifier), description: "the id of the card to reposition")
      arg(:lane_id, non_null(:identifier), description: "the target lane id to drop the card in")
      arg(:position, non_null(:integer), description: "new position of the card")
      resolve(&Resolvers.Card.reposition/2)
    end
  end
end
