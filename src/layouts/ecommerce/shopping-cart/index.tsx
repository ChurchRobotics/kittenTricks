import React from 'react';
import { ListRenderItemInfo } from 'react-native';
import { Button, Layout, List, StyleService, Text, useStyleSheet } from '@ui-kitten/components';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { CartItem, GET_LAUNCH } from './extra/cart-item.component';
import { Product } from './extra/data';

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

export interface BookTrips_bookTrips_launches {
  __typename: "Launch";
  id: string;
  isBooked: boolean;
}

export interface BookTrips_bookTrips {
  __typename: "TripUpdateResponse";
  success: boolean;
  message: string | null;
  launches: (BookTrips_bookTrips_launches | null)[] | null;
}

export interface BookTrips {
  bookTrips: BookTrips_bookTrips;
}

export interface BookTripsVariables {
  launchIds: (string | null)[];
}

export default ({ navigation, cartItems }): React.ReactElement => {
  const initialProducts: Product[] = cartItems.map(o => new Product(
    o, '', '', null, 0, 0
  ));
  
  const [bookTrips, { data, error }] = useMutation<BookTrips, BookTripsVariables>(
    BOOK_TRIPS,
    {
      variables: { launchIds: cartItems },
      refetchQueries: cartItems.map(launchId => ({
        query: GET_LAUNCH,
        variables: { launchId },
      })),
      update(cache) {
        cache.writeData({ data: { cartItems: [] } });
      }
    }
  );

  const styles = useStyleSheet(themedStyle);
  const [products, setProducts] = React.useState<Product[]>(initialProducts);

  if (error) {
    console.log(error);
  }

  const totalCost = (): number => {
    return products.reduce((acc: number, product: Product): number => acc + product.totalPrice, 0);
  };

  const onItemRemove = (product: Product, index: number): void => {
    products.splice(index, 1);
    setProducts([...products]);
  };

  const onItemChange = (product: Product, index: number): void => {
    products[index] = product;
    setProducts([...products]);
  };

  const renderFooter = (): React.ReactElement => (
    <Layout style={styles.footer}>
      <Text category='h5'>Total Cost:</Text>
      <Text category='h5'>{`$${totalCost()}`}</Text>
    </Layout>
  );

  const renderProductItem = (info: ListRenderItemInfo<Product>): React.ReactElement => (
    <CartItem
      style={styles.item}
      index={info.index}
      product={info.item}
      onProductChange={onItemChange}
      onRemove={onItemRemove}
    />
  );

  return (
    <Layout
      style={styles.container}
      level='2'>
      <List
        data={products}
        renderItem={renderProductItem}
        ListFooterComponent={renderFooter}
      />
      <Button
        style={styles.checkoutButton}
        size='giant'
        onPress={() => bookTrips()}>
        CHECKOUT
      </Button>
    </Layout>
  );
};

const themedStyle = StyleService.create({
  container: {
    flex: 1,
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: 'background-basic-color-3',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 0.5,
    paddingVertical: 28,
    paddingHorizontal: 16,
  },
  checkoutButton: {
    marginHorizontal: 16,
    marginVertical: 24,
  },
});

