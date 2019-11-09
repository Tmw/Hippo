defmodule Hippo.Repo do
  @moduledoc false
  use Ecto.Repo,
    otp_app: :hippo,
    adapter: Ecto.Adapters.Postgres
end
