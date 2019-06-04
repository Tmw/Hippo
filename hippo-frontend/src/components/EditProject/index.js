import React, { useState, useCallback } from "react";
import {
  Button,
  Dialog,
  Pane,
  Label,
  Textarea,
  TextInputField,
  toaster
} from "evergreen-ui";
import { Formik, Form } from "formik";
import { withRouter } from "react-router-dom";
import { useQuery, useMutation } from "react-apollo-hooks";

import GET_PROJECT from "graphql/get_project_query";
import GET_PROJECTS from "graphql/get_projects_query";
import DELETE_PROJECT from "graphql/delete_project_mutation";

import FormikField from "components/FormikField";
import SpinnerWithText from "components/SpinnerWithText";
import ErrorWithText from "components/ErrorWithText";

const EditProjectSheetContents = ({ projectId, onClose, history }) => {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [isProjectDeleting, setProjectDeleting] = useState(false);

  const { data, error, loading } = useQuery(GET_PROJECT, {
    variables: { id: projectId }
  });

  const deleteProject = useMutation(DELETE_PROJECT, {
    variables: { projectId },
    refetchQueries: [{ query: GET_PROJECTS }]
  });

  const submitHandler = useCallback(values => {
    console.log("[TODO] Submit new values..:", values);
  }, []);

  const handleDeleteProject = useCallback(() => {
    setProjectDeleting(true);
    deleteProject()
      .then(() => {
        // first get rid of the loading state and close the dialog
        setProjectDeleting(false);
        setDialogVisible(false);

        // Navigate back to home, so it'll pick the first available project again
        history.push("/");
      })
      .catch(error => {
        setProjectDeleting(false);
        console.error(error);
        toaster.danger("There was an error deleting the project");
      });
  }, [deleteProject, history]);

  if (loading) return <SpinnerWithText text="Hold on.." />;
  if (error) return <ErrorWithText text="Uh-oh.." description={error} />;

  // TODO: This can be improved, but i'm sleepy now.
  const projects = data.projects || [];
  const project = projects[0];

  const initialValues = {
    title: project.title,
    description: project.description
  };

  return (
    <>
      <Formik onSubmit={submitHandler} initialValues={initialValues}>
        <Form>
          <FormikField
            component={TextInputField}
            name="title"
            label="Project Title"
            placeholder="Project Title"
            tabIndex={0}
            required
          />

          <Label htmlFor="description" marginBottom={4} display="block">
            Project Description
          </Label>

          <FormikField
            component={Textarea}
            name="description"
            placeholder="Project Description"
          />

          <Pane display="flex" marginTop={16}>
            <Pane>
              <Button
                appearance="minimal"
                iconBefore="trash"
                intent="danger"
                type="button"
                onClick={() => setDialogVisible(true)}
              >
                Delete Project
              </Button>
            </Pane>

            <Pane flex={1} align="right">
              <Button marginRight={12} type="button" onClick={onClose}>
                Cancel
              </Button>
              <Button appearance="primary" type="submit">
                Save
              </Button>
            </Pane>
          </Pane>
        </Form>
      </Formik>

      <Dialog
        isShown={dialogVisible}
        title="Danger intent"
        intent="danger"
        onCloseComplete={() => setDialogVisible(false)}
        onConfirm={handleDeleteProject}
        isConfirmLoading={isProjectDeleting}
        confirmLabel="Delete Project"
      >
        Are you sure you want to delete this project?
      </Dialog>
    </>
  );
};

export default withRouter(EditProjectSheetContents);
