# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Hippo.Repo.insert!(%Hippo.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias Hippo.{
  Lanes.Lane,
  Projects.Project,
  Cards.Card
}

alias Hippo.Repo

require Ecto.Query

defmodule Truncater do
  def truncate(tables) when is_list(tables) do
    tables
    |> Enum.map(&Atom.to_string/1)
    |> Enum.flat_map(&to_queries/1)
    |> Enum.each(&Repo.query/1)
  end

  defp to_queries(table_name) do
    [
      "TRUNCATE TABLE #{table_name} CASCADE",
      "ALTER SEQUENCE #{table_name}_id_seq RESTART WITH 1"
    ]
  end
end

Truncater.truncate([:projects, :lanes, :cards])

tree = %Project{
  name: "First Project",
  description: "This is the first proejct in the list. It does Projecty things",
  lanes: [
    %Lane{
      name: "To-Do",
      description: "This lane contains all cards that have the state To-Do",
      cards: [
        %Card{
          content: "Move these",
          description: "Some arbitrary description of the first card",
        },
        %Card{
          content: "Cards to the",
          description: "Some arbitrary description of the secon dcard",
        },
        %Card{
          content: "Done Lane",
          description: "Some arbitrary description of the third card",
        }
      ]
    },
    %Lane{
      name: "Doing",
      description: "This lane contains all cards that have the state Doing"
    },
    %Lane{
      name: "Done",
      description: "This lane contains all cards that have the state Done"
    }
  ]
}

Repo.insert!(tree)
