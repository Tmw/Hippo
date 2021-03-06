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
import { useMutation, useQuery } from "@apollo/react-hooks";

import GET_PROJECT from "graphql/get_project_query";
import DELETE_PROJECT from "graphql/delete_project_mutation";
import UPDATE_PROJECT from "graphql/update_project_mutation";

import FormikField from "components/FormikField";
import ProjectCache from "graphql/helpers/project_cache";
import SpinnerWithText from "components/SpinnerWithText";
import ErrorWithText from "components/ErrorWithText";

const EditProjectSheetContents = ({ projectId, onClose, history }) => {
  const [dialogVisible, setDialogVisible] = useState(false);

  const { data, error, loading } = useQuery(GET_PROJECT, {
    variables: { id: projectId }
  });

  const [deleteProject, { loading: isProjectDeleting }] = useMutation(
    DELETE_PROJECT,
    {
      variables: { projectId },
      update: (cache, _result) => ProjectCache.deleteProject(cache, projectId)
    }
  );

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    refetchQueries: [{ query: GET_PROJECT, variables: { id: projectId } }]
  });

  const submitHandler = useCallback(
    params => {
      updateProject({
        variables: {
          projectId,
          params
        }
      })
        .then(() => {
          onClose();
          toaster.success("Project succesfully updated", { duration: 2 });
        })
        .catch(error => {
          console.error(error);
          toaster.danger("Error updating project.. Please try again");
        });
    },
    [onClose, projectId, updateProject]
  );

  const handleDeleteProject = useCallback(() => {
    deleteProject()
      .then(() => {
        // first get rid of the loading state and close the dialog
        setDialogVisible(false);

        // Navigate back to home, so it'll pick the first available project again
        history.push("/");
      })
      .catch(error => {
        console.error(error);
        toaster.danger("There was an error deleting the project");
      });
  }, [deleteProject, history]);

  if (loading) return <SpinnerWithText text="Hold on.." />;
  if (error) return <ErrorWithText text="Uh-oh.." description={error} />;

  const initialValues = {
    title: data.project.title,
    description: data.project.description
  };

  return (
    <React.Fragment>
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
        title="Are you sure?"
        intent="danger"
        onCloseComplete={() => setDialogVisible(false)}
        onConfirm={handleDeleteProject}
        isConfirmLoading={isProjectDeleting}
        confirmLabel="Delete Project"
      >
        Are you sure you want to delete this project?
      </Dialog>
    </React.Fragment>
  );
};

export default withRouter(EditProjectSheetContents);
