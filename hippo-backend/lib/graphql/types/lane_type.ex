defmodule Hippo.GraphQL.Types.Lane do
  @moduledoc false
  use Absinthe.Schema.Notation
  import Absinthe.Resolution.Helpers, only: [dataloader: 1]

  object :lane do
    field(:id, :identifier)
    field(:title, :string)
    field(:description, :string)
    field(:cards, list_of(:card), resolve: dataloader(:cards))
  end

  input_object :lane_create_params do
    @desc "title of the lane. Eg. `to-do`"
    field(:title, non_null(:string))

    @desc "description of the lane. eg 'items to be done'"
    field(:description, :string)
  end

  input_object :lane_update_params do
    @desc "updated title of the lane"
    field(:title, :string)

    @desc "updated description of the lane"
    field(:description, :string)
  end
end
