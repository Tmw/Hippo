defmodule Hippo.Grapql.CardsMutationsTest do
  use HippoWeb.GraphqlCase
  import Hippo.Test.Factory

  alias Hippo.Repo
  alias Hippo.Cards.Card

  import Ecto.Query

  setup %{conn: conn} do
    project = insert(:project)
    lanes = insert_list(2, :lane, project: project)

    lanes =
      lanes
      |> Enum.map(fn lane ->
        Map.put(lane, :cards, [
          insert(:card, lane: lane, rank: 0),
          insert(:card, lane: lane, rank: 1),
          insert(:card, lane: lane, rank: 2)
        ])
      end)

    cards =
      lanes
      |> Enum.at(0)
      |> Map.get(:cards)

    {:ok,
     %{
       conn: conn,
       lane: Enum.at(lanes, 0),
       lanes: lanes,
       card: Enum.at(cards, 0),
       cards: cards
     }}
  end

  describe "create_card_mutation" do
    @query """
      mutation CreateCard($laneId: identifier!, $card: CardCreateParams!) {
        createCard(laneId: $laneId, card: $card) {
          id
          title
          description
        }
      }
    """
    test "creates a card if params are OK", %{conn: conn, lane: lane} do
      card_params = params_for(:card)

      variables = %{
        "laneId" => lane.id,
        "card" => card_params
      }

      conn = conn |> gql(skeleton(@query, variables))

      response =
        json_response(conn, 200)
        |> Map.get("data")
        |> Map.get("createCard")

      card = Repo.get!(Card, response["id"])
      assert card |> Map.take(~w(title description)a) == card_params
    end

    test "responds with error if title is missing", %{conn: conn, lane: lane} do
      card_params = %{"description" => "title is required too"}

      variables = %{
        "laneId" => lane.id,
        "card" => card_params
      }

      conn = conn |> gql(skeleton(@query, variables))

      error =
        json_response(conn, 200)
        |> Map.get("errors")
        |> Enum.at(0)

      assert error["message"] =~ ~r/"card" has invalid value/
    end

    test "responds with error if lane is not found", %{conn: conn} do
      variables = %{
        "laneId" => Ecto.ULID.generate(),
        "card" => params_for(:card)
      }

      conn = conn |> gql(skeleton(@query, variables))

      error =
        json_response(conn, 200)
        |> Map.get("errors")
        |> Enum.at(0)

      assert error["message"] =~ "lane not found"
    end
  end

  describe "update_card_mutation" do
    @query """
      mutation UpdateCard($cardId: identifier!, $card: CardUpdateParams!){
        updateCard(cardId: $cardId, card: $card) {
          id
          title
          description
        }
      }
    """

    test "updates the card when paramms are OK", %{conn: conn, card: card} do
      card_params = params_for(:card)

      variables = %{
        "cardId" => card.id,
        "card" => card_params
      }

      conn = conn |> gql(skeleton(@query, variables))

      response =
        json_response(conn, 200)
        |> Map.get("data")
        |> Map.get("updateCard")

      persisted =
        Repo.get(Card, response["id"])
        |> Map.take(~w(title description)a)

      assert persisted == card_params
    end

    test "updates the card with only one param present", %{conn: conn, card: card} do
      variables = %{
        "cardId" => card.id,
        "card" => %{
          "description" => "updated description"
        }
      }

      conn = conn |> gql(skeleton(@query, variables))

      response =
        json_response(conn, 200)
        |> Map.get("data")
        |> Map.get("updateCard")

      persisted =
        Repo.get(Card, response["id"])
        |> Map.take(~w(title description)a)

      assert %{
               title: card.title,
               description: "updated description"
             } == persisted
    end

    test "returns error when card ID is invalid", %{conn: conn} do
      variables = %{
        "cardId" => Ecto.ULID.generate(),
        "card" => %{
          "description" => "updated description"
        }
      }

      conn = conn |> gql(skeleton(@query, variables))

      error =
        json_response(conn, 200)
        |> Map.get("errors")
        |> Enum.at(0)
        |> Map.get("message")

      assert error =~ "card not found"
    end
  end

  describe "delete_card_mutation" do
    @query """
      mutation DeleteCard($cardId: identifier!) {
        deleteCard(cardId: $cardId) {
          success
          message
        }
      }
    """

    test "deletes the card", %{conn: conn, card: card} do
      variables = %{"cardId" => card.id}
      conn = conn |> gql(skeleton(@query, variables))

      response =
        json_response(conn, 200)
        |> Map.get("data")
        |> Map.get("deleteCard")

      assert response["success"] == true
      assert Repo.get(Card, card.id) == nil
    end

    test "errors when card_id is invalid", %{conn: conn} do
      variables = %{"cardId" => Ecto.ULID.generate()}
      conn = conn |> gql(skeleton(@query, variables))

      error =
        json_response(conn, 200)
        |> Map.get("errors")
        |> Enum.at(0)

      assert error["message"] =~ "card not found"
    end
  end

  describe "reposition_card_mutation" do
    @query """
      mutation RepositionCard($cardId: identifier!, $laneId: identifier!, $position: Int!) {
        repositionCard(cardId: $cardId, laneId: $laneId, position: $position) {
          id
        }
      }
    """

    test "repositions the card within the same lane", %{conn: conn, cards: cards, lane: lane} do
      [first, second, third] = cards
      variables = %{cardId: second.id, laneId: lane.id, position: 3}
      conn |> gql(skeleton(@query, variables))

      actual =
        from(c in Card,
          where: c.lane_id == ^lane.id,
          order_by: [:rank],
          select: [:id]
        )
        |> Repo.all()
        |> Enum.map(&Map.get(&1, :id))

      expected =
        [first, third, second]
        |> Enum.map(&Map.get(&1, :id))

      assert actual == expected
    end

    test "move the card to another lane", %{conn: conn, lanes: [source_lane, target_lane]} do
      card = source_lane.cards |> Enum.at(0)

      # move the first card of the first lane to the third position in the last lane
      variables = %{cardId: card.id, laneId: target_lane.id, position: 3}
      conn |> gql(skeleton(@query, variables))

      # grab results from database, see what happened
      expected =
        target_lane.cards
        |> Enum.map(&Map.get(&1, :id))
        |> Kernel.++([card.id])

      actual =
        from(c in Card,
          where: c.lane_id == ^target_lane.id,
          order_by: [:rank],
          select: [:id]
        )
        |> Repo.all()
        |> Enum.map(&Map.get(&1, :id))

      assert actual == expected
    end

    test "errors when card is not found", %{conn: conn, lane: lane} do
      variables = %{cardId: Ecto.ULID.generate(), laneId: lane.id, position: 3}
      conn = conn |> gql(skeleton(@query, variables))

      error =
        json_response(conn, 200)
        |> Map.get("errors")
        |> Enum.at(0)

      assert error["message"] =~ "card not found"
    end

    test "errors when lane is not found", %{conn: conn, card: card} do
      variables = %{cardId: card.id, laneId: Ecto.ULID.generate(), position: 3}
      conn = conn |> gql(skeleton(@query, variables))

      error =
        json_response(conn, 200)
        |> Map.get("errors")
        |> Enum.at(0)

      assert error["message"] =~ "lane not found"
    end
  end
end
