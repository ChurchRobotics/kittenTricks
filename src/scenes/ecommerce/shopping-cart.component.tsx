import React from 'react';
import { StyleSheet } from 'react-native';
import { Spinner, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { SafeAreaLayout } from '../../components/safe-area-layout.component';
import { ArrowIosBackIcon, SearchIcon } from '../../components/icons';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import ContentView from '../../layouts/ecommerce/shopping-cart';

export const GET_CART_ITEMS = gql`
  query GetCartItems {
    cartItems @client
  }
`;

export interface GetCartItems {
  cartItems: string[];
}

export const ShoppingCartScreen = ({ navigation }): React.ReactElement => {
  const { 
    data, 
    loading, 
    error 
  } = useQuery<GetCartItems>(GET_CART_ITEMS);

  const onSearchActionPress = (): void => {
    navigation.navigate('ProductList');
  };

  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={ArrowIosBackIcon}
      onPress={navigation.goBack}
    />
  );

  const renderSearchAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={SearchIcon}
      onPress={onSearchActionPress}
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
        title='Shopping Cart'
        leftControl={renderBackAction()}
        rightControls={[renderSearchAction()]}
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
