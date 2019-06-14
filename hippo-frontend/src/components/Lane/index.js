import React, { useCallback } from "react";
import { Pane } from "evergreen-ui";

import Card from "components/Card";
import Header from "components/Lane/Header";
import Wrapper from "components/Lane/Wrapper";
import HeaderMenu from "components/Lane/HeaderMenu";

const Lane = ({ data: { title, cards } }) => {
  const handleDeleteLaneClicked = useCallback(() => {
    console.log("handeling delete lane click");
  }, []);

  const handleEditLaneClicked = useCallback(() => {
    console.log("handeling edit lane click");
  }, []);

  return (
    <Wrapper>
      <Header title={title}>
        <HeaderMenu
          onDeleteClick={handleDeleteLaneClicked}
          onEditClick={handleEditLaneClicked}
        />
      </Header>

      <Pane paddingRight="20px" overflowY="scroll">
        {cards.map(c => (
          <Card data={c} key={c.id} />
        ))}
      </Pane>
    </Wrapper>
  );
};

export default Lane;
