import React from 'react';
import { BottomNavigationTab, Divider } from '@ui-kitten/components';
import { SafeAreaLayout } from '../../components/safe-area-layout.component';
import { BrandBottomNavigation } from '../../components/brand-bottom-navigation.component';
import { HomeIcon, SmartphoneOutlineIcon, InboxIcon, MessageCircleIcon, PersonIcon } from '../../components/icons';

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
          icon={SmartphoneOutlineIcon}
        />
        <BottomNavigationTab
          icon={InboxIcon}
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
