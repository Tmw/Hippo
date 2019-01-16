defmodule HippoWeb.CardControllerTest do
  use HippoWeb.ConnCase

  alias Hippo.Projects
  alias Hippo.Projects.Card

  @create_attrs %{
    content: "some content"
  }
  @update_attrs %{
    content: "some updated content"
  }
  @invalid_attrs %{content: nil}

  def fixture(:card) do
    {:ok, card} = Projects.create_card(@create_attrs)
    card
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all cards", %{conn: conn} do
      conn = get(conn, Routes.card_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create card" do
    test "renders card when data is valid", %{conn: conn} do
      conn = post(conn, Routes.card_path(conn, :create), card: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.card_path(conn, :show, id))

      assert %{
               "id" => id,
               "content" => "some content"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.card_path(conn, :create), card: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update card" do
    setup [:create_card]

    test "renders card when data is valid", %{conn: conn, card: %Card{id: id} = card} do
      conn = put(conn, Routes.card_path(conn, :update, card), card: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.card_path(conn, :show, id))

      assert %{
               "id" => id,
               "content" => "some updated content"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, card: card} do
      conn = put(conn, Routes.card_path(conn, :update, card), card: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete card" do
    setup [:create_card]

    test "deletes chosen card", %{conn: conn, card: card} do
      conn = delete(conn, Routes.card_path(conn, :delete, card))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.card_path(conn, :show, card))
      end
    end
  end

  defp create_card(_) do
    card = fixture(:card)
    {:ok, card: card}
  end
end
