defmodule HippoWeb.Endpoint do
  @moduledoc false
  use Phoenix.Endpoint, otp_app: :hippo
  use Absinthe.Phoenix.Endpoint

  socket("/api/socket", HippoWeb.UserSocket,
    websocket: true,
    longpoll: false
  )

  # Serve at "/" the static files from "priv/static" directory.
  #
  # You should set gzip to true if you are running phx.digest
  # when deploying your static files in production.
  plug(Plug.Static,
    at: "/",
    from: :hippo,
    gzip: false,
    only: ~w(static manifest.json fonts images favicon.ico robots.txt)
  )

  # Code reloading can be explicitly enabled under the
  # :code_reloader configuration of your endpoint.
  if code_reloading? do
    plug(Phoenix.CodeReloader)
  end

  plug(Plug.RequestId)
  plug(Plug.Logger)

  plug(Plug.Parsers,
    parsers: [:urlencoded, :multipart, :json],
    pass: ["*/*"],
    json_decoder: Phoenix.json_library()
  )

  plug(Plug.MethodOverride)
  plug(Plug.Head)

  # The session will be stored in the cookie and signed,
  # this means its contents can be read but not tampered with.
  # Set :encryption_salt if you would also like to encrypt it.
  plug(Plug.Session,
    store: :cookie,
    key: "_hippo_key",
    signing_salt: "tje+4uIv"
  )

  plug(
    Corsica,
    origins: "*",
    allow_headers: :all,
    log: [rejected: :warn, invalid: :debug, accepted: :debug]
  )

  plug(HippoWeb.Router)
end
