defmodule Hippo.Repo.Migrations.CreateCards do
  use Ecto.Migration

  def change do
    create table(:cards) do
      add :content, :string
      add :lane_id, references(:lanes, on_delete: :nothing)

      timestamps()
    end

    create index(:cards, [:lane_id])
  end
end
