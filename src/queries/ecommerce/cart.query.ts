import gql from 'graphql-tag';

// types
export * from './__generated__/addOrRemoveFromCart';
export * from './__generated__/GetCartItems';

/**
 * {@link GetCartItems} query
 */
export const GET_CART_ITEMS = gql`
  query GetCartItems {
    cartItems @client
  }
`;

/**
 * {@link addOrRemoveFromCart} mutation
 */
export const TOGGLE_CART = gql`
  mutation addOrRemoveFromCart($launchId: ID!) {
    addOrRemoveFromCart(id: $launchId) @client
  }
`;
