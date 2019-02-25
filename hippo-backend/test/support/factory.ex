defmodule Hippo.Test.Factory do
  use ExMachina.Ecto, repo: Hippo.Repo

  alias Hippo.Projects.Project
  alias Hippo.Lanes.Lane
  alias Hippo.Cards.Card

  def project_factory() do
    %Project{
      title: sequence(:project_title, &"project title #{&1}"),
      description: sequence(:project_description, &"project description #{&1}")
    }
  end

  def project_with_lanes_and_cards_factory() do
    %Project{
      title: sequence(:project_title, &"project title #{&1}"),
      description: sequence(:project_description, &"project description #{&1}"),
      lanes: build_list(3, :lane_with_cards)
    }
  end

  def lane_with_cards_factory() do
    %Lane{
      title: sequence(:lane_title, &"lane title #{&1}"),
      description: sequence(:lane_description, &"lane description #{&1}"),
      cards: build_list(3, :card)
    }
  end

  def lane_factory() do
    %Lane{
      title: sequence(:lane_title, &"lane title #{&1}"),
      description: sequence(:lane_description, &"lane description #{&1}")
    }
  end

  def card_factory() do
    %Card{
      title: sequence(:card_title, &"card title #{&1}"),
      description: sequence(:card_description, &"card description #{&1}")
    }
  end
end
