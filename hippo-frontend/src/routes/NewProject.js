import React, { useCallback } from "react";
import { Pane, Button, TextInputField, Label, Textarea } from "evergreen-ui";
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

  const createProject = useMutation(CREATE_PROJECT_MUTATION, {
    refetchQueries: [{ query: GET_PROJECTS }]
  });

  const submitHandler = useCallback(
    values => {
      createProject({ variables: { project: values } });
    },
    [createProject]
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
              <Button type="button" marginRight={12} onClick={closeHandler}>
                Cancel
              </Button>
              <Button type="submit" appearance="primary">
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
