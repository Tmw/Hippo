import React from "react";
import {
  IconButton,
  Tooltip,
  SideSheet,
  Pane,
  Heading,
  Position
} from "evergreen-ui";
import { Link } from "react-router-dom";

const SidePanel = ({ children, title, onClose }) => (
  <SideSheet
    isShown={true}
    onCloseComplete={onClose}
    position={Position.LEFT}
    containerProps={{
      display: "flex",
      flex: 1,
      flexDirection: "column"
    }}
  >
    <Pane zIndex={1} flexShrink={0} backgroundColor="white">
      <Pane padding={16} display="flex">
        <Heading size={600} flex={1}>
          {title}
        </Heading>
        <Pane>
          <Tooltip content="Start new Project">
            <Link to="/projects/new">
              <IconButton appearance="minimal" icon="plus" />
            </Link>
          </Tooltip>
        </Pane>
      </Pane>
    </Pane>
    <Pane flex="1" flexGrow={1} background="tint1" padding={16}>
      {children}
    </Pane>
  </SideSheet>
);

export default SidePanel;
