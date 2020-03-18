import React, { useState } from 'react';
import { ImageBackground, Platform, View } from 'react-native';
import {
  Button,
  Input,
  Layout,
  Radio,
  RadioGroup,
  StyleService,
  Text,
  useStyleSheet,
} from '@ui-kitten/components';
import { KeyboardAvoidingView } from './extra/keyboard-avoiding-view.component';
import { CommentList } from './extra/comment-list.component';
import { Product, ProductColor, Comment } from './extra/data';

import { useMutation } from '@apollo/react-hooks';
import { TOGGLE_CART } from '../../../graph/ecommerce/cart.query';

import { GET_LAUNCH_DETAILS } from '../../../scenes/ecommerce/product-details-3.component';
import { GET_CART_ITEMS } from '../../../scenes/ecommerce/shopping-cart.component';

const keyboardOffset = (height: number): number => Platform.select({
  android: 0,
  ios: height,
});

export default ({ navigation, launch }): React.ReactElement => {

  const [comment, setComment] = useState<string>();
  const [selectedColorIndex, setSelectedColorIndex] = useState<number>();
  const styles = useStyleSheet(themedStyles);

  const [buyMutate, { loading: buyLoading, error: buyError }] = useMutation(
    TOGGLE_CART,
    {
      variables: { launchId: launch.id },
      refetchQueries: [
        {
          query: GET_LAUNCH_DETAILS,
          variables: { launchId: launch.id },
        },
      ]
    }
  );

  const [cartMutate, { loading: cartLoading, error: cartError }] = useMutation(
    TOGGLE_CART,
    {
      variables: { launchId: launch.id },
      ignoreResults: true,
      refetchQueries: [
        {
          query: GET_LAUNCH_DETAILS,
          variables: { launchId: launch.id },
        },
        { query: GET_CART_ITEMS }
      ],
      onCompleted: () => {
        navigation && navigation.navigate('ShoppingCart');
      },
    }
  );

  if (buyLoading || cartLoading) return <Text>Loading...</Text>;
  if (buyError || cartError) return <Text>An error occurred</Text>;

  const product: Product = new Product(
    launch.mission.name,
    launch.site,
    launch.site,
    launch.id,
    { uri: launch.mission.missionPatch },
    'H:80cm W:50cm D:40cm',
    [
      ProductColor.gray(),
      ProductColor.pink(),
      ProductColor.orange(),
    ],
    [
      Comment.byHubertFranck(),
    ],
  );

  const onBuyButtonPress = (): void => {
    navigation && navigation.navigate('Payment');
  };

  const onAddButtonPress = (): void => {
    cartMutate();
  };

  const renderColorItem = (color: ProductColor, index: number): React.ReactElement => (
    <Radio
      key={index}
      style={styles.colorRadio}
      textStyle={{ color: color.value }}
      text={color.description.toUpperCase()}
    />
  );

  const renderHeader = (): React.ReactElement => (
    <Layout style={styles.header}>
      <ImageBackground
        style={styles.image}
        source={product.image}
      />
      <Layout
        style={styles.detailsContainer}
        level='1'>
        <Text
          category='h6'>
          {product.title}
        </Text>
        <Text
          style={styles.subtitle}
          appearance='hint'
          category='p2'>
          {product.subtitle}
        </Text>
        <Text
          style={styles.price}
          category='h4'>
          {product.price}
        </Text>
        <Text
          style={styles.description}
          appearance='hint'>
          {product.description}
        </Text>
        <Text
          style={styles.sectionLabel}
          category='h6'>
          Size:
        </Text>
        <Text
          style={styles.size}
          appearance='hint'>
          {product.size}
        </Text>
        <Text
          style={styles.sectionLabel}
          category='h6'>
          Color:
        </Text>
        <RadioGroup
          style={styles.colorGroup}
          selectedIndex={selectedColorIndex}
          onChange={setSelectedColorIndex}>
          {product.colors.map(renderColorItem)}
        </RadioGroup>
        <View style={styles.actionContainer}>
          <Button
            style={styles.actionButton}
            size='giant'
            onPress={onBuyButtonPress}>
            BUY
          </Button>
          <Button
            style={styles.actionButton}
            size='giant'
            status='control'
            onPress={onAddButtonPress}>
            {launch.isInCart ? 'REMOVE' : 'ADD TO BAG'}
          </Button>
        </View>
      </Layout>
      <Input
        style={styles.commentInput}
        labelStyle={styles.commentInputLabel}
        label='Comments'
        placeholder='Write your comment'
        value={comment}
        onChangeText={setComment}
      />
    </Layout>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      offset={keyboardOffset}>
      <CommentList
        style={styles.commentList}
        data={product.comments}
        ListHeaderComponent={renderHeader}
      />
    </KeyboardAvoidingView>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'background-basic-color-2',
  },
  commentList: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    marginBottom: 8,
  },
  image: {
    height: 340,
    width: '100%',
  },
  detailsContainer: {
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  subtitle: {
    marginTop: 4,
  },
  price: {
    position: 'absolute',
    top: 24,
    right: 16,
  },
  description: {
    marginVertical: 16,
  },
  size: {
    marginBottom: 16,
  },
  colorGroup: {
    flexDirection: 'row',
    marginHorizontal: -8,
  },
  colorRadio: {
    marginHorizontal: 8,
  },
  actionContainer: {
    flexDirection: 'row',
    marginHorizontal: -8,
    marginTop: 24,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 8,
  },
  sectionLabel: {
    marginVertical: 8,
  },
  commentInputLabel: {
    fontSize: 16,
    marginBottom: 8,
    color: 'text-basic-color',
  },
  commentInput: {
    marginHorizontal: 16,
    marginVertical: 24,
  },
});
