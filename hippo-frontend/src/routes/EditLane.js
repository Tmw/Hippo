import React, { useCallback, useState } from "react";
import { Dialog, TextInputField, Label, Textarea, toaster } from "evergreen-ui";
import { Formik, Form } from "formik";
import { useMutation } from "react-apollo-hooks";

import UPDATE_LANE_MUTATION from "graphql/update_lane_mutation";
import GET_PROJECT_QUERY from "graphql/get_project_query";
import FormikField from "components/FormikField";

const EditLane = ({ history, match: { params } }) => {
  const { projectId, laneId } = params;
  const handleClose = useCallback(() => history.goBack(), [history]);
  const [dialogVisible, setDialogVisible] = useState(true);

  const updateLane = useMutation(UPDATE_LANE_MUTATION, {
    refetchQueries: [{ query: GET_PROJECT_QUERY, variables: { id: projectId } }]
  });

  const handleSubmit = useCallback(
    lane => {
      updateLane({ variables: { laneId, lane } })
        .then(() => {
          toaster.success("Lane succesfully updated", { duration: 2 });
          setDialogVisible(false);
        })
        .catch(error => {
          console.error(error);
          toaster.danger("Error updating lane.. Please try again");
        });
    },
    [laneId, updateLane]
  );

  // TODO:
  // Pull the current values from somewhere...?

  const initialValues = {
    title: "Should be prefilled",
    description: "Should also be prefilled"
  };

  return (
    <Formik onSubmit={handleSubmit} initialValues={initialValues}>
      {({ submitForm }) => (
        <Dialog
          isShown={dialogVisible}
          title="Edit Lane"
          onCloseComplete={handleClose}
          confirmLabel="Save"
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
              placeholder="Lane Description"
            />
          </Form>
        </Dialog>
      )}
    </Formik>
  );
};

export default EditLane;
