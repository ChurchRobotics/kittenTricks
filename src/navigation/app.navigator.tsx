import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/core';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StoreNavigator } from './store.navigator';
import { TodayNavigator } from './today.navigator'
import { WorkbenchNavigator } from './workbench.navigator';
import { MessagingNavigator } from './messaging.navigator';
import { MeNavigator } from './me.navigator';
import { AppBottomNavigation } from '../scenes/app/app-bottom-navigation.component';
import { AppDrawer } from '../scenes/app/app-drawer.component';
import { LibrariesScreen } from '../scenes/libraries/libraries.component';

const BottomTab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

/*
 * When dev is true in .expo/settings.json (started via `start:dev`),
 * open Record tab as default.
 */
const initialTabRoute: string = __DEV__ ? 'Workbench' : 'Store';

/*
 * Can we access it from `AppTabsNavigator`?
 */
const ROOT_ROUTES: string[] = ['Store', 'Today', 'Workbench', 'Messaging', 'Me'];

const isOneOfRootRoutes = (currentRoute: RouteProp<any, any>): boolean => {
  return ROOT_ROUTES.indexOf(currentRoute.name) !== -1;
};

const TabBarVisibleOnRootScreenOptions = ({ route }): BottomTabNavigationOptions => {
  const currentRoute = route.state && route.state.routes[route.state.index];
  return { tabBarVisible: currentRoute && isOneOfRootRoutes(currentRoute) };
};

const AppTabsNavigator = (): React.ReactElement => (
  <BottomTab.Navigator
    screenOptions={TabBarVisibleOnRootScreenOptions}
    initialRouteName={initialTabRoute}
    tabBar={props => <AppBottomNavigation {...props} />}>
    <BottomTab.Screen name='Store' component={StoreNavigator}/>
    <BottomTab.Screen name='Today' component={TodayNavigator}/>
    <BottomTab.Screen name='Workbench' component={WorkbenchNavigator}/>
    <BottomTab.Screen name='Messaging' component={MessagingNavigator}/>
    <BottomTab.Screen name='Me' component={MeNavigator}/>
  </BottomTab.Navigator>
);

const AppDrawerNavigator = (): React.ReactElement => (
  <Drawer.Navigator
    screenOptions={{ gestureEnabled: false }}
    drawerContent={props => <AppDrawer {...props}/>}>
    <Drawer.Screen name='Root' component={AppTabsNavigator}/>
    <Drawer.Screen name='Libraries' component={LibrariesScreen}/>
  </Drawer.Navigator>
);

export const AppNavigator = (): React.ReactElement => (
  <NavigationContainer theme={navigatorTheme}>
    <AppDrawerNavigator/>
  </NavigationContainer>
);

/*
 * Navigation theming: https://reactnavigation.org/docs/en/next/themes.html
 */
const navigatorTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // prevent layout blinking when performing navigation
    background: 'transparent',
  },
};
