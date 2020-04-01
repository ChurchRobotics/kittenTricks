import { Resolvers } from 'apollo-client';
import gql from 'graphql-tag';

/**
 * auth graph extension
 */
export const authTypeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
  }
`;

/**
 * auth local resolvers
 */
export const authResolvers: Resolvers = {
};
