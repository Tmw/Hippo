defmodule Hippo.GraphQL.Types.Lane do
  use Absinthe.Schema.Notation

  object :lane do
    field :id, :UUID
    field :title, :string
    field :description, :string
    field :cards, list_of(:card), resolve: Absinthe.Resolution.Helpers.dataloader(:cards)
  end

  input_object :lane_create_params do
    @desc "title of the lane. Eg. `to-do`"
    field :title, non_null(:string)

    @desc "description of the lane. eg 'items to be done'"
    field :description, :string
  end

  input_object :lane_update_params do
    @desc "updated title of the lane"
    field :title, :string

    @desc "updated description of the lane"
    field :description, :string
  end

  object :delete_lane_result do
    @desc "object that describes wether deletion of the lane succeeded"
    field :success, :boolean
    field :message, :string
  end
end
