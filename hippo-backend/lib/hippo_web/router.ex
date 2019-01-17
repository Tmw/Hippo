defmodule HippoWeb.Router do
  use HippoWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", HippoWeb do
    pipe_through :api

    resources "/projects", ProjectController, except: [:new, :edit] do
      resources "/lanes", LaneController, only: [:create]
    end

    resources "/lanes", LaneController, only: [:update, :delete, :show] do
      resources "/cards", CardController, only: [:create]
    end

    resources "/cards", CardController, only: [:update, :delete]
  end
end
