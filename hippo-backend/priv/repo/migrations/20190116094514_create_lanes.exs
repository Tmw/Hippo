defmodule Hippo.Repo.Migrations.CreateLanes do
  use Ecto.Migration

  def change do
    create table(:lanes, primary_key: false) do
      add :id, :uuid, primary_key: true
      add :name, :string
      add :project_id, references(:projects, on_delete: :nothing, type: :uuid)

      timestamps()
    end

    create index(:lanes, [:project_id])
  end
end
