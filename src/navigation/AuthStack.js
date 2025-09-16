import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {AuthMain, Login, SignOTP, SubmitInfo} from '../screens/authScreens';
// import {createSharedElementStackNavigator} from 'react-navigation-shared-element';

const Stack = createStackNavigator();
const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureDirection: 'horizontal',
        ...TransitionPresets.SlideFromRightIOS,
        headerShown: false,
      }}
      initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="AuthMain" component={AuthMain} />
      
      <Stack.Screen name="SubmitInfo" component={SubmitInfo} />
      <Stack.Screen name="SignOTP" component={SignOTP} />
    </Stack.Navigator>
  );
};

export default AuthStack;
