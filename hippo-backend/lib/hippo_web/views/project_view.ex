defmodule HippoWeb.ProjectView do
  use HippoWeb, :view
  alias HippoWeb.{
    ProjectView,
    LaneView
  }

  def render("index.json", %{projects: projects}) do
    %{
      data: render_many(projects, ProjectView, "project.json")
    }
  end

  def render("show.json", %{project: project}) do
    %{
      data: render_one(project, ProjectView, "project.json")
    }
  end

  def render("show-with-details.json", %{project: project}) do
    %{
      data: render_one(project, ProjectView, "project-with-detail.json")
    }
  end

  def render("project.json", %{project: project}) do
    %{
      id: project.id,
      name: project.name
    }
  end

  def render("project-with-detail.json", %{project: project}) do
    %{
      id: project.id,
      name: project.name,
      lanes: render_many(project.lanes, LaneView, "show.json")
    }
  end
end
