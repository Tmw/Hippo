defmodule HippoWeb.LaneView do
  use HippoWeb, :view
  alias HippoWeb.LaneView

  def render("index.json", %{lanes: lanes}) do
    %{data: render_many(lanes, LaneView, "lane.json")}
  end

  def render("show.json", %{lane: lane}) do
    %{data: render_one(lane, LaneView, "lane.json")}
  end

  def render("lane.json", %{lane: lane}) do
    %{id: lane.id,
      name: lane.name}
  end
end
