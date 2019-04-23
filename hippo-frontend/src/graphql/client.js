import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const GRAPHQL_ENDPOINT = 'http://localhost:4001/graphql';
const client = new ApolloClient({
	link: new HttpLink({ uri: GRAPHQL_ENDPOINT }),
	cache: new InMemoryCache()
});

export default client;
