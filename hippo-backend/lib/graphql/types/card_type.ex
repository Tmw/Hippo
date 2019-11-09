defmodule Hippo.GraphQL.Types.Card do
  @moduledoc false
  use Absinthe.Schema.Notation

  object :card do
    field :id, :identifier
    field :title, :string
    field :description, :string
  end

  input_object :card_create_params do
    field :title, non_null(:string), description: "The title of the card"
    field :description, :string, description: "a more detailed description of the card"
  end

  input_object :card_update_params do
    field :title, :string, description: "updated title of the card"
    field :description, :string, description: "updated description of card"
  end
end
