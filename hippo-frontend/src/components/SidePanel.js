import React from "react";
import { SideSheet, Pane, Heading, Position } from "evergreen-ui";

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
    <Pane zIndex={1} flexShrink={0} elevation={0} backgroundColor="white">
      <Pane padding={16}>
        <Heading size={600}>{title}</Heading>
      </Pane>
    </Pane>
    <Pane flex="1" flexGrow={1} background="tint1" padding={16}>
      {children}
    </Pane>
  </SideSheet>
);

export default SidePanel;
