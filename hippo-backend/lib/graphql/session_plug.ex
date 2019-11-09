defmodule Hippo.GraphQL.SessionPlug do
  @moduledoc """
  This is a plug to grab the `x-session-token` from the request headers and pass them
  on to the context to identify the different _users_ in our application
  """
  @behaviour Plug

  def init(opts), do: opts

  def call(conn, _) do
    session_token =
      conn
      |> Plug.Conn.get_req_header("x-session-token")
      |> List.first()

    Absinthe.Plug.put_options(conn, context: %{session_token: session_token})
  end
end
