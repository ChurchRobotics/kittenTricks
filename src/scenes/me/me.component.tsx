import React from 'react';
import { StyleSheet } from 'react-native';
import { TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { SafeAreaLayout } from '../../components/safe-area-layout.component';
import { MenuIcon } from '../../components/icons';
import ContentView from '../../layouts/social/profile-6';

export const MeScreen = ({ navigation }): React.ReactElement => {

  const renderDrawerAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={MenuIcon}
      onPress={navigation.toggleDrawer}
    />
  );

  return (
    <SafeAreaLayout
      style={styles.container}
      insets='top'>
      <TopNavigation
        title='Me'
        leftControl={renderDrawerAction()}
      />
      <ContentView navigation={navigation}/>
    </SafeAreaLayout>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
