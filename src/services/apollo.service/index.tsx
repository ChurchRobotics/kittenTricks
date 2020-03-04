import React from 'react';

import { ApolloProvider as ApolloProvider_ } from '@apollo/react-hooks';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { HttpLink } from 'apollo-link-http';
import gql from 'graphql-tag';

import { resolvers, typeDefs } from './resolvers';

// Set up our apollo-client to point at the server we created
// this can be local or a remote endpoint
const GRAPHQL_URI = 'http://10.0.2.2:4000/graphql';
const cache = new InMemoryCache();

const GET_ACCESS_TOKEN = gql`
  query GetAccessToken {
    accessToken @client
  }
`;

interface GetAccessToken {
  accessToken: string;
}

const authLink = setContext((_, { headers }) => {
  // get the authentication token from cache
  const token = 'c29wbC53YW5nQGdtYWlsLmNvbQ==';
  // const { accessToken: token } =
  //   cache.readQuery<GetAccessToken>({ query: GET_ACCESS_TOKEN });

  return !token ? { headers } : {
    headers: {
      authorization: token,
      ...headers,
    }
  }
});

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
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

export interface ApolloProviderProps {
  initialConfig?: Record<string, any>;
  children: React.ReactNode | React.ReactNode[] | null;
}

export function ApolloProvider(props: ApolloProviderProps): React.ReactElement {
  const initialConfig = props.initialConfig || {};

  // initialize cache with initial config
  cache.writeData({
    data: {
      ...initialConfig,
      isLoggedIn: !!initialConfig['refreshToken'],
      cartItems: [],
    },
  });

  return (
    <ApolloProvider_ client={client}>
      {props.children}
    </ApolloProvider_>
  );
}

