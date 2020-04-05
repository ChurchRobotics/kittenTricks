import gql from 'graphql-tag';
import { LAUNCH_TILE_DATA } from './launch.query';

// types
export * from './__generated__/BookTrips';
export * from './__generated__/cancel';
export * from './__generated__/GetMyTrips';

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
