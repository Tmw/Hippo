import React from "react";

import { Pane, Heading, Paragraph } from "evergreen-ui";
import "./App.css";

const navbarHeight = 56;

const getId = () =>
  Math.random()
    .toString(36)
    .substr(2, 9);

const data = {
  lanes: [
    {
      id: getId(),
      title: "Backlog"
    },
    {
      id: getId(),
      title: "Bug"
    },
    {
      id: getId(),
      title: "Feature Request"
    },
    {
      id: getId(),
      title: "This Sprint"
    },
    {
      id: getId(),
      title: "Doing"
    },
    {
      id: getId(),
      title: "For Review"
    },
    {
      id: getId(),
      title: "QA"
    },
    {
      id: getId(),
      title: "Next Release"
    },
    {
      id: getId(),
      title: "Blocked"
    }
  ]
};

const Header = () => (
  <Pane display="flex" padding={16} height={navbarHeight} background="white">
    <Heading size={600}>Hippo</Heading>
  </Pane>
);

const Project = ({ data: { lanes } }) => (
  <Pane
    width="100%"
    height="100%"
    display="flex"
    overflowX="scroll"
    padding="25px"
  >
    {lanes.map(lane => (
      <Lane title={lane.title} key={lane.id} />
    ))}
  </Pane>
);

const Card = ({ title, description }) => (
  <Pane
    width="100%"
    minHeight="150px"
    borderRadius="5px"
    marginBottom="15px"
    background="white"
    elevation={1}
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
    paddingRight={5}
    background="#f6f6f6"
    className="Lane"
    borderRadius="5px"
    display="flex"
    flexDirection="column"
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
        <Project data={data} />
      </Pane>
    </div>
  );
};

export default App;
