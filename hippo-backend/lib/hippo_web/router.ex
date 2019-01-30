defmodule HippoWeb.Router do
  use HippoWeb, :router

  pipeline :api do
    plug :accepts, ["json"]

    plug Plug.Parsers,
      parsers: [:urlencoded, :multipart, :json],
      json_decoder: Jason
  end

  scope "/api", HippoWeb do
    pipe_through :api

    resources "/projects", ProjectController, except: [:new, :edit] do
      resources "/lanes", LaneController, only: [:create]
    end

    resources "/lanes", LaneController, only: [:update, :delete, :show] do
      resources "/cards", CardController, only: [:create]
    end

    resources "/cards", CardController, only: [:update, :delete, :show]
  end

  scope "/" do
    pipe_through :api

    forward "/graphql", Absinthe.Plug,
      schema: HippoWeb.Schema,
      json_codec: Jason

    forward "/graphiql", Absinthe.Plug.GraphiQL,
      schema: HippoWeb.Schema,
      interface: :playground,
      json_codec: Jason
  end
end
