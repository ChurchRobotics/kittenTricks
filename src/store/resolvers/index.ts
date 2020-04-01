import { authTypeDefs, authResolvers } from './auth.resolver';
import { eCommerceTypeDefs, eCommerceResolvers } from './ecommerce.resolver';

export const localTypeDefs = [
  authTypeDefs,
  eCommerceTypeDefs,
];

export const localResolvers = [
  authResolvers,
  eCommerceResolvers,
];
