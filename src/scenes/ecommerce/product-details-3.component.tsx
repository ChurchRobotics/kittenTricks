import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Spinner, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { SafeAreaLayout } from '../../components/safe-area-layout.component';
import { ArrowIosBackIcon, BookmarkIcon, BookmarkOutlineIcon } from '../../components/icons';
import ContentView from '../../layouts/ecommerce/product-details-3';

import { useQuery } from '@apollo/react-hooks';
import { LaunchDetails, LaunchDetailsVariables, GET_LAUNCH_DETAILS } from '../../queries/ecommerce/launch.query';

// export
export { GET_LAUNCH_DETAILS };

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

  const [bookmarked, setBookmarked] = useState<boolean>(false);

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
