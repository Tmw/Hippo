defmodule Hippo.Repo.Migrations.CreateCards do
  use Ecto.Migration

  def change do
    create table(:cards, primary_key: false) do
      add :id, :binary_id, null: false, primary_key: true
      add :rank, :integer
      add :title, :string
      add :description, :string, size: 500
      add :lane_id, references(:lanes, on_delete: :nothing, type: :binary_id)

      timestamps()
    end

    create index(:cards, [:lane_id])
  end
end
