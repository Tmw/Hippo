import React, { useCallback, useState } from "react";
import { Dialog, TextInputField, Label, Textarea, toaster } from "evergreen-ui";
import { Formik, Form } from "formik";
import { useMutation } from "react-apollo-hooks";

import { propOr } from "ramda";

import { useQuery } from "react-apollo-hooks";
import GET_CARD from "graphql/get_card_query";

import UPDATE_CARD_MUTATION from "graphql/update_card_mutation";
import GET_PROJECT_QUERY from "graphql/get_project_query";
import FormikField from "components/FormikField";

const EditCard = ({ history, match: { params } }) => {
  const { projectId, cardId } = params;

  const handleClose = useCallback(() => history.goBack(), [history]);
  const [dialogVisible, setDialogVisible] = useState(true);
  const [mutationLoading, setMutationLoading] = useState(false);

  const updateCard = useMutation(UPDATE_CARD_MUTATION, {
    refetchQueries: [{ query: GET_PROJECT_QUERY, variables: { id: projectId } }]
  });

  // handle the submission of the form. Firing the actual mutation and showing a toast
  // indicating success or failure.
  const handleSubmit = useCallback(
    card => {
      setMutationLoading(true);
      updateCard({ variables: { cardId, card } })
        .then(() => {
          toaster.success("Card succesfully updated", { duration: 2 });
          setDialogVisible(false);
          setMutationLoading(false);
        })
        .catch(error => {
          console.error(error);
          setMutationLoading(false);
          toaster.danger("Error updating card.. Please try again");
        });
    },
    [cardId, updateCard]
  );

  // fetch the initial data from cache only. Look at cache-redirection in the Apollo Client.
  const { data } = useQuery(GET_CARD, {
    variables: { id: cardId },
    fetchPolicy: "cache-only"
  });

  // initialize the form with initial values. Because we're exclusively reading from cache,
  // the info might not yet be available in our cache. Unfortunately this isn't protected by
  // a loading state, thus we should prefill the values with an empty string.
  const initialValues = {
    title: propOr("", "title", data.card),
    description: propOr("", "description", data.card)
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      enableReinitialize
    >
      {({ submitForm }) => (
        <Dialog
          isShown={dialogVisible}
          title="Edit Card"
          onCloseComplete={handleClose}
          confirmLabel="Save"
          isConfirmLoading={mutationLoading}
          onConfirm={submitForm}
        >
          <Form>
            <FormikField
              component={TextInputField}
              name="title"
              label="Card Title"
              placeholder="Card Title"
              tabIndex={0}
              required
            />

            <Label htmlFor="description" marginBottom={4} display="block">
              Card Description
            </Label>

            <FormikField
              component={Textarea}
              name="description"
              onCtrlEnter={submitForm}
              placeholder="Card Description"
            />
          </Form>
        </Dialog>
      )}
    </Formik>
  );
};

export default EditCard;
