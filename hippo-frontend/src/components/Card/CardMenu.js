import React, { useCallback } from "react";
import { compose } from "ramda";
import { Pane, IconButton, Position, Popover, Menu } from "evergreen-ui";

const CardMenu = ({ onDeleteClick, onEditClick }) => {
  const popoverMenu = useCallback(
    ({ close: closePopover }) => {
      const handleEditClick = compose(
        closePopover,
        onEditClick
      );

      const handleDeleteClick = compose(
        closePopover,
        onDeleteClick
      );

      return (
        <Menu>
          <Menu.Group>
            <Menu.Item icon="edit" onSelect={handleEditClick}>
              Edit...
            </Menu.Item>
          </Menu.Group>
          <Menu.Divider />
          <Menu.Group>
            <Menu.Item
              icon="trash"
              intent="danger"
              onSelect={handleDeleteClick}
            >
              Delete...
            </Menu.Item>
          </Menu.Group>
        </Menu>
      );
    },
    [onDeleteClick, onEditClick]
  );

  return (
    <Pane align="right" display="flex" alignSelf="start">
      <Popover position={Position.BOTTOM_LEFT} content={popoverMenu}>
        <IconButton appearance="minimal" icon="more" />
      </Popover>
    </Pane>
  );
};

export default CardMenu;
