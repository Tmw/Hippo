import React, { useCallback, useState } from "react";
import { Dialog, Pane, toaster } from "evergreen-ui";
import { withRouter } from "react-router-dom";
import { useMutation } from "react-apollo-hooks";

import GET_PROJECT from "graphql/get_project_query";
import DELETE_CARD_MUTATION from "graphql/delete_card_mutation";

import Card from "components/Card/Card";
import Header from "components/Lane/Header";
import Wrapper from "components/Lane/Wrapper";
import HeaderMenu from "components/Lane/HeaderMenu";
import { AddCard, useAddCardState } from "components/Lane/AddCard";

const Lane = ({
  data: { id, title, cards },
  onLaneEdit,
  onLaneDelete,
  history,
  match
}) => {
  const { projectId } = match.params;
  const { isVisible, toggleVisibility, hide } = useAddCardState(false);

  // manage lane itself
  const handleDeleteLaneClicked = useCallback(() => {
    onLaneDelete(id);
  }, [id, onLaneDelete]);

  const handleEditLaneClicked = useCallback(() => {
    onLaneEdit(id);
  }, [id, onLaneEdit]);

  // callbacks from card-children

  const [isCardDeleteDialogVisible, setCardDeletionDialogVisible] = useState(
    false
  );
  const [isCardDeleting, setCardDeleting] = useState(false);
  const [selectedCardIdentifier, setSelectedCardIdentifier] = useState(null);

  // define the card deletion mutation
  const deleteCard = useMutation(DELETE_CARD_MUTATION, {
    variables: { cardId: selectedCardIdentifier },
    refetchQueries: [{ query: GET_PROJECT, variables: { id: projectId } }]
  });

  // perform the actual lane deletion mutation
  const handleDeleteCard = useCallback(() => {
    setCardDeleting(true);

    deleteCard()
      .then(() => {
        setCardDeleting(false);
        setSelectedCardIdentifier(null);
        setCardDeletionDialogVisible(false);
        toaster.success("Card succesfully deleted", { duration: 2 });
      })
      .catch(error => {
        setCardDeleting(false);
        console.error(error);
        toaster.danger("Error deleting card.. Please try again");
      });
  }, [deleteCard]);

  const handleCardDeleteClicked = useCallback(cardId => {
    setSelectedCardIdentifier(cardId);
    setCardDeletionDialogVisible(true);
  }, []);

  const handleCardEditClicked = useCallback(
    cardId => {
      const { projectId } = match.params;
      history.push(`/projects/${projectId}/cards/${cardId}/edit`);
    },
    [history, match.params]
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

      <Dialog
        isShown={isCardDeleteDialogVisible}
        title="Are you sure?"
        intent="danger"
        onCloseComplete={() => setCardDeletionDialogVisible(false)}
        onConfirm={handleDeleteCard}
        isConfirmLoading={isCardDeleting}
        confirmLabel="Delete Card"
      >
        Are you sure you want to delete this card?
      </Dialog>
    </Wrapper>
  );
};

export default withRouter(Lane);
