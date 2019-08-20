import { findIndex, move, insert, reject } from "ramda";
import GET_LANE_WITH_CARDS_QUERY from "graphql/get_lane_with_cards_query";

const getLane = (client, id) =>
  client.readQuery({
    query: GET_LANE_WITH_CARDS_QUERY,
    variables: { id }
  });

const persistUpdatedLane = (client, lane) =>
  client.writeQuery({
    query: GET_LANE_WITH_CARDS_QUERY,
    data: { lane }
  });

const createCard = (client, laneId, card) => {
  const { lane } = getLane(client, laneId);

  // early return if card was already in cache. This can happen when the real-time event
  // is delivered but we made the edit ourselves. This is a special case since we're not
  // relying on Apollo to refetch the query.
  if (lane.cards.find(existingCard => existingCard.id === card.id) !== null) {
    return;
  }

  const updatedLane = {
    ...lane,
    cards: [card, ...lane.cards]
  };

  persistUpdatedLane(client, updatedLane);
};

const deleteCard = (client, laneId, cardId) => {
  const { lane } = getLane(client, laneId);

  const updatedLane = {
    ...lane,
    cards: lane.cards.filter(card => card.id !== cardId)
  };

  persistUpdatedLane(client, updatedLane);
};

const repositionCardWithinSameLane = (
  client,
  sourceLaneId,
  cardId,
  position
) => {
  // moving within the same lane
  const { lane } = getLane(client, sourceLaneId);
  const sourceIndex = findIndex(card => card.id === cardId, lane.cards);

  // set the updated cards
  const updatedLane = {
    ...lane,
    cards: move(sourceIndex, position, lane.cards)
  };

  // store lane as a whole
  persistUpdatedLane(client, updatedLane);
};

const repositionCardBetweenLanes = (
  client,
  sourceLaneId,
  targetLaneId,
  cardId,
  position
) => {
  // moving a card across lanes
  const { lane: originLane } = getLane(client, sourceLaneId);
  const { lane: targetLane } = getLane(client, targetLaneId);

  // then grab the card that we're interrested in from the original lane.
  const card = originLane.cards.find(card => card.id === cardId);

  if (!card) return;

  // add the card to the targetLane on the new position
  const updatedTargetLane = {
    ...targetLane,
    cards: insert(position, card, targetLane.cards)
  };

  // update the original by dropping the card from the list
  const updatedOriginLane = {
    ...originLane,
    cards: reject(card => card.id === cardId, originLane.cards)
  };

  persistUpdatedLane(client, updatedOriginLane);
  persistUpdatedLane(client, updatedTargetLane);
};

const repositionCard = (
  client,
  cardId,
  sourceLaneId,
  targetLaneId,
  position
) => {
  sourceLaneId === targetLaneId
    ? repositionCardWithinSameLane(client, sourceLaneId, cardId, position)
    : repositionCardBetweenLanes(
        client,
        sourceLaneId,
        targetLaneId,
        cardId,
        position
      );
};

export default {
  createCard,
  deleteCard,
  repositionCard
};
