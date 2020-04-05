import gql from 'graphql-tag';
import { eCommerceResolvers } from './ecommerce-api';
import { userResolvers } from './user-api';

export const resolvers = [
  userResolvers,
  eCommerceResolvers,
];

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    cartItems: [ID!]!
  }

  extend type Launch {
    isInCart: Boolean!
  }

  extend type Mutation {
    addOrRemoveFromCart(id: ID!): [ID!]!
  }
`;
