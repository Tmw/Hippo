defmodule Hippo.GraphQL.Mutations.Card do
  use Absinthe.Schema.Notation
  alias Hippo.GraphQL.Resolvers

  object :card_mutations do
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
  end
end
