defmodule Hippo.Repo.Migrations.CreateLanes do
  use Ecto.Migration

  def change do
    create table(:lanes, primary_key: false) do
      add :id, :binary_id, null: false, primary_key: true
      add :rank, :integer
      add :title, :string
      add :description, :string, size: 500
      add :project_id, references(:projects, on_delete: :nothing, type: :binary_id)

      timestamps()
    end

    create index(:lanes, [:project_id])
  end
end
