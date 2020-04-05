import { eCommerceResolvers } from './ecommerce.resolver';
import { userResolvers } from './user.resolver';

export { typeDefs } from './schema';

export const resolvers = [
  userResolvers,
  eCommerceResolvers,
];
