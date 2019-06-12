import React from "react";
import { Pane } from "evergreen-ui";

import Card from "components/Card";
import Header from "components/Lane/Header";
import Wrapper from "components/Lane/Wrapper";

const Lane = ({ data: { title, cards } }) => (
  <Wrapper>
    <Header title={title} />

    <Pane paddingRight="20px" overflowY="scroll">
      {cards.map(c => (
        <Card data={c} key={c.id} />
      ))}
    </Pane>
  </Wrapper>
);

export default Lane;
