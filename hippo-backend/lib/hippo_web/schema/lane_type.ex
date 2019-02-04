defmodule HippoWeb.Schema.Types.Lane do
  use Absinthe.Schema.Notation

  object :lane do
    field :id, :id
    field :name, :string
    field :cards, list_of(:card), resolve: Absinthe.Resolution.Helpers.dataloader(:cards)
  end

  input_object :lane_input do
    field :name, non_null(:string), description: "The name of the lane. eq `To-Do`"
  end

  object :delete_lane_result do
    @desc "object that describes wether deletion of the lane succeeded"
    field :success, :boolean
    field :message, :string
  end
end
