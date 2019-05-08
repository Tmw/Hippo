import React from "react";

import { Pane } from "evergreen-ui";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import Home from "./routes/Home";
import Project from "./routes/Project";
import Header from "./components/Header";
import ProjectPicker from "./components/ProjectPicker";

import "./App.css";

const navbarHeight = 56;

const client = new ApolloClient({ uri: "http://localhost:4000/graphql" });

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Router>
          <Header height={navbarHeight} triggerTitle="Some Project" />
          <Pane width="100%" height={`calc(100vh - ${navbarHeight}px)`}>
            <Route path="/" exact component={Home} />
            <Route
              path={[
                "/projects-picker",
                "/projects/:projectId/projects-picker"
              ]}
              exact
              component={ProjectPicker}
            />
            <Route path="/projects/:projectId" component={Project} />
          </Pane>
        </Router>
      </div>
    </ApolloProvider>
  );
};

export default App;
