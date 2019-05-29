import React from "react";
import { Field } from "formik";
import { omit } from "ramda";

const FormikField = props => {
  const { name, component: Component } = props;
  const rest = omit(["component"], props);

  return (
    <Field
      name={name}
      render={({ field }) => <Component {...Object.assign({}, rest, field)} />}
    />
  );
};

export default FormikField;
