import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { HttpLink } from 'apollo-link-http';
import { AppStorage } from '../services/app-storage.service';

import { typeDefs } from './schema';
import { resolvers } from './resolvers';

export function createApolloClient()
  : ApolloClient<NormalizedCacheObject> {
  // Set up our apollo-client to point at the server we created
  // this can be local or a remote endpoint
  const GRAPHQL_URI = 'http://10.0.2.2:4000/graphql';
  const cache = new InMemoryCache();

  cache.writeData({
    data: {
      cartItems: [],
    },
  });

  const authLink = setContext(async (_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = await AppStorage.getAccessToken()
      || 'c29wbC53YW5nQGdtYWlsLmNvbQ==';
    // return the headers to the context so httpLink can read them
    return !token ? { headers } : {
      headers: {
        ...headers,
        authorization: token,
      }
    }
  });

  return new ApolloClient({
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
};
