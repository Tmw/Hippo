defmodule Hippo.Grapql.CardsMutationsTest do
  use HippoWeb.GraphqlCase
  import Hippo.Test.Factory

  alias Hippo.Repo
  alias Hippo.Cards.Card

  setup %{conn: conn} do
    project = insert(:project)
    lane = insert(:lane, project: project)
    card = insert(:card, lane: lane)

    {:ok,
     %{
       conn: conn,
       lane: lane,
       card: card
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
end
