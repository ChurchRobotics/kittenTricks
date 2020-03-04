import React from 'react';

import { AppearanceProvider } from 'react-native-appearance';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AppLoading, LoadFontsTask, Task } from './app-loading.component';
import { appMappings, appThemes } from './app-theming';
import { AppIconsPack } from './app-icons-pack';
import { StatusBar } from '../components/status-bar.component';
import { SplashImage } from '../components/splash-image.component';
import { AppNavigator } from '../navigation/app.navigator';
import { AppStorage } from '../services/app-storage.service';
import { Mapping, Theme, Theming } from '../services/theme.service';
import { ApolloProvider } from '../services/apollo.service';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

// Enable native screens
enableScreens();

const loadingTasks: Task[] = [
  // Should be used it when running Expo.
  // In Bare RN Project this is configured by react-native.config.js
  () => LoadFontsTask({
    'opensans-regular': require('../assets/fonts/opensans-regular.ttf'),
    'roboto-regular': require('../assets/fonts/roboto-regular.ttf'),
  }),
  async () => ['mapping', await AppStorage.getMapping(defaultConfig.mapping)],
  async () => ['theme', await AppStorage.getTheme(defaultConfig.theme)],
  async () => ['refreshToken', await AppStorage.getRefreshToken()],
  async () => ['accessToken', await AppStorage.getAccessToken()],
];

const defaultConfig: { mapping: Mapping, theme: Theme } = {
  mapping: 'eva',
  theme: 'light',
};

const GET_MAPPING_AND_THEME = gql`
  query GetMappingAndTheme {
    mapping @client
    theme @client
  }
`;

interface GetMappingAndTheme {
  mapping: Mapping;
  theme: Theme;
}

const App = (): React.ReactElement => {
  const { data: { mapping, theme } }
    = useQuery<GetMappingAndTheme>(GET_MAPPING_AND_THEME);
  const [mappingContext, currentMapping] = Theming.useMapping(appMappings, mapping);
  const [themeContext, currentTheme] = Theming.useTheming(appThemes, mapping, theme);

  return (
    <React.Fragment>
      <IconRegistry icons={[EvaIconsPack, AppIconsPack]} />
      <AppearanceProvider>
        <ApplicationProvider {...currentMapping} theme={currentTheme}>
          <Theming.MappingContext.Provider value={mappingContext}>
            <Theming.ThemeContext.Provider value={themeContext}>
              <SafeAreaProvider>
                <StatusBar />
                <AppNavigator />
              </SafeAreaProvider>
            </Theming.ThemeContext.Provider>
          </Theming.MappingContext.Provider>
        </ApplicationProvider>
      </AppearanceProvider>
    </React.Fragment>
  );
};

const Splash = ({ loading }): React.ReactElement => (
  <SplashImage
    loading={loading}
    source={require('../assets/images/image-splash.png')}
  />
);

export default (): React.ReactElement => (
  <AppLoading
    tasks={loadingTasks}
    initialConfig={defaultConfig}
    placeholder={Splash}>
    {props => (
      <ApolloProvider initialConfig={props}>
        <App />
      </ApolloProvider>
    )}
  </AppLoading>
);
