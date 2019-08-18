defmodule Hippo.GraphQL.Types.Event do
  use Absinthe.Schema.Notation
  alias Hippo.GraphQL.Events

  object :project_created_event do
    field(:project, :project)
  end

  object :project_updated_event do
    field(:project, :project)
  end

  object :project_deleted_event do
    field(:project_id, :identifier)
  end

  union :projects_event do
    @desc "Events for higher level events that concern projects. Eg; Project created, removed or updated."
    types([:project_created_event, :project_updated_event, :project_deleted_event])

    resolve_type(fn
      %Events.Project.Updated{}, _ -> :project_updated_event
      %Events.Project.Created{}, _ -> :project_created_event
      %Events.Project.Deleted{}, _ -> :project_deleted_event
    end)
  end

  object :lane_created_event do
    field(:lane, :lane)
  end

  object :lane_updated_event do
    field(:lane, :lane)
  end

  object :lane_deleted_event do
    field(:lane_id, :identifier)
  end

  object :lane_repositioned_event do
    field(:lane_id, :identifier)
    field(:position, :integer)
  end

  object :card_created_event do
    field(:card, :card)
    field(:lane_id, :identifier)
  end

  object :card_updated_event do
    field(:card, :card)
  end

  object :card_deleted_event do
    field(:card_id, :identifier)
    field(:lane_id, :identifier)
  end

  object :card_repositioned_event do
    field(:card_id, :identifier)
    field(:source_lane_id, :identifier)
    field(:target_lane_id, :identifier)
    field(:position, :integer)
  end

  union :project_events do
    @desc "Events for a given projects. Eg; updates to lanes or cards within a project"

    types([
      :lane_created_event,
      :lane_updated_event,
      :lane_deleted_event,
      :lane_repositioned_event,
      :card_created_event,
      :card_updated_event,
      :card_deleted_event,
      :card_repositioned_event
    ])

    resolve_type(fn
      %Events.Lane.Created{}, _ -> :lane_created_event
      %Events.Lane.Updated{}, _ -> :lane_updated_event
      %Events.Lane.Deleted{}, _ -> :lane_deleted_event
      %Events.Lane.Repositioned{}, _ -> :lane_repositioned_event
      %Events.Card.Created{}, _ -> :card_created_event
      %Events.Card.Updated{}, _ -> :card_updated_event
      %Events.Card.Deleted{}, _ -> :card_deleted_event
      %Events.Card.Repositioned{}, _ -> :card_repositioned_event
    end)
  end
end
