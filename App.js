// import {LogBox} from 'react-native';
// LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
// LogBox.ignoreAllLogs(); //Ignore all log notifications
import React, { useState, useEffect } from 'react';
import { View, Platform, StatusBar ,PermissionsAndroid } from 'react-native';
import Toast from 'react-native-toast-message';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import {
  modifyIsFirst,
  modifyNetInfo,
  setUser,
  setLoc
} from './src/redux/reducers/UserReducer';
import Auth from './src/Services';
import SplashScreen from './SplashScreen';
import NetInfo from '@react-native-community/netinfo';
import { COLORS } from './src/constants';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { AppStack, AuthStack } from './src/navigation';
import Onboarding from './src/screens/Onboarding';
import Geolocation from 'react-native-geolocation-service';
// import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
const Stack = createStackNavigator();
import 'moment/locale/ar';

const ObBoardStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureDirection: 'horizontal',
        ...TransitionPresets.SlideFromRightIOS,
        headerShown: false,
      }}
      initialRouteName="Onboarding">
      <Stack.Screen name="Onboarding" component={Onboarding} />
    </Stack.Navigator>
  );
};
const App = () => {
  const dispatch = useDispatch();
  const { login, first } = useSelector(state => state.UserReducer);

  const [loginChk, setloginChk] = useState(true);
  useEffect(() => {
    getUser();
    // requestLocationPermission()
    // NetInfo.addEventListener(state => {
    //   dispatch(modifyNetInfo(state.isInternetReachable));
    // });
  }, []);

//   async function requestLocationPermission() 
// {
//   try {
//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//       {
//         'title': 'Example App',
//         'message': 'Example App access to your location '
//       }
//     )
//     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//       Geolocation.getCurrentPosition(
//         (position) => {
//           // console.log(position);
//           dispatch(setLoc(position?.coords))
//         },
//         (error) => {
//           // See error code charts below.
//           console.log(error.code, error.message);
//         },
//         { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//     );
//     } 
//   } catch (err) {
//     console.warn(err)
//   }
// }

  const getUser = async () => {
    let data = await Auth.getAccount();
    let isFirst = await Auth.getFirst();

    if (isFirst != '1') {
      dispatch(modifyIsFirst(true));
    }
    if (data != null) {
      dispatch(setUser(data));
    }

    setTimeout(() => {
      setloginChk(false);
    }, 3100);
  };

  if (loginChk) {
    return <SplashScreen />;
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={COLORS.primary} />
      <NavigationContainer>
      {first ? <ObBoardStack /> :  <AppStack /> }

        
      </NavigationContainer>
      <Toast />
    </SafeAreaView>
  );
};

export default App;
