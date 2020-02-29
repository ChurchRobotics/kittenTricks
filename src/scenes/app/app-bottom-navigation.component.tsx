import React from 'react';
import { StyleSheet } from 'react-native';
import { BottomNavigationTab, Divider } from '@ui-kitten/components';
import { SafeAreaLayout } from '../../components/safe-area-layout.component';
import { BrandBottomNavigation } from '../../components/brand-bottom-navigation.component';
import { HomeIcon, ListIcon, InboxIcon, MessageCircleIcon, PersonIcon } from '../../components/icons';

export const AppBottomNavigation = (props): React.ReactElement => {

  const onSelect = (index: number): void => {
    props.navigation.navigate(props.state.routeNames[index]);
  };

  return (
    <SafeAreaLayout insets='bottom'>
      <Divider/>
      <BrandBottomNavigation
        appearance='noIndicator'
        selectedIndex={props.state.index}
        onSelect={onSelect}>
        <BottomNavigationTab
          icon={HomeIcon}
        />
        <BottomNavigationTab
          icon={ListIcon}
        />
        <BottomNavigationTab
          icon={(style) => InboxIcon({...style, ...styles.booksIcon})}
        />
        <BottomNavigationTab
          icon={MessageCircleIcon}
        />
        <BottomNavigationTab
          icon={PersonIcon}
        />
      </BrandBottomNavigation>
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  booksIcon: {
    width: 30,
    height: 30,
  },
});
