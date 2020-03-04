import React from 'react';
import { Dimensions, ImageBackground, ListRenderItemInfo, View } from 'react-native';
import { Button, Card, List, Spinner, StyleService, Text, useStyleSheet } from '@ui-kitten/components';
import { CartIcon } from './extra/icons';
import { Product } from './extra/data';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

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

const GET_LAUNCHES = gql`
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

export interface GetLaunchList_launches_launches_rocket {
  __typename: "Rocket";
  id: string;
  name: string | null;
}

export interface GetLaunchList_launches_launches_mission {
  __typename: "Mission";
  name: string | null;
  missionPatch: string | null;
}

export interface GetLaunchList_launches_launches {
  __typename: "Launch";
  id: string;
  isBooked: boolean;
  rocket: GetLaunchList_launches_launches_rocket | null;
  mission: GetLaunchList_launches_launches_mission | null;
}

export interface GetLaunchList_launches {
  __typename: "LaunchConnection";
  cursor: string;
  hasMore: boolean;
  launches: (GetLaunchList_launches_launches | null)[];
}

export interface GetLaunchList {
  launches: GetLaunchList_launches;
}

export interface GetLaunchListVariables {
  after?: string | null;
}

export const ProductListScreen = ({ navigation, route }): React.ReactElement => {
  const { 
    data,
    loading,
    error,
    fetchMore
  } = useQuery<
    GetLaunchList, 
    GetLaunchListVariables
  >(GET_LAUNCHES);

  const styles = useStyleSheet(themedStyles);

  if (loading) return <Spinner animating={true} size="large" />;
  if (error || !data) return <Text>ERROR</Text>;

  const products = data.launches.launches.map(it => new Product(
    it.mission.name,
    'Furniture',
    { uri: it.mission.missionPatch },
    Number(it.id),
    1,
  ));

  const displayProducts: Product[] = products.filter(product => product.category === 'Furniture');

  const onItemPress = (item: Product): void => {
    navigation && navigation.navigate('ProductDetails3', { itemId: String(item.price) });
  };

  const onItemCartPress = (index: number): void => {
    navigation && navigation.navigate('ShoppingCart');
  };

  const renderItemFooter = (info: ListRenderItemInfo<Product>): React.ReactElement => (
    <View style={styles.itemFooter}>
      <Text category='s1'>
        {info.item.formattedPrice}
      </Text>
      <Button
        style={styles.iconButton}
        size='small'
        icon={CartIcon}
        onPress={() => onItemCartPress(info.index)}
      />
    </View>
  );

  const renderItemHeader = (info: ListRenderItemInfo<Product>): React.ReactElement => (
    <ImageBackground
      style={styles.itemHeader}
      source={info.item.image}
    />
  );

  const renderProductItem = (info: ListRenderItemInfo<Product>): React.ReactElement => (
    <Card
      style={styles.productItem}
      header={() => renderItemHeader(info)}
      footer={() => renderItemFooter(info)}
      onPress={() => onItemPress(info.item)}>
      <Text category='s1'>
        {info.item.title}
      </Text>
      <Text
        appearance='hint'
        category='c1'>
        {info.item.category}
      </Text>
    </Card>
  );

  return (
    <List
      contentContainerStyle={styles.productList}
      data={displayProducts.length && displayProducts || products}
      numColumns={2}
      renderItem={renderProductItem}
    />
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'background-basic-color-2',
  },
  productList: {
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  productItem: {
    flex: 1,
    margin: 8,
    maxWidth: Dimensions.get('window').width / 2 - 24,
    backgroundColor: 'background-basic-color-1',
  },
  itemHeader: {
    height: 140,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconButton: {
    paddingHorizontal: 0,
  },
});
