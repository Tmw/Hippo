import React, { useCallback } from "react";
import { Pane } from "evergreen-ui";

import Card from "components/Card";
import Header from "components/Lane/Header";
import Wrapper from "components/Lane/Wrapper";
import HeaderMenu from "components/Lane/HeaderMenu";
import { AddCard, useAddCardState } from "components/Lane/AddCard";

const Lane = ({ data: { id, title, cards }, onLaneEdit, onLaneDelete }) => {
  const { isVisible, toggleVisibility, hide } = useAddCardState(false);

  const handleDeleteLaneClicked = useCallback(() => {
    onLaneDelete(id);
  }, [id, onLaneDelete]);

  const handleEditLaneClicked = useCallback(() => {
    onLaneEdit(id);
  }, [id, onLaneEdit]);

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
        {cards.map(c => (
          <Card data={c} key={c.id} />
        ))}
      </Pane>
    </Wrapper>
  );
};

export default Lane;
