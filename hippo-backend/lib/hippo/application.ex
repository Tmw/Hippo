defmodule Hippo.Application do
  @moduledoc false
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications

  use Application

  def start(_type, _args) do
    # List all child processes to be supervised
    children = [
      # Start the Ecto repository
      Hippo.Repo,
      # Start the endpoint when the application starts
      HippoWeb.Endpoint,
      {Absinthe.Subscription, [HippoWeb.Endpoint]}
      # Starts a worker by calling: Hippo.Worker.start_link(arg)
      # {Hippo.Worker, arg},
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Hippo.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    HippoWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
