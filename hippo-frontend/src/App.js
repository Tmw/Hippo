import React from "react";

import { Pane } from "evergreen-ui";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import Home from "./routes/Home";
import Project from "./routes/Project";
import ProjectPicker from "components/ProjectPicker/index";
import EditProject from "components/EditProject/index";
import NewProject from "routes/NewProject";
import "./App.css";

const client = new ApolloClient({ uri: "http://localhost:4000/graphql" });
const MainContentRoutes = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/projects/:projectId" component={Project} />
  </Switch>
);

const SidePanelRoutes = () => (
  <Switch>
    <Route
      path="/projects/:projectId/projects-picker"
      exact
      component={ProjectPicker}
    />
    <Route path="/projects/new" exact component={NewProject} />
    <Route path="/projects/:projectId/edit" component={EditProject} />
  </Switch>
);

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Router>
          <Pane width="100%">
            <MainContentRoutes />
            <SidePanelRoutes />
          </Pane>
        </Router>
      </div>
    </ApolloProvider>
  );
};

export default App;
