import { Resolvers } from 'apollo-client';
import { AppStorage } from '../../services/app-storage.service';

/**
 * local auth resolvers
 */
export const authResolvers: Resolvers = {
  Query: {
    isLoggedIn: async (): Promise<boolean> =>
      (!!await AppStorage.getRefreshToken()),
  }
};
