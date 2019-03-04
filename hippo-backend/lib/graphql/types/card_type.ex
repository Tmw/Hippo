defmodule Hippo.GraphQL.Types.Card do
  use Absinthe.Schema.Notation

  object :card do
    field :id, :identifier
    field :title, :string
    field :description, :string
  end

  input_object :card_input do
    field :title, non_null(:string), description: "The title of the card"
    field :description, :string, description: "a more detailed description of the card"
  end

  object :delete_card_result do
    @desc "object that describes wether deletion of the card succeeded"
    field :success, :boolean
    field :message, :string
  end
end
