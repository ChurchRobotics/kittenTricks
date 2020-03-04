import React from 'react';
import { StyleSheet } from 'react-native';
import { Spinner, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { SafeAreaLayout } from '../../components/safe-area-layout.component';
import { ArrowIosBackIcon } from '../../components/icons';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import ContentView from '../../layouts/books/book-list';

const LAUNCH_TILE_DATA = gql`
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

export interface GetMyTrips_me_trips_rocket {
  __typename: "Rocket";
  id: string;
  name: string | null;
}

export interface GetMyTrips_me_trips_mission {
  __typename: "Mission";
  name: string | null;
  missionPatch: string | null;
}

export interface GetMyTrips_me_trips {
  __typename: "Launch";
  id: string;
  isBooked: boolean;
  rocket: GetMyTrips_me_trips_rocket | null;
  mission: GetMyTrips_me_trips_mission | null;
}

export interface GetMyTrips_me {
  __typename: "User";
  id: string;
  email: string;
  trips: (GetMyTrips_me_trips | null)[];
}

export interface GetMyTrips {
  me: GetMyTrips_me | null;
}

export const BookListScreen = ({ navigation }): React.ReactElement => {
  const {
    data,
    loading,
    error
  } = useQuery<GetMyTrips>(
    GET_MY_TRIPS,
    { fetchPolicy: "network-only" }
  );

  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={ArrowIosBackIcon}
      onPress={navigation.goBack}
    />
  );

  const renderContent = (): React.ReactElement => {
    if (loading) return <Spinner animating={true} size="large" />;
    if (error) return <Text>ERROR: {error.message}</Text>;
    if (!data) return <Text>Not found</Text>;
    return <ContentView navigation={navigation} {...data.me} />
  };

  return (
    <SafeAreaLayout
      style={styles.container}
      insets='top'>
      <TopNavigation
        title='Book Request'
        leftControl={renderBackAction()}
      />
      {renderContent()}
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
