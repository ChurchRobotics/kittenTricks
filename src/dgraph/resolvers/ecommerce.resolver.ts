import { ApolloCache } from 'apollo-cache';
import { Resolvers } from 'apollo-client';

import { GetCartItems, GET_CART_ITEMS } from '../../queries/ecommerce/cart.query';

/**
 * local eCommerce resolvers
 */
export const eCommerceResolvers: Resolvers = {
  Launch: {
    isInCart: (launch, _, { cache }: { cache: ApolloCache<any> }): boolean => {
      const queryResult = cache.readQuery<GetCartItems>({ query: GET_CART_ITEMS });
      if (!queryResult) return false;
      return queryResult.cartItems.includes(launch.id);
    }
  },

  Mutation: {
    addOrRemoveFromCart: (_, { id }: { id: string }, { cache }: { cache: ApolloCache<any> }): string[] => {
      const queryResult = cache.readQuery<GetCartItems>({ query: GET_CART_ITEMS });
      if (!queryResult) return [];

      const { cartItems } = queryResult;
      const data = {
        cartItems: cartItems.includes(id)
          ? cartItems.filter((i) => i !== id)
          : [...cartItems, id],
      };
      cache.writeQuery({ query: GET_CART_ITEMS, data });
      return data.cartItems;
    },
  },
};
