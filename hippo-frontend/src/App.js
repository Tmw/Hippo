import React from "react";

import { Pane, Heading } from "evergreen-ui";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import Home from "./routes/Home";
import Project from "./routes/Project";

import "./App.css";

const navbarHeight = 56;

const Header = () => (
  <Pane display="flex" padding={16} height={navbarHeight} background="white">
    <Heading size={600}>Hippo</Heading>
  </Pane>
);

const client = new ApolloClient({ uri: "http://localhost:4000/graphql" });

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Header />
        <Pane width="100%" height={`calc(100vh - ${navbarHeight}px)`}>
          <Router>
            <Route path="/" exact component={Home} />
            <Route path="/projects/:projectId" component={Project} />
          </Router>
        </Pane>
      </div>
    </ApolloProvider>
  );
};

export default App;
