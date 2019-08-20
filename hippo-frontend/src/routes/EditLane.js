import React, { useCallback, useState } from "react";
import { Dialog, TextInputField, Label, Textarea, toaster } from "evergreen-ui";
import { Formik, Form } from "formik";
import { useMutation } from "@apollo/react-hooks";

import { propOr } from "ramda";

import { useQuery } from "@apollo/react-hooks";
import GET_LANE from "graphql/get_lane_query";

import UPDATE_LANE_MUTATION from "graphql/update_lane_mutation";
import GET_PROJECT_QUERY from "graphql/get_project_query";
import FormikField from "components/FormikField";

const EditLane = ({ history, match: { params } }) => {
  const { projectId, laneId } = params;
  const handleClose = useCallback(() => history.goBack(), [history]);
  const [dialogVisible, setDialogVisible] = useState(true);
  const [mutationLoading, setMutationLoading] = useState(false);

  const [updateLane] = useMutation(UPDATE_LANE_MUTATION, {
    refetchQueries: [{ query: GET_PROJECT_QUERY, variables: { id: projectId } }]
  });

  // handle the submission of the form. Firing the actual mutation and showing a toast
  // indicating success or failure.
  const handleSubmit = useCallback(
    lane => {
      setMutationLoading(true);
      updateLane({ variables: { laneId, lane } })
        .then(() => {
          setMutationLoading(false);
          toaster.success("Lane succesfully updated", { duration: 2 });
          setDialogVisible(false);
        })
        .catch(error => {
          setMutationLoading(false);
          console.error(error);
          toaster.danger("Error updating lane.. Please try again");
        });
    },
    [laneId, updateLane]
  );

  // fetch the initial data from cache only. Look at cache-redirection in the Apollo Client.
  const { data } = useQuery(GET_LANE, {
    variables: { id: laneId },
    fetchPolicy: "cache-only"
  });

  // initialize the form with initial values. Because we're exclusively reading from cache,
  // the info might not yet be available in our cache. Unfortunately this isn't protected by
  // a loading state, thus we should prefill the values with an empty string.
  const initialValues = {
    title: propOr("", "title", data.lane),
    description: propOr("", "description", data.lane)
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
          title="Edit Lane"
          onCloseComplete={handleClose}
          confirmLabel="Save"
          isConfirmLoading={mutationLoading}
          onConfirm={submitForm}
        >
          <Form>
            <FormikField
              component={TextInputField}
              name="title"
              label="Lane Title"
              placeholder="Lane Title"
              tabIndex={0}
              required
            />

            <Label htmlFor="description" marginBottom={4} display="block">
              Lane Description
            </Label>

            <FormikField
              component={Textarea}
              name="description"
              onCtrlEnter={submitForm}
              placeholder="Lane Description"
            />
          </Form>
        </Dialog>
      )}
    </Formik>
  );
};

export default EditLane;
