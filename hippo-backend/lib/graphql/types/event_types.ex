defmodule Hippo.GraphQL.Types.Event do
  use Absinthe.Schema.Notation
  alias Hippo.GraphQL.Events

  object :project_created_event do
    field(:payload, :project)
  end

  object :project_updated_event do
    field(:payload, :project)
  end

  object :project_deleted_event do
    field(:project_id, :identifier)
  end

  union :projects_event do
    types([:project_created_event, :project_updated_event, :project_deleted_event])

    resolve_type(fn
      %Events.Project.Updated{}, _ -> :project_updated_event
      %Events.Project.Created{}, _ -> :project_created_event
      %Events.Project.Deleted{}, _ -> :project_deleted_event
    end)
  end
end
