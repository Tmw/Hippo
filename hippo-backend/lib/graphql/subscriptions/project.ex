defmodule Hippo.GraphQL.Subscriptions.Project do
  use Absinthe.Schema.Notation

  object :project_subscriptions do
    @desc """
    subscribe to updates for all projects without their contents.
    eg; project updated or project created
    """
    field :projects_updates, :projects_event do
      config(fn _, _ ->
        {:ok, topic: "projects:all"}
      end)
    end

    @desc """
    subscribe to events from a single given project. Things like lane or card events.
    """
    field :project_updates, :project_events do
      arg(:project_id, :identifier)

      config(fn args, _ ->
        {:ok, topic: "projects:#{args[:project_id]}"}
      end)
    end
  end
end
