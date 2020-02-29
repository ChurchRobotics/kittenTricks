import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Chat1Screen } from '../scenes/messaging/chat-1.component';
import { Chat2Screen } from '../scenes/messaging/chat-2.component';
import { ConversationListScreen } from '../scenes/messaging/conversation-list.component';

import { Profile7Screen } from '../scenes/social/profile-7.component';

const Stack = createStackNavigator();

export const MessagingNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name='Messaging' component={ConversationListScreen}/>
    <Stack.Screen name='Chat1' component={Chat1Screen}/>
    <Stack.Screen name='Chat2' component={Chat2Screen}/>

    <Stack.Screen name='Profile7' component={Profile7Screen}/>
  </Stack.Navigator>
);
