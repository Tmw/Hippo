defmodule Hippo.GraphQL.Resolvers.Card do
  @moduledoc false
  alias Hippo.{
    Cards,
    Cards.Card,
    GraphQL.Events,
    Session
  }

  def create(%{card: params, lane_id: lane_id}, ctx) do
    with {:ok, card} <- Cards.create_card(params, for_lane: lane_id),
         project_id <- Cards.owning_project_id(card),
         :ok <-
           publish(project_id, %Events.Card.Created{
             session_token: Session.from_absinthe_context(ctx),
             card: card,
             lane_id: lane_id
           }) do
      {:ok, card: card}
    end
  end

  def update(%{card: params, card_id: card_id}, ctx) do
    with {:card, %Card{} = card} <- {:card, Cards.get_card(card_id)},
         {:ok, card} <- Cards.update_card(card, params),
         project_id <- Cards.owning_project_id(card),
         :ok <-
           publish(project_id, %Events.Card.Updated{
             session_token: Session.from_absinthe_context(ctx),
             card: card
           }) do
      {:ok, card: card}
    else
      {:error, error} -> {:error, error}
      {:card, nil} -> {:error, "card not found"}
    end
  end

  def delete(%{card_id: card_id}, ctx) do
    with %Card{} = card <- Cards.get_card(card_id),
         project_id <- Cards.owning_project_id(card),
         {:ok, _} <- Cards.delete_card_by_id(card_id),
         :ok <-
           publish(project_id, %Events.Card.Deleted{
             session_token: Session.from_absinthe_context(ctx),
             card_id: card.id,
             lane_id: card.lane_id
           }) do
      {:ok, %{success: true, message: "card deleted"}}
    else
      nil -> {:error, "card not found"}
      {:error, error} -> {:error, error}
    end
  end

  def reposition(%{card_id: card_id, lane_id: lane_id, position: position}, ctx) do
    with %Card{lane_id: source_lane_id} <- Cards.get_card(card_id),
         {:ok, card} <- Cards.reposition_card(card_id, lane_id, position),
         project_id <- Cards.owning_project_id(card_id),
         :ok <-
           publish(project_id, %Events.Card.Repositioned{
             session_token: Session.from_absinthe_context(ctx),
             card_id: card.id,
             source_lane_id: source_lane_id,
             target_lane_id: lane_id,
             position: position
           }) do
      {:ok, card: card}
    else
      nil ->
        {:error, "card not found"}

      {:error, error} ->
        {:error, message: error}
    end
  end

  defp publish(project_id, event) when is_binary(project_id) do
    Events.publish(:project_updates, "projects:#{project_id}", %{payload: event})
  end
end
