defmodule Hippo.Test.Factory do
  @moduledoc false
  use ExMachina.Ecto, repo: Hippo.Repo

  alias Hippo.Cards.Card
  alias Hippo.Lanes.Lane
  alias Hippo.Projects.Project

  def project_factory do
    %Project{
      title: sequence(:project_title, &"project title #{&1}"),
      description: sequence(:project_description, &"project description #{&1}")
    }
  end

  def lane_factory do
    %Lane{
      title: sequence(:lane_title, &"lane title #{&1}"),
      description: sequence(:lane_description, &"lane description #{&1}")
    }
  end

  def card_factory do
    %Card{
      title: sequence(:card_title, &"card title #{&1}"),
      description: sequence(:card_description, &"card description #{&1}")
    }
  end
end
