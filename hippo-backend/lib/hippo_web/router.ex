defmodule HippoWeb.Router do
  @moduledoc false
  use HippoWeb, :router

  pipeline :api do
    plug(:accepts, ["json"])

    plug(Hippo.GraphQL.SessionPlug)

    plug(Plug.Parsers,
      parsers: [:urlencoded, :multipart, :json],
      json_decoder: Jason
    )
  end

  scope "/api" do
    pipe_through(:api)

    forward("/graphql", Absinthe.Plug,
      schema: Hippo.GraphQL.Schema,
      json_codec: Jason
    )

    forward("/graphiql", Absinthe.Plug.GraphiQL,
      schema: Hippo.GraphQL.Schema,
      interface: :playground,
      json_codec: Jason,
      socket_url: "ws://localhost:4000/socket"
    )
  end

  scope "/" do
    forward("/", HippoWeb.Plugs.Frontend)
  end
end
