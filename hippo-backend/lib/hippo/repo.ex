defmodule Hippo.Repo do
  use Ecto.Repo,
    otp_app: :hippo,
    adapter: Ecto.Adapters.Postgres
end
