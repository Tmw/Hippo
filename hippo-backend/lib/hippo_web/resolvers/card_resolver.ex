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
      {:error, changeset} -> {:error, "Something blew up"}
    end
  end
end
