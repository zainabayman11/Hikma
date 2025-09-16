import React from 'react';
import {TransitionPresets} from '@react-navigation/stack';
import BottomTab from './BottomTab';
// import {
//   NearbeStation,
//   StationDetails,
//   StationOption,

// } from '../screens/appScreens';
// import MyShipments from '../screens/appScreens/Shipments/MyShipments';
// import Mytrips from '../screens/appScreens/Shipments/Mytrips';

import { createStackNavigator } from '@react-navigation/stack';
// import ShipmentDetails from '../screens/appScreens/ShipmentDetails';
import { Families, Finish_task, Give_Help, Help_Family, Home, Instructions, MemberData, RecordAudio, FirstOption,SecondOption,ThirdOption,FourthOption,FifthOption,
  SixthOption,
SeventhOption,
EighthOption,
NinthOption,
TenthOption,
EleventhOption,
TwelfthOption,
ThirteenthOption,
FourteenthOption,
FifteenthOption,
SixteenthOption,
SeventeenthOption,
EighteenthOption,
NineteenthOption,
TwentiethOption,
TwentyFirstOption,
TwentySecondOption
} from '../screens/appScreens';
// import FirstOption  from '../screens/appScreens';

const Stack = createStackNavigator();
const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureDirection: 'horizontal',
        ...TransitionPresets.SlideFromRightIOS,
        headerShown: false,
      }}
      initialRouteName="Home"
    >

      {/* <Stack.Screen name="MainStack" component={BottomTab} /> */}
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Families" component={Families} />
      <Stack.Screen name="Give_Help" component={Give_Help} />
      <Stack.Screen name="Help_Family" component={Help_Family} />
      <Stack.Screen name="Finish_task" component={Finish_task} />
      <Stack.Screen name="RecordAudio" component={RecordAudio} />
      <Stack.Screen name="MemberData" component={MemberData} />
      <Stack.Screen name="Instructions" component={Instructions} />
      {/* Hikmaaa */}
      <Stack.Screen name="FirstOption" component={FirstOption} />
      <Stack.Screen name="SecondOption" component={SecondOption} />
      <Stack.Screen name="ThirdOption" component={ThirdOption} />
      <Stack.Screen name="FourthOption" component={FourthOption} />
      <Stack.Screen name="FifthOption" component={FifthOption} />
      <Stack.Screen name="SixthOption" component={SixthOption} />
      <Stack.Screen name="SeventhOption" component={SeventhOption} />
      <Stack.Screen name="EighthOption" component={EighthOption} />
      <Stack.Screen name="NinthOption" component={NinthOption} />
      <Stack.Screen name="TenthOption" component={TenthOption} /> 
      <Stack.Screen name="EleventhOption" component={EleventhOption} />
      <Stack.Screen name="TwelfthOption" component={TwelfthOption} /> 
      <Stack.Screen name="ThirteenthOption" component={ThirteenthOption} />
      <Stack.Screen name="FourteenthOption" component={FourteenthOption} /> 
      <Stack.Screen name="FifteenthOption" component={FifteenthOption} />
      <Stack.Screen name="SixteenthOption" component={SixteenthOption} /> 
      <Stack.Screen name="SeventeenthOption" component={SeventeenthOption} />
      <Stack.Screen name="EighteenthOption" component={EighteenthOption} /> 
      <Stack.Screen name="NineteenthOption" component={NineteenthOption} />
      <Stack.Screen name="TwentiethOption" component={TwentiethOption} />
      <Stack.Screen name="TwentyFirstOption" component={TwentyFirstOption} /> 


      {/* <Stack.Screen name="Mytrips" component={Mytrips} />
      <Stack.Screen name="ShipmentDetails" component={ShipmentDetails} /> */}
      {/* <Stack.Screen
        name="StationOption"
        component={StationOption}
        options={{
          gestureDirection: 'vertical',
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}
      />
      <Stack.Screen
        name="StationDetails"
        component={StationDetails}
        options={{
          gestureDirection: 'vertical',
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}
      />
      <Stack.Screen
        name="NearbeStation"
        component={NearbeStation}
        options={{
          gestureDirection: 'vertical',
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}
      /> */}
    </Stack.Navigator>
  );
};

export default AppStack;
