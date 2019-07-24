import React, { useCallback } from "react";

import CardList from "components/CardList";
import Header from "components/Lane/Header";
import Wrapper from "components/Lane/Wrapper";
import HeaderMenu from "components/Lane/HeaderMenu";

import { Draggable } from "react-beautiful-dnd";
import { AddCard, useAddCardState } from "components/Lane/AddCard";

const Lane = ({
  data: { id, title, cards },
  index,
  onLaneEdit,
  onLaneDelete
}) => {
  const { isVisible, toggleVisibility, hide } = useAddCardState(false);

  const handleDeleteLaneClicked = useCallback(() => {
    onLaneDelete(id);
  }, [id, onLaneDelete]);

  const handleEditLaneClicked = useCallback(() => {
    onLaneEdit(id);
  }, [id, onLaneEdit]);

  return (
    <Draggable index={index} draggableId={`lane:${id}`}>
      {provided => (
        <Wrapper innerRef={provided.innerRef} {...provided.draggableProps}>
          <Header title={title} {...provided.dragHandleProps}>
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

          <CardList cards={cards} laneId={id} />
        </Wrapper>
      )}
    </Draggable>
  );
};

export default Lane;
