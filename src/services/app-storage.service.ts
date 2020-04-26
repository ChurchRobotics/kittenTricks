import { AsyncStorage, YellowBox } from 'react-native';
import { Mapping, Theme } from './theme.service';

const MAPPING_KEY: string = 'mapping';
const THEME_KEY: string = 'theme';
const AUTHORIZATION_KEY: string = 'authorization';

export class AppStorage {
  static async getMapping(fallback?: Mapping): Promise<Mapping> {
    return await AsyncStorage.getItem(MAPPING_KEY) as Mapping || fallback;
  }

  static setMapping(mapping: Mapping): Promise<void> {
    return AsyncStorage.setItem(MAPPING_KEY, mapping);
  }

  static async getTheme(fallback?: Theme): Promise<Theme> {
    return await AsyncStorage.getItem(THEME_KEY) as Theme || fallback;
  }

  static setTheme(theme: Theme): Promise<void> {
    return AsyncStorage.setItem(THEME_KEY, theme);
  }

  static async getAuthorization(fallback?: string): Promise<string> {
    return await AsyncStorage.getItem(AUTHORIZATION_KEY) || fallback;
  }

  static setAuthorization(authorization: string): Promise<void> {
    return AsyncStorage.setItem(AUTHORIZATION_KEY, authorization);
  }
}

/**
 * In a Bare React Native project you should use
 * https://github.com/react-native-community/async-storage
 *
 * However, Expo runs AsyncStorage exported from react-native.
 * Just to save application bundle size, we still using this one.
 */
YellowBox.ignoreWarnings(['AsyncStorage has been extracted']);
