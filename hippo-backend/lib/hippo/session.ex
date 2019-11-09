defmodule Hippo.Session do
  @moduledoc false
  def from_absinthe_context(%{context: %{session_token: token}}), do: token
end
