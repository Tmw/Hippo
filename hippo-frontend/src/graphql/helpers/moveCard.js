import { reject, insert, move } from "ramda";
import GET_LANE_WITH_CARDS_QUERY from "graphql/get_lane_with_cards_query";

const getLane = (store, id) =>
  store.readQuery({
    query: GET_LANE_WITH_CARDS_QUERY,
    variables: { id: id }
  });

const storeLane = (store, lane) =>
  store.writeQuery({
    query: GET_LANE_WITH_CARDS_QUERY,
    data: { lane }
  });

const setLaneCards = (lane, cards) => ({ ...lane, cards });

const moveCard = (
  store,
  sourceLaneId,
  sourceIndex,
  destinationLaneId,
  destinationIndex,
  cardId
) => {
  if (sourceLaneId === destinationLaneId) {
    // moving within the same lane
    const { lane } = getLane(store, sourceLaneId);

    // set the updated cards
    const updatedLane = setLaneCards(
      lane,
      move(sourceIndex, destinationIndex, lane.cards)
    );

    // store lane as a whole
    storeLane(store, updatedLane);
  } else {
    // moving a card across lanes
    const { lane: originLane } = getLane(store, sourceLaneId);
    const { lane: targetLane } = getLane(store, destinationLaneId);

    // then grab the card that we're interrested in from the original lane.
    const card = originLane.cards.find(card => card.id === cardId);

    // add the card to the targetLane on the new position
    const updatedTargetLane = setLaneCards(
      targetLane,
      insert(destinationIndex, card, targetLane.cards)
    );

    // update the original by dropping the card from the list
    const updatedOriginLane = setLaneCards(
      originLane,
      reject(card => card.id === cardId, originLane.cards)
    );

    storeLane(store, updatedOriginLane);
    storeLane(store, updatedTargetLane);
  }
};

export default moveCard;
