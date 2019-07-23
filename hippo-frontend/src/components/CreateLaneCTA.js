import React from "react";
import { Pane, Heading, Button } from "evergreen-ui";

import LaneWrapper from "components/Lane/Wrapper";

const CreateLaneCTA = ({ initial, onAdd }) => {
  const cta = initial ? "Get started!" : "Running out of space?";
  return (
    <LaneWrapper>
      <Pane
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100%"
      >
        <Heading marginBottom="10px">{cta}</Heading>
        <Button iconBefore="plus" onClick={onAdd}>
          Add lane
        </Button>
      </Pane>
    </LaneWrapper>
  );
};

export default CreateLaneCTA;
