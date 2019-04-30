import React from "react";

import { Pane, Heading, Paragraph } from "evergreen-ui";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import Home from "./routes/Home";

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
      title: "Backlog",
      cards: [
        {
          id: getId(),
          title: "something",
          description: "something else"
        },
        {
          id: getId(),
          title: "something",
          description: "something else"
        },
        {
          id: getId(),
          title: "something",
          description: "something else"
        },
        {
          id: getId(),
          title: "something",
          description: "something else"
        },
        {
          id: getId(),
          title: "something",
          description: "something else"
        },
        {
          id: getId(),
          title: "something",
          description: "something else"
        },
        {
          id: getId(),
          title: "something",
          description: "something else"
        },
        {
          id: getId(),
          title: "something",
          description: "something else"
        },
        {
          id: getId(),
          title: "something",
          description: "something else"
        },
        {
          id: getId(),
          title: "something",
          description: "something else"
        },
        {
          id: getId(),
          title: "something",
          description: "something else"
        },
        {
          id: getId(),
          title: "something",
          description: "something else"
        }
      ]
    },
    {
      id: getId(),
      title: "Bug",
      cards: [
        {
          id: getId(),
          title: "something",
          description: "something else"
        },
        {
          id: getId(),
          title: "something",
          description: "something else"
        },
        {
          id: getId(),
          title: "something",
          description: "something else"
        },
        {
          id: getId(),
          title: "something",
          description: "something else"
        }
      ]
    },
    {
      id: getId(),
      title: "Feature Request",
      cards: [
        {
          id: getId(),
          title: "something",
          description: "something else"
        },
        {
          id: getId(),
          title: "something",
          description: "something else"
        },
        {
          id: getId(),
          title: "something",
          description: "something else"
        },
        {
          id: getId(),
          title: "something",
          description: "something else"
        }
      ]
    },
    {
      id: getId(),
      title: "This Sprint",
      cards: [
        {
          id: getId(),
          title: "something",
          description: "something else"
        },
        {
          id: getId(),
          title: "something",
          description: "something else"
        },
        {
          id: getId(),
          title: "something",
          description: "something else"
        },
        {
          id: getId(),
          title: "something",
          description: "something else"
        }
      ]
    },
    {
      id: getId(),
      title: "Doing",
      cards: [
        {
          id: getId(),
          title: "something",
          description: "something else"
        },
        {
          id: getId(),
          title: "something",
          description: "something else"
        },
        {
          id: getId(),
          title: "something",
          description: "something else"
        },
        {
          id: getId(),
          title: "something",
          description: "something else"
        }
      ]
    },
    {
      id: getId(),
      title: "For Review",
      cards: [
        {
          id: getId(),
          title: "something",
          description: "something else"
        },
        {
          id: getId(),
          title: "something",
          description: "something else"
        },
        {
          id: getId(),
          title: "something",
          description: "something else"
        },
        {
          id: getId(),
          title: "something",
          description: "something else"
        }
      ]
    },
    {
      id: getId(),
      title: "QA",
      cards: [
        {
          id: getId(),
          title: "something",
          description: "something else"
        },
        {
          id: getId(),
          title: "something",
          description: "something else"
        },
        {
          id: getId(),
          title: "something",
          description: "something else"
        },
        {
          id: getId(),
          title: "something",
          description: "something else"
        }
      ]
    },
    {
      id: getId(),
      title: "Next Release",
      cards: [
        {
          id: getId(),
          title: "something",
          description: "something else"
        },
        {
          id: getId(),
          title: "something",
          description: "something else"
        },
        {
          id: getId(),
          title: "something",
          description: "something else"
        },
        {
          id: getId(),
          title: "something",
          description: "something else"
        }
      ]
    },
    {
      id: getId(),
      title: "Blocked",
      cards: [
        {
          id: getId(),
          title: "something",
          description: "something else"
        },
        {
          id: getId(),
          title: "something",
          description: "something else"
        },
        {
          id: getId(),
          title: "something",
          description: "something else"
        },
        {
          id: getId(),
          title: "something",
          description: "something else"
        }
      ]
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
      <Lane data={lane} key={lane.id} />
    ))}
  </Pane>
);

const Card = ({ data: { title, description } }) => (
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
const Lane = ({ data: { title, cards } }) => (
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

    <Pane paddingRight="20px" overflowY="scroll">
      {cards.map(c => (
        <Card data={c} key={c.id} />
      ))}
    </Pane>
  </Pane>
);

const ProjectView = () => <Project data={data} />;

const client = new ApolloClient({ uri: "http://localhost:4000/graphql" });

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Header />
        <Pane width="100%" height={`calc(100vh - ${navbarHeight}px)`}>
          <Router>
            <Route path="/" exact component={Home} />
            <Route path="/projects/:projectId" component={ProjectView} />
          </Router>
        </Pane>
      </div>
    </ApolloProvider>
  );
};

export default App;
