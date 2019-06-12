import React from "react";
import {
  IconButton,
  Pane,
  Heading,
  Popover,
  Menu,
  Position
} from "evergreen-ui";

const EditLaneMenu = () => (
  <Menu>
    <Menu.Group>
      <Menu.Item icon="edit" secondaryText="⌘R">
        Rename...
      </Menu.Item>
    </Menu.Group>
    <Menu.Divider />
    <Menu.Group>
      <Menu.Item icon="trash" intent="danger">
        Delete...
      </Menu.Item>
    </Menu.Group>
  </Menu>
);

const Header = ({ title }) => (
  <Pane display="flex" marginRight={20} marginBottom={10} alignItems="center">
    <Heading size={500} flexGrow={1} align="left">
      {title}
    </Heading>

    <Pane align="right" display="flex">
      <IconButton appearance="minimal" icon="plus" />

      <Popover position={Position.BOTTOM_LEFT} content={EditLaneMenu}>
        <IconButton appearance="minimal" icon="more" />
      </Popover>
    </Pane>
  </Pane>
);

export default Header;
