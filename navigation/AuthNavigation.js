import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../screens/Auth/Login';
import Confirm from '../screens/Auth/Confirm';
import Signup from '../screens/Auth/Signup';

const Stack = createStackNavigator();

export default () => (
  <NavigationContainer>
    <Stack.Navigator headerMode={'none'}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={Signup} />
      <Stack.Screen name="Confirm" component={Confirm} />
    </Stack.Navigator>
  </NavigationContainer>
);
