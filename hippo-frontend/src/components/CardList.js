import React, { useCallback, useState } from "react";

import { Dialog, Pane, toaster } from "evergreen-ui";
import { useMutation } from "react-apollo-hooks";
import { withRouter } from "react-router-dom";

import GET_PROJECT from "graphql/get_project_query";
import DELETE_CARD_MUTATION from "graphql/delete_card_mutation";

import Card from "components/Card/Card";

const CardList = ({ cards, match, history }) => {
  const [isDeleteDialogVisible, setDeletionDialogVisible] = useState(false);
  const [isCardDeleting, setCardDeleting] = useState(false);
  const [selectedCardIdentifier, setSelectedCardIdentifier] = useState(null);

  // define the card deletion mutation
  const deleteCard = useMutation(DELETE_CARD_MUTATION, {
    variables: { cardId: selectedCardIdentifier },
    refetchQueries: [
      { query: GET_PROJECT, variables: { id: match.params.projectId } }
    ]
  });

  // perform the actual lane deletion mutation
  const handleDeleteCard = useCallback(() => {
    setCardDeleting(true);

    deleteCard()
      .then(() => {
        setCardDeleting(false);
        setSelectedCardIdentifier(null);
        setDeletionDialogVisible(false);
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
    setDeletionDialogVisible(true);
  }, []);

  const handleCardEditClicked = useCallback(
    cardId => {
      const { projectId } = match.params;
      history.push(`/projects/${projectId}/cards/${cardId}/edit`);
    },
    [history, match.params]
  );

  return (
    <React.Fragment>
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
        isShown={isDeleteDialogVisible}
        title="Are you sure?"
        intent="danger"
        onCloseComplete={() => setDeletionDialogVisible(false)}
        onConfirm={handleDeleteCard}
        isConfirmLoading={isCardDeleting}
        confirmLabel="Delete Card"
      >
        Are you sure you want to delete this card?
      </Dialog>
    </React.Fragment>
  );
};

export default withRouter(CardList);
