import React from "react";

import { Pane, Heading, Paragraph } from "evergreen-ui";
import "./App.css";

const navbarHeight = 56;

const Header = () => (
  <Pane display="flex" padding={16} height={navbarHeight} background="white">
    <Heading size={600}>Hippo</Heading>
  </Pane>
);

const Project = () => (
  <Pane
    width="100%"
    height="100%"
    display="flex"
    overflowX="scroll"
    padding="25px"
  >
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
    borderRadius="5px"
    marginBottom="15px"
    background="white"
    elevation="1"
    padding="15px"
  >
    <Heading size={500} align="left" marginBottom="10px">
      {title}
    </Heading>
    <Paragraph align="left">{description}</Paragraph>
  </Pane>
);
const Lane = ({ title }) => (
  <Pane
    minWidth={350}
    height="100%"
    marginRight={15}
    padding={25}
    className="Lane"
    borderRadius="5px"
  >
    <Heading size={500} marginBottom={10} align="left">
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
