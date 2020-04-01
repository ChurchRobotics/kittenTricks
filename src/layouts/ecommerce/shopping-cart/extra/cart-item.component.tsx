import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Button, ListItem, ListItemProps, Spinner, Text } from '@ui-kitten/components';

import { CloseIcon, MinusIcon, PlusIcon } from './icons';
import { Product } from './data';

import { useQuery } from '@apollo/react-hooks';
import { GetLaunch, GetLaunchVariables, GET_LAUNCH } from '../../../../queries/ecommerce/launch.query';

export type CartItemProps = ListItemProps & {
  index: number;
  product: Product;
  onProductChange: (product: Product, index: number) => void;
  onRemove: (product: Product, index: number) => void;
};

export const CartItem = (props: CartItemProps): React.ReactElement => {

  const { style, index, onProductChange, onRemove, ...listItemProps } = props;
  let { product } = props;
  const { data, loading, error } = useQuery<GetLaunch, GetLaunchVariables>(
    GET_LAUNCH,
    { variables: { launchId: String(product.id) } }
  );

  const decrementButtonEnabled = (): boolean => {
    return product.amount > 1;
  };

  const onRemoveButtonPress = (): void => {
    onRemove(product, index);
  };

  const onMinusButtonPress = (): void => {
    const updatedProduct: Product = new Product(
      product.id,
      product.title,
      product.subtitle,
      product.image,
      product.price,
      product.amount - 1,
    );

    onProductChange(updatedProduct, index);
  };

  const onPlusButtonPress = (): void => {
    const updatedProduct: Product = new Product(
      product.id,
      product.title,
      product.subtitle,
      product.image,
      product.price,
      product.amount + 1,
    );

    onProductChange(updatedProduct, index);
  };

  const renderItem = (): React.ReactElement => {
    if (loading) return <Spinner animating={true} size="small" />;
    if (error) return <Text>ERROR: {error.message}</Text>;
    if (!data) return <Text>Not found</Text>;

    const launch = data.launch;

    product = new Product(
      product.id,
      launch.mission.name,
      launch.rocket.name,
      { uri: launch.mission.missionPatch },
      Number(product.id),
      1,
    );
  
    return (
      <React.Fragment>
        <Image
          style={styles.image}
          source={product.image}
        />
        <View style={styles.detailsContainer}>
          <Text
            category='s1'>
            {product.title}
          </Text>
          <Text
            appearance='hint'
            category='p2'>
            {product.subtitle}
          </Text>
          <Text category='s2'>
            {product.formattedPrice}
          </Text>
          <View style={styles.amountContainer}>
            <Button
              style={[styles.iconButton, styles.amountButton]}
              size='tiny'
              icon={MinusIcon}
              onPress={onMinusButtonPress}
              disabled={!decrementButtonEnabled()}
            />
            <Text
              style={styles.amount}
              category='s2'>
              {`${product.amount}`}
            </Text>
            <Button
              style={[styles.iconButton, styles.amountButton]}
              size='tiny'
              icon={PlusIcon}
              onPress={onPlusButtonPress}
            />
          </View>
        </View>
        <Button
          style={[styles.iconButton, styles.removeButton]}
          appearance='ghost'
          status='basic'
          icon={CloseIcon}
          onPress={onRemoveButtonPress}
        />
      </React.Fragment>
    );
  };

  return (
    <ListItem
      {...listItemProps}
      style={[styles.container, style]}>
      {renderItem()}
    </ListItem>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  image: {
    width: 120,
    height: 144,
  },
  detailsContainer: {
    flex: 1,
    height: '100%',
    padding: 16,
  },
  amountContainer: {
    position: 'absolute',
    flexDirection: 'row',
    left: 16,
    bottom: 16,
  },
  amountButton: {
    borderRadius: 16,
  },
  amount: {
    textAlign: 'center',
    width: 40,
  },
  removeButton: {
    position: 'absolute',
    right: 0,
  },
  iconButton: {
    paddingHorizontal: 0,
  },
});
