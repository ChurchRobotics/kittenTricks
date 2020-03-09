import gql from 'graphql-tag';

// types
export * from './types/GetLaunchList';
export * from './types/GetLaunch';
export * from './types/LaunchDetails';
export * from './types/LaunchTile';

export * from './types/GetCartItems';
export * from './types/addOrRemoveFromCart';

export * from './types/GetMyTrips';
export * from './types/BookTrips';
export * from './types/cancel';

/**
 * {@link LaunchTile} fragment
 */
export const LAUNCH_TILE_DATA = gql`
  fragment LaunchTile on Launch {
    __typename
    id
    isBooked
    rocket {
      id
      name
    }
    mission {
      name
      missionPatch
    }
  }
`;

/**
 * {@link GetLaunchList} query
 */
export const GET_LAUNCHES = gql`
  query GetLaunchList($after: String) {
    launches(after: $after) {
      cursor
      hasMore
      launches {
        ...LaunchTile
      }
    }
  }
  ${LAUNCH_TILE_DATA}
`;

/**
 * {@link GetLaunch} query
 */
export const GET_LAUNCH = gql`
  query GetLaunch($launchId: ID!) {
    launch(id: $launchId) {
      ...LaunchTile
    }
  }
  ${LAUNCH_TILE_DATA}
`;

/**
 * {@link LaunchDetails} query
 */
export const GET_LAUNCH_DETAILS = gql`
  query LaunchDetails($launchId: ID!) {
    launch(id: $launchId) {
      isInCart @client
      site
      rocket {
        type
      }
      ...LaunchTile
    }
  }
  ${LAUNCH_TILE_DATA}
`;

/**
 * {@link GetCartItems} query
 */
export const GET_CART_ITEMS = gql`
  query GetCartItems {
    cartItems @client
  }
`;

/**
 * {@link addOrRemoveFromCart} mutation
 */
export const TOGGLE_CART = gql`
  mutation addOrRemoveFromCart($launchId: ID!) {
    addOrRemoveFromCart(id: $launchId) @client
  }
`;

/**
 * {@link GetMyTrips} mutation
 */
export const GET_MY_TRIPS = gql`
  query GetMyTrips {
    me {
      id
      email
      trips {
        ...LaunchTile
      }
    }
  }
  ${LAUNCH_TILE_DATA}
`;

/**
 * {@link BookTrips} mutation
 */
export const BOOK_TRIPS = gql`
  mutation BookTrips($launchIds: [ID]!) {
    bookTrips(launchIds: $launchIds) {
      success
      message
      launches {
        id
        isBooked
      }
    }
  }
`;

/**
 * {@link cancel} mutation
 */
export const CANCEL_TRIP = gql`
  mutation cancel($launchId: ID!) {
    cancelTrip(launchId: $launchId) {
      success
      message
      launches {
        id
        isBooked
      }
    }
  }
`;
