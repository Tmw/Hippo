import React, { useState, useEffect } from "react";
import { Field } from "formik";
import { omit } from "ramda";

const FormikField = props => {
  const { name, component: Component, onCtrlEnter } = props;
  const rest = omit(["component", "onCtrlEnter"], props);
  const [componentRef, setComponentRef] = useState(null);

  useEffect(() => {
    if (onCtrlEnter === undefined) return;
    if (componentRef === null) return;

    // assign eventlistener
    const handleKeyPress = e => {
      e.keyCode === 13 && (e.metaKey || e.ctrlKey) && onCtrlEnter();
    };

    componentRef.addEventListener("keydown", handleKeyPress);

    // handle teardown of effect
    return () => {
      componentRef.removeEventListener("keydown", handleKeyPress);
    };
  }, [componentRef, onCtrlEnter]);

  return (
    <Field
      name={name}
      render={({ field }) => (
        <Component
          innerRef={setComponentRef}
          {...Object.assign({}, rest, field)}
        />
      )}
    />
  );
};

export default FormikField;
