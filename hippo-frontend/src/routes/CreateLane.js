import React, { useCallback, useState } from "react";
import { Dialog, TextInputField, Label, Textarea, toaster } from "evergreen-ui";
import { Formik, Form } from "formik";
import { useMutation } from "@apollo/react-hooks";

import CREATE_LANE_MUTATION from "graphql/create_lane_mutation";
import GET_PROJECT_QUERY from "graphql/get_project_query";
import FormikField from "components/FormikField";

const CreateLane = ({ history, match: { params } }) => {
  const { projectId } = params;
  const handleClose = useCallback(() => history.goBack(), [history]);

  const [dialogVisible, setDialogVisible] = useState(true);

  const [createLane] = useMutation(CREATE_LANE_MUTATION, {
    refetchQueries: [{ query: GET_PROJECT_QUERY, variables: { id: projectId } }]
  });

  const handleSubmit = useCallback(
    lane => {
      createLane({ variables: { projectId, lane } })
        .then(() => {
          toaster.success("Lane succesfully created", { duration: 2 });
          setDialogVisible(false);
        })
        .catch(error => {
          console.error(error);
          toaster.danger("Error creating lane.. Please try again");
        });
    },
    [createLane, projectId]
  );

  const initialValues = {
    title: "",
    description: ""
  };

  return (
    <Formik onSubmit={handleSubmit} initialValues={initialValues}>
      {({ submitForm }) => (
        <Dialog
          isShown={dialogVisible}
          title="Create new Lane"
          onCloseComplete={handleClose}
          confirmLabel="Create"
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

export default CreateLane;
