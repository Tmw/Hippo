defmodule Hippo.Release do
  @moduledoc false
  @repo Hippo.Repo
  alias Ecto.Migrator
  require Logger

  def migrate do
    :ok = Application.load(:hippo)
    Logger.info("Running Hippo.Release.migrate/0...")
    {:ok, _, _} = Migrator.with_repo(@repo, &Ecto.Migrator.run(&1, :up, all: true))
  end
end
