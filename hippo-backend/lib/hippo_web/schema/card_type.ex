defmodule HippoWeb.Schema.Types.Card do
  use Absinthe.Schema.Notation

  object :card do
    field :id, :id
    field :content, :string
  end

  input_object :card_input do
    field :content, non_null(:string), description: "The content of the card"
  end

  object :delete_card_result do
    @desc "object that describes wether deletion of the card succeeded"
    field :success, :boolean
    field :message, :string
  end
end
