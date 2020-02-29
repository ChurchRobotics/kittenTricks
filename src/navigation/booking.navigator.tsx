import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { BookingScreen } from '../scenes/booking/booking.component';
import { AddNewCardScreen } from '../scenes/ecommerce/add-new-card.component';
import { ProductDetails1Screen } from '../scenes/ecommerce/product-details-1.component';
import { ProductDetails2Screen } from '../scenes/ecommerce/product-details-2.component';
import { ProductDetails3Screen } from '../scenes/ecommerce/product-details-3.component';
import { ProductDetails4Screen } from '../scenes/ecommerce/product-details-4.component';
import { PaymentScreen } from '../scenes/ecommerce/payment.component';
import { ShoppingCartScreen } from '../scenes/ecommerce/shopping-cart.component';

const Stack = createStackNavigator();

export const BookingNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name='Booking' component={BookingScreen}/>
    <Stack.Screen name='AddNewCard' component={AddNewCardScreen}/>
    <Stack.Screen name='ProductDetails1' component={ProductDetails1Screen}/>
    <Stack.Screen name='ProductDetails2' component={ProductDetails2Screen}/>
    <Stack.Screen name='ProductDetails3' component={ProductDetails3Screen}/>
    <Stack.Screen name='ProductDetails4' component={ProductDetails4Screen}/>
    <Stack.Screen name='Payment' component={PaymentScreen}/>
    <Stack.Screen name='ShoppingCart' component={ShoppingCartScreen}/>
  </Stack.Navigator>
);
