defmodule HippoWeb.LaneView do
  use HippoWeb, :view

  alias HippoWeb.{
    LaneView,
    CardView
  }

  def render("index.json", %{lanes: lanes}) do
    %{data: render_many(lanes, LaneView, "lane.json")}
  end

  def render("show.json", %{lane: lane}) do
    %{data: render_one(lane, LaneView, "lane-with-cards.json")}
  end

  def render("create.json", %{lane: lane}) do
    %{data: render("lane.json", %{lane: lane})}
  end

  def render("lane.json", %{lane: lane}) do
    %{
      id: lane.id,
      name: lane.name,
      cards: []
    }
  end

  def render("lane-with-cards.json", %{lane: lane}) do
    render("lane.json", %{lane: lane})
    |> Map.merge(%{
      cards: render_many(lane.cards, CardView, "show.json")
    })
  end
end
