import React, { useCallback } from "react";
import { compose } from "ramda";
import { Menu, IconButton, Popover, Position } from "evergreen-ui";

const HeaderMenu = ({ onDeleteClick, onEditClick, onAddClick }) => {
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
    <React.Fragment>
      <IconButton appearance="minimal" icon="plus" onClick={onAddClick} />

      <Popover position={Position.BOTTOM_LEFT} content={popoverMenu}>
        <IconButton appearance="minimal" icon="more" />
      </Popover>
    </React.Fragment>
  );
};
export default HeaderMenu;
