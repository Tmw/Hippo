defmodule HippoWeb.Resolvers.Card do
  alias Hippo.Cards

  # def data() do
  #   Dataloader.Ecto.new(Hippo.Repo, query: &query/2)
  # end

  # def query(queryable, _params) do
  #   queryable
  # end

  def create(%{card: params, lane_id: lane_id}, _) do
    case Cards.create_card(params, for_lane: lane_id) do
      {:ok, _} = result -> result
      {:error, _} -> {:error, "Something blew up"}
    end
  end

  def update(%{card: params, card_id: card_id}, _) do
    Cards.get_card!(card_id) |> Cards.update_card(params)
  end

  def delete(%{card_id: card_id}, _ctx) do
    case Cards.delete_card_by_id(card_id) do
      {0, _} -> {:ok, %{success: false, message: "no cards deleted"}}
      _ -> {:ok, %{success: true, message: "card deleted"}}
    end
  end
end
