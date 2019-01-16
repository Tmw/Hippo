defmodule HippoWeb.Router do
  use HippoWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", HippoWeb do
    pipe_through :api

    resources "/projects", ProjectController, except: [:new, :edit] do
      resources "/lanes", LaneController, except: [:new, :edit] do
        resources "/cards", CardController, except: [:new, :edit]
      end
    end
  end
end
