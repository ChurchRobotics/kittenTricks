import { AsyncStorage, YellowBox } from 'react-native';
import { Mapping, Theme } from './theme.service';

const MAPPING_KEY: string = 'mapping';
const THEME_KEY: string = 'theme';
const REFRESH_TOKEN_KEY: string = 'refresh.token';
const ACCESS_TOKEN_KEY: string = 'access.token';

export class AppStorage {

  static async getMapping(fallback?: Mapping): Promise<Mapping> {
    return await AsyncStorage.getItem(MAPPING_KEY) as Mapping || fallback;
  };

  static setMapping(mapping: Mapping): Promise<void> {
    return AsyncStorage.setItem(MAPPING_KEY, mapping);
  };

  static async getTheme(fallback?: Theme): Promise<Theme> {
    return await AsyncStorage.getItem(THEME_KEY) as Theme || fallback;
  };

  static setTheme(theme: Theme): Promise<void> {
    return AsyncStorage.setItem(THEME_KEY, theme);
  };

  static async getRefreshToken(): Promise<string> {
    return await AsyncStorage.getItem(REFRESH_TOKEN_KEY) || '';
  };

  static setRefreshToken(token: string): Promise<void> {
    return AsyncStorage.setItem(REFRESH_TOKEN_KEY, token);
  };

  // accessToken cache for hot access
  static accessToken: string = null;

  static async getAccessToken(): Promise<string> {
    if (AppStorage.accessToken !== null) return AppStorage.accessToken;
    return AppStorage.accessToken = await AsyncStorage.getItem(ACCESS_TOKEN_KEY) || '';
  };

  static setAccessToken(token: string): Promise<void> {
    AppStorage.accessToken = token;
    return AsyncStorage.setItem(ACCESS_TOKEN_KEY, token);
  };
}

/**
 * In a Bare React Native project you should use
 * https://github.com/react-native-community/async-storage
 *
 * However, Expo runs AsyncStorage exported from react-native.
 * Just to save application bundle size, we still using this one.
 */
YellowBox.ignoreWarnings(['AsyncStorage has been extracted']);
