import ApolloClient from "apollo-boost";

const uri = "http://localhost:4000/graphql";
export default new ApolloClient({
  uri,
  cacheRedirects: {
    Query: {
      lane: (_, { id }, { getCacheKey }) =>
        getCacheKey({ __typename: "Lane", id }),

      card: (_, { id }, { getCacheKey }) =>
        getCacheKey({ __typename: "Card", id })
    }
  }
});
