import React, { useCallback, useState } from "react";
import {
  Pane,
  Button,
  TextInputField,
  Label,
  Textarea,
  toaster
} from "evergreen-ui";
import { Formik, Form } from "formik";
import SidePanel from "components/SidePanel";
import FormikField from "components/FormikField";
import CREATE_PROJECT_MUTATION from "graphql/create_project_mutation";
import GET_PROJECTS from "graphql/get_projects_query";
import { useMutation } from "react-apollo-hooks";

const initialValues = {
  title: "",
  description: ""
};

const NewProject = ({ history }) => {
  const closeHandler = useCallback(() => {
    history.goBack();
  }, [history]);

  const [isSubmitting, setSubmitting] = useState(false);

  const createProject = useMutation(CREATE_PROJECT_MUTATION, {
    refetchQueries: [{ query: GET_PROJECTS }]
  });

  const submitHandler = useCallback(
    values => {
      setSubmitting(true);
      createProject({ variables: { project: values } })
        .then(({ data }) => {
          setSubmitting(false);
          const projectId = data.createProject.project.id;
          history.push(`${projectId}`);
        })
        .catch(error => {
          setSubmitting(false);
          console.error(error);
          toaster.danger("There was an error saving the project");
        });
    },
    [createProject, history]
  );

  return (
    <SidePanel onClose={closeHandler} title="Start a new Project">
      <Formik onSubmit={submitHandler} initialValues={initialValues}>
        <Form>
          <FormikField
            component={TextInputField}
            name="title"
            label="Project Title"
            placeholder="Project Title"
            tabIndex={0}
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
            <Pane flex={1} align="right">
              <Button
                type="submit"
                appearance="primary"
                isLoading={isSubmitting}
              >
                Save
              </Button>
            </Pane>
          </Pane>
        </Form>
      </Formik>
    </SidePanel>
  );
};

export default NewProject;
