import React from "react";

import { Pane } from "evergreen-ui";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import apolloClient from "graphql/client";
import { ApolloProvider } from "react-apollo-hooks";

import useProjectsAllRealtimeEvents from "graphql/hooks/projects_all_subscription_hook";

import Home from "./routes/Home";
import Project from "./routes/Project";
import ProjectPicker from "routes/ProjectPicker";
import EditProject from "routes/EditProject";
import NewProject from "routes/NewProject";
import CreateLane from "routes/CreateLane";
import EditLane from "routes/EditLane";
import EditCard from "routes/EditCard";
import "./App.css";

const Centered = ({ children }) => (
  <Pane
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    height="100vh"
  >
    {children}
  </Pane>
);

const Routes = () => {
  // subscribe to projects events on the global level
  useProjectsAllRealtimeEvents();

  return (
    <React.Fragment>
      <Route
        path="/projects/:projectId/projects-picker"
        component={ProjectPicker}
      />
      <Route path="/projects/:projectId/edit" component={EditProject} />
      <Route path="/projects/:projectId/lanes/new" component={CreateLane} />
      <Route
        path="/projects/:projectId/lanes/:laneId/edit"
        component={EditLane}
      />
      <Route
        path="/projects/:projectId/cards/:cardId/edit"
        component={EditCard}
      />

      <Centered>
        <Switch>
          <Route path="/projects/new" exact component={NewProject} />
          <Route path="/projects/:projectId" component={Project} />
        </Switch>
      </Centered>

      <Route path="/" exact component={Home} />
    </React.Fragment>
  );
};

const App = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <div className="App">
        <Router>
          <Pane width="100%">
            <Routes />
          </Pane>
        </Router>
      </div>
    </ApolloProvider>
  );
};

export default App;
