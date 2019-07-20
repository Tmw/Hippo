import React, { useCallback } from "react";
import { Pane } from "evergreen-ui";

import Card from "components/Card/Card";
import Header from "components/Lane/Header";
import Wrapper from "components/Lane/Wrapper";
import HeaderMenu from "components/Lane/HeaderMenu";
import { AddCard, useAddCardState } from "components/Lane/AddCard";

const Lane = ({ data: { id, title, cards }, onLaneEdit, onLaneDelete }) => {
  const { isVisible, toggleVisibility, hide } = useAddCardState(false);

  // manage lane itself
  const handleDeleteLaneClicked = useCallback(() => {
    onLaneDelete(id);
  }, [id, onLaneDelete]);

  const handleEditLaneClicked = useCallback(() => {
    onLaneEdit(id);
  }, [id, onLaneEdit]);

  // callback from card-children
  const handleCardDeleteClicked = useCallback(cardId => {
    console.log("Handling delete card with id:", cardId);
  }, []);

  const handleCardEditClicked = useCallback(cardId => {
    console.log("Handling edit card with id:", cardId);
  }, []);

  return (
    <Wrapper>
      <Header title={title}>
        <HeaderMenu
          onDeleteClick={handleDeleteLaneClicked}
          onEditClick={handleEditLaneClicked}
          onAddClick={toggleVisibility}
        />
      </Header>

      <AddCard
        isShown={isVisible}
        onCancel={hide}
        onSubmitted={hide}
        laneId={id}
      />

      <Pane paddingRight="20px" overflowY="scroll">
        {cards.map(card => (
          <Card
            data={card}
            key={card.id}
            onCardDelete={handleCardDeleteClicked}
            onCardEdit={handleCardEditClicked}
          />
        ))}
      </Pane>
    </Wrapper>
  );
};

export default Lane;
