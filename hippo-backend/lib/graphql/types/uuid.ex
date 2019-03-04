defmodule Hippo.GraphQL.Types.Identifier do
  @moduledoc """
  ULID is a sortable equivalent of UUID.
  """
  use Absinthe.Schema.Notation

  scalar :identifier, name: "identifier" do
    description("identifier is represented by an ULID compliant string data.")

    serialize(&encode/1)
    parse(&decode/1)
  end

  @spec decode(Absinthe.Blueprint.Input.String.t()) :: {:ok, term()} | :error
  @spec decode(Absinthe.Blueprint.Input.Null.t()) :: {:ok, nil}
  defp decode(%Absinthe.Blueprint.Input.String{value: value}) do
    Ecto.ULID.cast(value)
  end

  defp decode(%Absinthe.Blueprint.Input.Null{}) do
    {:ok, nil}
  end

  defp decode(_) do
    :error
  end

  defp encode(value), do: value
end
