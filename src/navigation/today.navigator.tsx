import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TodayListScreen } from '../scenes/today/today-list.component';
import { Article1Screen } from '../scenes/articles/article-1.component';
import { Article2Screen } from '../scenes/articles/article-2.component';
import { Article3Screen } from '../scenes/articles/article-3.component';
import { ArticleList1Screen } from '../scenes/articles/article-list-1.component';
import { ArticleList2Screen } from '../scenes/articles/article-list-2.component';
import { ArticleList3Screen } from '../scenes/articles/article-list-3.component';
import { ArticleList4Screen } from '../scenes/articles/article-list-4.component';

const Stack = createStackNavigator();

export const TodayNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name='Today' component={TodayListScreen}/>
    <Stack.Screen name='Article1' component={Article1Screen}/>
    <Stack.Screen name='Article2' component={Article2Screen}/>
    <Stack.Screen name='Article3' component={Article3Screen}/>
    <Stack.Screen name='ArticleList1' component={ArticleList1Screen}/>
    <Stack.Screen name='ArticleList2' component={ArticleList2Screen}/>
    <Stack.Screen name='ArticleList3' component={ArticleList3Screen}/>
    <Stack.Screen name='ArticleList4' component={ArticleList4Screen}/>
  </Stack.Navigator>
);
