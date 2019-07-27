import React, { useCallback, useState, useEffect } from "react";
import { Pane, TextInputField, Textarea, Button, toaster } from "evergreen-ui";
import { Formik, Form } from "formik";

import { useMutation } from "react-apollo-hooks";
import CREATE_CARD_MUTATION from "graphql/create_card_mutation";
import GET_LANE_WITH_CARDS_QUERY from "graphql/get_lane_with_cards_query";

import FormikField from "components/FormikField";

const useAddCardState = initialState => {
  const [isVisible, setVisible] = useState(initialState);

  const toggleVisibility = () => setVisible(!isVisible);
  const hide = () => setVisible(false);
  const show = () => setVisible(true);

  return { isVisible, toggleVisibility, show, hide };
};

const AddCard = ({ isShown, onCancel, onSubmitted, laneId }) => {
  const createCard = useMutation(CREATE_CARD_MUTATION, {
    update: (cache, { data: { createCard } }) => {
      // read cached lane
      const { lane } = cache.readQuery({
        query: GET_LANE_WITH_CARDS_QUERY,
        variables: { id: laneId }
      });

      // append card record to lane and write query back in cache.
      const newData = {
        lane: {
          ...lane,
          cards: [createCard.card, ...lane.cards]
        }
      };

      // write new cache data
      cache.writeQuery({
        query: GET_LANE_WITH_CARDS_QUERY,
        data: newData
      });
    }
  });

  const handleSubmit = useCallback(
    params => {
      createCard({
        variables: {
          laneId,
          cardParams: {
            title: params.title,
            description: params.description
          }
        }
      })
        .then(() => {
          onSubmitted();
        })
        .catch(error => {
          console.error(error);
          toaster.danger("Error creating card.. Please try again");
        });
    },
    [createCard, laneId, onSubmitted]
  );

  // cancel the form upon escape
  const handleKeydown = useCallback(
    event => {
      if (event.key === "Escape") onCancel();
    },
    [onCancel]
  );

  const [titleInputRef, setTitleInputRef] = useState(null);
  useEffect(() => {
    if (titleInputRef !== null) titleInputRef.focus();
  }, [titleInputRef]);

  if (isShown !== true) return null;

  const initialValues = {
    title: "",
    description: ""
  };

  return (
    <Formik onSubmit={handleSubmit} initialValues={initialValues}>
      {({ submitForm }) => (
        <Form>
          <Pane
            minHeight="150px"
            borderRadius="5px"
            margin="25px"
            marginBottom="15px"
            background="white"
            elevation={1}
            padding="15px"
            align="left"
            onKeyDown={handleKeydown}
          >
            <FormikField
              component={TextInputField}
              innerRef={setTitleInputRef}
              name="title"
              label="Card title"
              placeholder="Card Title"
              tabIndex={0}
              required
            />

            <FormikField
              component={Textarea}
              name="description"
              onCtrlEnter={submitForm}
              placeholder="Card description"
            />

            <Pane align="right" marginTop={10}>
              <Button
                type="button"
                marginRight={5}
                height={24}
                onClick={onCancel}
              >
                Cancel
              </Button>
              <Button type="submit" intent="success" height={24}>
                Save
              </Button>
            </Pane>
          </Pane>
        </Form>
      )}
    </Formik>
  );
};

export { useAddCardState, AddCard };
