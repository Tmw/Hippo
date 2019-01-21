defmodule HippoWeb.Schema.Types.Card do
  use Absinthe.Schema.Notation

  object :card do
    field :id, :id
    field :content, :string
  end
end
