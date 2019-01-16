defmodule Hippo.Repo.Migrations.CreateLanes do
  use Ecto.Migration

  def change do
    create table(:lanes) do
      add :name, :string
      add :project_id, references(:projects, on_delete: :nothing)

      timestamps()
    end

    create index(:lanes, [:project_id])
  end
end
