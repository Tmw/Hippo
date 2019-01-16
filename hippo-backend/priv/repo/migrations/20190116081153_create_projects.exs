defmodule Hippo.Repo.Migrations.CreateProjects do
  use Ecto.Migration

  def change do
    create table(:projects) do
      add :name, :string

      timestamps()
    end

  end
end
