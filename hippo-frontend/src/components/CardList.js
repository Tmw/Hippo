import React, { useCallback } from "react";

import { Pane, toaster } from "evergreen-ui";
import { useMutation } from "react-apollo-hooks";
import { withRouter } from "react-router-dom";

import GET_PROJECT from "graphql/get_project_query";
import DELETE_CARD_MUTATION from "graphql/delete_card_mutation";

import Card from "components/Card/Card";
import {
  ConfirmAndMutate,
  useConfirmAndMutationState
} from "components/ConfirmAndMutate";

const CardList = ({ cards, match, history }) => {
  const {
    visible: dialogVisible,
    identifier: selectedCardId,
    showDialog,
    closeDialog
  } = useConfirmAndMutationState();

  // define the card deletion mutation
  const deleteCardMutation = useMutation(DELETE_CARD_MUTATION, {
    variables: { cardId: selectedCardId },
    refetchQueries: [
      { query: GET_PROJECT, variables: { id: match.params.projectId } }
    ]
  });

  const handleCardDeleteClicked = useCallback(cardId => showDialog(cardId), [
    showDialog
  ]);

  const handleCardEditClicked = useCallback(
    cardId => {
      const { projectId } = match.params;
      history.push(`/projects/${projectId}/cards/${cardId}/edit`);
    },
    [history, match.params]
  );

  const onCardDeletionError = useCallback(() => {
    toaster.danger("Error deleting card.. Please try again");
  }, []);

  const onCardDeletionSuccess = useCallback(() => {
    toaster.success("Card succesfully deleted", { duration: 2 });
  }, []);

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

      <ConfirmAndMutate
        mutation={deleteCardMutation}
        title="Are you sure?"
        description="Are you sure you want to delete this card?"
        isVisible={dialogVisible}
        closeDialog={closeDialog}
        onError={onCardDeletionError}
        onSuccess={onCardDeletionSuccess}
      />
    </React.Fragment>
  );
};

export default withRouter(CardList);
