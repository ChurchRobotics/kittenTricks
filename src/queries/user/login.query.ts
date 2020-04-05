import gql from 'graphql-tag';

// types
export * from './__generated__/IsUserLoggedIn';

/**
 * {@link IsUserLoggedIn} query
 */
export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;
