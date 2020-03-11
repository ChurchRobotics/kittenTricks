import { ApolloCache } from 'apollo-cache';
import { Resolvers } from 'apollo-client';
import gql from 'graphql-tag';

import { GetCartItems, GET_CART_ITEMS } from './cart.query';

/**
 * eCommerce graph extension
 */
export const eCommerceTypeDefs = gql`
  extend type Query {
    cartItems: [ID!]!
  }

  extend type Launch {
    isInCart: Boolean!
  }

  extend type Mutation {
    addOrRemoveFromCart(id: ID!): [ID!]!
  }
`;

/**
 * eCommerce local resolvers
 */
export const eCommerceResolvers: Resolvers = {
  Launch: {
    isInCart(launch, _, { cache } : { cache: ApolloCache<any> }): boolean {
      const queryResult = cache.readQuery<GetCartItems>({ query: GET_CART_ITEMS });
      if (!queryResult) return false;
      return queryResult.cartItems.includes(launch.id);
    }
  },

  Mutation: {
    addOrRemoveFromCart(_, { id }: { id: string }, { cache } : { cache: ApolloCache<any> }): string[] {
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
