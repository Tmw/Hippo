defmodule Hippo.Repo.Migrations.CreateCards do
  use Ecto.Migration

  def change do
    create table(:cards, primary_key: false) do
      add :id, :uuid, primary_key: true
      add :title, :string
      add :description, :string, size: 500
      add :lane_id, references(:lanes, on_delete: :nothing, type: :uuid)

      timestamps()
    end

    create index(:cards, [:lane_id])
  end
end
