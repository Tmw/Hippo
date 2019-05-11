import React from "react";
import { TextInputField, Textarea, Label } from "evergreen-ui";

const ProjectFormFields = () => (
  <React.Fragment>
    <TextInputField
      tabindex={0}
      label="Project Title"
      placeholder="Project Title"
      required
    />
    <Label htmlFor="description" marginBottom={4} display="block">
      Project Description
    </Label>
    <Textarea name="description" placeholder="Project Description" />
  </React.Fragment>
);

export default ProjectFormFields;
