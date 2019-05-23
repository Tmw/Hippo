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
const Routes = () => (
  <React.Fragment>
    <Route
      path="/projects/:projectId/projects-picker"
      exact
      component={ProjectPicker}
    />
    <Route path="/projects/:projectId/edit" component={EditProject} />

    <Switch>
      <Route path="/projects/new" exact component={NewProject} />
      <Route path="/projects/:projectId" component={Project} />
    </Switch>

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
