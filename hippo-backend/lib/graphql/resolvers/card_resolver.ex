defmodule Hippo.GraphQL.Resolvers.Card do
  alias Hippo.Cards

  def create(%{card: params, lane_id: lane_id}, _) do
    case Cards.create_card(params, for_lane: lane_id) do
      {:ok, _} = result -> result
      {:error, error} -> {:error, error}
    end
  end

  def update(%{card: params, card_id: card_id}, _) do
    case Cards.get_card(card_id) do
      nil -> {:error, "card not found"}
      card -> card |> Cards.update_card(params)
    end
  end

  def delete(%{card_id: card_id}, _ctx) do
    case Cards.delete_card_by_id(card_id) do
      {:ok, _} -> {:ok, %{success: true, message: "card deleted"}}
      {:error, error} -> {:error, message: error}
    end
  end

  def reposition(%{card_id: card_id, lane_id: lane_id, position: position}, _ctx) do
    case Cards.reposition_card(card_id, lane_id, position) do
      {:ok, card} ->
        {:ok, card}

      {:error, error} ->
        {:error, message: error}
    end
  end
end
