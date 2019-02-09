defmodule HippoWeb.Router do
  use HippoWeb, :router

  pipeline :api do
    plug :accepts, ["json"]

    plug Plug.Parsers,
      parsers: [:urlencoded, :multipart, :json],
      json_decoder: Jason
  end

  scope "/" do
    pipe_through :api

    forward "/graphql", Absinthe.Plug,
      schema: Hippo.GraphQL.Schema,
      json_codec: Jason

    forward "/graphiql", Absinthe.Plug.GraphiQL,
      schema: Hippo.GraphQL.Schema,
      interface: :playground,
      json_codec: Jason
  end
end
