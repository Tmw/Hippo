import React from "react";

import { Pane } from "evergreen-ui";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo-hooks";

import Home from "./routes/Home";
import Project from "./routes/Project";
import ProjectPicker from "routes/ProjectPicker";
import EditProject from "routes/EditProject";
import NewProject from "routes/NewProject";
import CreateLane from "routes/CreateLane";
import EditLane from "routes/EditLane";
import "./App.css";

const client = new ApolloClient({ uri: "http://localhost:4000/graphql" });

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

const Routes = () => (
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

    <Centered>
      <Switch>
        <Route path="/projects/new" exact component={NewProject} />
        <Route path="/projects/:projectId" component={Project} />
      </Switch>
    </Centered>

    <Route path="/" exact component={Home} />
  </React.Fragment>
);

const App = () => {
  return (
    <ApolloProvider client={client}>
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
