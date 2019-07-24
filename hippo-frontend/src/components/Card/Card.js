import React, { useCallback } from "react";
import { Pane, Heading, Paragraph } from "evergreen-ui";
import { Draggable } from "react-beautiful-dnd";
import CardMenu from "./CardMenu";

const Card = ({
  data: { id, title, description },
  index,
  onCardDelete,
  onCardEdit
}) => {
  const handleEdit = useCallback(() => {
    onCardEdit(id);
  }, [id, onCardEdit]);

  const handleDelete = useCallback(() => {
    onCardDelete(id);
  }, [id, onCardDelete]);

  return (
    <Draggable index={index} draggableId={`card:${id}`}>
      {provided => (
        <Pane
          width="100%"
          minHeight="150px"
          borderRadius="5px"
          marginBottom="15px"
          background="white"
          elevation={1}
          padding="15px"
          innerRef={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Pane display="flex" marginBottom={10} alignItems="center">
            <Heading size={500} align="left" flexGrow={1} marginBottom="10px">
              {title}
            </Heading>

            <CardMenu onDeleteClick={handleDelete} onEditClick={handleEdit} />
          </Pane>

          <Paragraph align="left">{description}</Paragraph>
        </Pane>
      )}
    </Draggable>
  );
};

export default Card;
