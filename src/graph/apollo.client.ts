import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { HttpLink } from 'apollo-link-http';
import { AppStorage } from '../services/app-storage.service';

import { authResolvers, authTypeDefs } from './auth/extension';
import { eCommerceResolvers, eCommerceTypeDefs } from './ecommerce/extension';

// Set up our apollo-client to point at the server we created
// this can be local or a remote endpoint
const GRAPHQL_URI = 'http://10.0.2.2:4000/graphql';
const cache = new InMemoryCache();

cache.writeData({
  data: {
    isLoggedIn: false,
    cartItems: [],
  },
});

const authLink = setContext(async (_, { headers }) => {
  // get authentication token from storage
  const token = await AppStorage.getAccessToken()
    || 'c29wbC53YW5nQGdtYWlsLmNvbQ==';

  return !token ? { headers } : {
    headers: {
      authorization: token,
      ...headers,
    }
  }
});

const typeDefs = [
  authTypeDefs,
  eCommerceTypeDefs,
];

const resolvers = [
  authResolvers,
  eCommerceResolvers,
];

export const apolloClient: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link: authLink.concat(new HttpLink({
    uri: GRAPHQL_URI,
    headers: {
      'client-name': 'Space Explorer [web]',
      'client-version': '1.0.0',
    },
  })),
  typeDefs,
  resolvers,
});
