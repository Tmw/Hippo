import React, { useState, useCallback } from "react";

import { Dialog } from "evergreen-ui";

const ConfirmAndMutate = ({
  mutation,
  title,
  description,
  confirmActionTitle,
  isVisible,
  closeDialog,
  onSuccess,
  onError
}) => {
  const [isInFlight, setInFlight] = useState(false);

  const onCloseCompleteHandler = useCallback(() => closeDialog(), [
    closeDialog
  ]);

  // perform the actual lane deletion mutation
  const executeMutation = useCallback(() => {
    setInFlight(true);

    mutation()
      .then(() => {
        setInFlight(false);
        closeDialog();
        onSuccess();
      })
      .catch(error => {
        setInFlight(false);
        onError(error);
        console.error(error);
      });
  }, [closeDialog, mutation, onError, onSuccess]);

  return (
    <Dialog
      isShown={isVisible}
      title={title}
      intent="danger"
      onCloseComplete={onCloseCompleteHandler}
      onConfirm={executeMutation}
      isConfirmLoading={isInFlight}
      confirmLabel={confirmActionTitle}
    >
      {description}
    </Dialog>
  );
};

const useConfirmAndMutationState = () => {
  const initialState = { visible: false, cardId: null };
  const [state, setState] = useState(initialState);

  const showDialog = identifier =>
    setState({ visible: true, identifier: identifier });

  const closeDialog = () => setState(initialState);

  return {
    visible: state.visible,
    identifier: state.identifier,
    showDialog,
    closeDialog
  };
};

export { ConfirmAndMutate, useConfirmAndMutationState };
