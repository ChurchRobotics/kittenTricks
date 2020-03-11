import React from 'react';
import { StyleSheet } from 'react-native';
import { Spinner, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { SafeAreaLayout } from '../../components/safe-area-layout.component';
import { ArrowIosBackIcon } from '../../components/icons';

import ContentView from '../../layouts/books/book-list';

import { useQuery } from '@apollo/react-hooks';
import { GetMyTrips, GET_MY_TRIPS } from '../../datagraph/ecommerce/trips.query';

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
