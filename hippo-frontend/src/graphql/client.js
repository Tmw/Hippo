import { ApolloClient } from "apollo-client";
import {
  InMemoryCache,
  IntrospectionFragmentMatcher
} from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";

import * as AbsintheSocket from "@absinthe/socket";
import { createAbsintheSocketLink } from "@absinthe/socket-apollo-link";
import { Socket as PhoenixSocket } from "phoenix";
import { split } from "apollo-link";
import { getMainDefinition } from "apollo-utilities";

import introspectionQueryResultData from "graphql/fragmentTypes.json";

import config from "config";
import getSessionToken from "session.js";

const httpLink = new HttpLink({
  uri: config.apiUrl,
  headers: { "x-session-token": getSessionToken() }
});

const wsLink = createAbsintheSocketLink(
  AbsintheSocket.create(
    new PhoenixSocket(config.wsUrl, {
      params: {
        sessionToken: getSessionToken()
      }
    })
  )
);

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});

export default new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    link
  ]),
  cache: new InMemoryCache({
    fragmentMatcher,
    cacheRedirects: {
      Query: {
        lane: (_, { id }, { getCacheKey }) =>
          getCacheKey({ __typename: "Lane", id }),

        card: (_, { id }, { getCacheKey }) =>
          getCacheKey({ __typename: "Card", id })
      }
    }
  })
});
