import React, { useCallback } from "react";
import { Pane } from "evergreen-ui";
import { withRouter } from "react-router-dom";

import Card from "components/Card/Card";
import Header from "components/Lane/Header";
import Wrapper from "components/Lane/Wrapper";
import HeaderMenu from "components/Lane/HeaderMenu";
import { AddCard, useAddCardState } from "components/Lane/AddCard";

const Lane = ({
  data: { id, title, cards },
  onLaneEdit,
  onLaneDelete,
  history
}) => {
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

  const handleCardEditClicked = useCallback(
    cardId => {
      history.push(`${history.location.pathname}/cards/${cardId}/edit`);
    },
    [history]
  );

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

export default withRouter(Lane);
