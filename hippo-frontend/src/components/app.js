import { h } from 'preact';
import { Router } from 'preact-router';
import client from '../graphql/client';
import { ApolloProvider } from 'react-apollo';

import Header from './header';

// Code-splitting is automated for routes
import Home from '../routes/home';
import Projects from '../routes/project';
import NewProject from '../routes/new-project';

const App = () => (
	<ApolloProvider client={client}>
		<div id="app">
			<Header />
			<Router>
				<Home path="/" />
				<NewProject path="/new-project" />
				<Projects path="/projects/:projectId" />
			</Router>
		</div>
	</ApolloProvider>
);

export default App;
