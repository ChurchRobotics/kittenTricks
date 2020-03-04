import React from 'react';
import { StyleSheet } from 'react-native';
import { Spinner, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { SafeAreaLayout } from '../../components/safe-area-layout.component';
import { ArrowIosBackIcon, BookmarkIcon, BookmarkOutlineIcon } from '../../components/icons';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import ContentView from '../../layouts/ecommerce/product-details-3';

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

const GET_LAUNCH_DETAILS = gql`
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

export interface LaunchDetails_launch_rocket {
  __typename: "Rocket";
  type: string | null;
  id: string;
  name: string | null;
}

export interface LaunchDetails_launch_mission {
  __typename: "Mission";
  name: string | null;
  missionPatch: string | null;
}

export interface LaunchDetails_launch {
  __typename: "Launch";
  isInCart: boolean;
  site: string | null;
  rocket: LaunchDetails_launch_rocket | null;
  id: string;
  isBooked: boolean;
  mission: LaunchDetails_launch_mission | null;
}

export interface LaunchDetails {
  launch: LaunchDetails_launch | null;
}

export interface LaunchDetailsVariables {
  launchId: string;
}

export const ProductDetails3Screen = ({ route, navigation }): React.ReactElement => {
  const { itemId: launchId } = route.params || {};

  const { 
    data, 
    loading, 
    error 
  } = useQuery<
    LaunchDetails, 
    LaunchDetailsVariables
  >(GET_LAUNCH_DETAILS, 
    { variables: { launchId } }
  );

  const [bookmarked, setBookmarked] = React.useState<boolean>(false);

  const onBookmarkActionPress = (): void => {
    setBookmarked(!bookmarked);
  };

  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={ArrowIosBackIcon}
      onPress={navigation.goBack}
    />
  );

  const renderBookmarkAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={bookmarked ? BookmarkIcon : BookmarkOutlineIcon}
      onPress={onBookmarkActionPress}
    />
  );

  const renderContent = (): React.ReactElement => {
    if (loading) return <Spinner animating={true} size="large" />;
    if (error) return <Text>ERROR: {error.message}</Text>;
    if (!data) return <Text>Not found</Text>;
    return <ContentView navigation={navigation} {...data} />
  };

  return (
    <SafeAreaLayout
      style={styles.container}
      insets='top'>
      <TopNavigation
        title='Product Details'
        leftControl={renderBackAction()}
        rightControls={[renderBookmarkAction()]}
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
