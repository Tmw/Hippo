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
      {0, _} -> {:ok, %{success: false, message: "no cards deleted"}}
      _ -> {:ok, %{success: true, message: "card deleted"}}
    end
  end
end
