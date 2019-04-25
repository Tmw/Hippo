import React from "react";

import { Pane, Heading, Text } from "evergreen-ui";
import "./App.css";

const navbarHeight = 56;

const Header = () => (
  <Pane display="flex" padding={16} height={navbarHeight} background="tint2">
    <Heading size={600}>Hippo</Heading>
  </Pane>
);

const Project = () => (
  <Pane width="100%" height="100%" display="flex" overflowX="scroll">
    <Lane title="Backlog" />
    <Lane title="Bug" />
    <Lane title="Feature Request" />
    <Lane title="This Sprint" />
    <Lane title="Doing" />
    <Lane title="For Review" />
    <Lane title="QA" />
    <Lane title="Next Release" />
    <Lane title="Blocked" />
  </Pane>
);

const Card = ({ title, description }) => (
  <Pane
    width="100%"
    minHeight="150px"
    border="muted"
    elevation="1"
    marginBottom="15px"
  >
    <Heading size={400}>{title}</Heading>
    <Text>{description}</Text>
  </Pane>
);
const Lane = ({ title }) => (
  <Pane
    minWidth={350}
    height="100%"
    marginRight={15}
    padding={10}
    borderRight="muted"
  >
    <Heading size={500} marginBottom={10}>
      {title}
    </Heading>

    <Pane height="100%">
      <Card title="This is some title" description="yeah it is" />
      <Card title="This is some title" description="yeah it is" />
      <Card title="This is some title" description="yeah it is" />
      <Card title="This is some title" description="yeah it is" />
    </Pane>
  </Pane>
);

const App = () => {
  return (
    <div className="App">
      <Header />
      <Pane width="100%" height={`calc(100vh - ${navbarHeight}px)`}>
        <Project />
      </Pane>
    </div>
  );
};

export default App;
