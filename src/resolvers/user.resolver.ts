import { Resolvers } from 'apollo-client';
import { AppStorage } from '../services/app-storage.service';

export const userResolvers: Resolvers = {
  Query: {
    isLoggedIn: async (): Promise<boolean> =>
      (!!await AppStorage.getRefreshToken()),
  }
};
