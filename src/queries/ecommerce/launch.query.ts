import gql from 'graphql-tag';

// types
export * from './__generated__/GetLaunch';
export * from './__generated__/GetLaunchList';
export * from './__generated__/LaunchDetails';
export * from './__generated__/LaunchTile';

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
