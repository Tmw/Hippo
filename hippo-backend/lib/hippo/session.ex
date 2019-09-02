defmodule Hippo.Session do
  def from_absinthe_context(%{context: %{session_token: token}}), do: token
end
