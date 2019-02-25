ExUnit.start(exclude: [:skip])
Ecto.Adapters.SQL.Sandbox.mode(Hippo.Repo, :manual)
{:ok, _} = Application.ensure_all_started(:ex_machina)
