defmodule HippoWeb.Plugs.Frontend do
  @moduledoc """
  This module serves the front-end application from the priv/static folder without
  breaking the front-end routing
  """
  @behaviour Plug
  import Plug.Conn

  def init(opts), do: opts

  def call(conn, _opts), do: send_file(conn, 200, front_end_index_path())

  defp front_end_index_path do
    Application.app_dir(:hippo, "priv/static/index.html")
  end
end
