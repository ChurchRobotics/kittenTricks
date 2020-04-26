import React from 'react';

import { AppearanceProvider } from 'react-native-appearance';
import { SafeAreaProvider } from 'react-native-safe-area-context';
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
import { TokenStore } from '../services/token.service';
import { createApolloClient } from '../datagraph';
import { ApolloProvider } from '@apollo/react-hooks';

const loadingTasks: Task[] = [
  // Should be used it when running Expo.
  // In Bare RN Project this is configured by react-native.config.js
  () => LoadFontsTask({
    'opensans-regular': require('../assets/fonts/opensans-regular.ttf'),
    'roboto-regular': require('../assets/fonts/roboto-regular.ttf'),
  }),
  async () => ['mapping', await AppStorage.getMapping(defaultConfig.mapping)],
  async () => ['theme', await AppStorage.getTheme(defaultConfig.theme)],
  async () => ['isLoggedIn', !!await TokenStore.getRefreshToken()],
];

const defaultConfig: { mapping: Mapping, theme: Theme, backend: string } = {
  mapping: 'eva',
  theme: 'light',
  backend: 'http://madoka.local:4000/graphql', /*'http://10.0.2.2:4000/graphql'*/
};

const App = ({ mapping, theme }): React.ReactElement => {

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
    {config => (
      <ApolloProvider client={createApolloClient(config)}>
        <App {...config} />
      </ApolloProvider>
    )}
  </AppLoading>
);
