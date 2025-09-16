import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Animated} from 'react-native';

import {RFValue} from 'react-native-responsive-fontsize';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';

import {COLORS, SIZES, FONTS, icons} from '../constants';
import {
  FilterFuelStation,
  Home,
  Settings,
  StationOption,
} from '../screens/appScreens';
import FastImage from 'react-native-fast-image';

const Tab = createBottomTabNavigator();
const FuelStack = createSharedElementStackNavigator();

const TabArr = [
  {
    route: 'Home',
    label: 'Home',
    ArLabel: 'Shipments',
    type: Ionicons,
    activeIcon: icons.charging,
    inActiveIcon: icons.charging_outlet,
    tabBarColor: COLORS.primary,
    component: Home,
  },
  {
    route: 'FilterFuelStation',
    label: 'FilterFuelStation',
    ArLabel: 'Trips',
    type: Ionicons,
    activeIcon: icons.fuel_tank,
    inActiveIcon: icons.fuel_tank_outlet,
    tabBarColor: COLORS.primary,
    component: FilterFuelStation,
  },
  {
    route: 'Settings',
    label: 'Settings',
    ArLabel: 'Settings',
    type: Ionicons,
    activeIcon: icons.settings,
    inActiveIcon: icons.settings_outlet,
    tabBarColor: COLORS.primary,
    component: Settings,
  },
];

const MARGIN = 16;
const TAB_BAR_WIDTH = SIZES.width - 2 * MARGIN;
const TAB_WIDTH = TAB_BAR_WIDTH / TabArr.length;

function MyTabBar({state, descriptors, navigation}) {
  const [translateX] = useState(new Animated.Value(0));
  const translateTab = index => {
    Animated.spring(translateX, {
      toValue: index * TAB_WIDTH,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    translateTab(state.index);
  }, [state.index]);

  return (
    <View style={styles.tabBarContainer}>
      <Animated.View
        style={[styles.slidingTabContainer, {backgroundColor: COLORS.white}]}>
        <Animated.View
          style={[
            styles.slidingTab,
            {
              transform: [{translateX}],
              backgroundColor: TabArr[state.index].tabBarColor,
            },
          ]}
        />
      </Animated.View>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const tabBarIcon = options.tabBarIcon;

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{flex: 1, alignItems: 'center'}}
            key={index}>
            <TabIcon
              tabBarIcon={tabBarIcon}
              isFocused={isFocused}
              label={label}
              tabColor={options.tabColor}
              index={state.index}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const TabIcon = ({isFocused, tabBarIcon, label, tabColor}) => {
  const [translateY] = useState(new Animated.Value(0));

  const translateIcon = val => {
    Animated.spring(translateY, {
      toValue: val,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (isFocused) {
      translateIcon(-14); // move up
    } else {
      translateIcon(0); // centered
    }
  }, [isFocused]);

  return (
    <>
      <Animated.View style={{transform: [{translateY}]}}>
        <FastImage
          source={isFocused ? tabBarIcon.activeIcon : tabBarIcon.inActiveIcon}
          style={{
            width: RFValue(24),
            height: RFValue(24),
          }}
          tintColor={isFocused ? COLORS.white : tabColor}
        />
      </Animated.View>
      <Text
        style={{
          color: isFocused ? tabColor : COLORS.darkGray,
          fontFamily: FONTS.fontFamily,
        }}>
        {label}
      </Text>
    </>
  );
};

const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => <MyTabBar {...props} />}>
      {TabArr.map((_, index) => {
        return (
          <Tab.Screen
            key={index}
            name={_.label}
            component={_.component}
            options={{
              tabBarLabel: _.ArLabel,
              tabBarColor: _.tabBarColor,
              tabColor: _.tabBarColor,
              tabBarIcon: {
                activeIcon: _.activeIcon,
                inActiveIcon: _.inActiveIcon,
                type: _.type,
              },
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    width: TAB_BAR_WIDTH,
    height: RFValue(50),
    position: 'absolute',
    alignSelf: 'center',
    bottom: MARGIN,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    // overflow:"hidden"
  },
  slidingTabContainer: {
    width: TAB_WIDTH,
    ...StyleSheet.absoluteFillObject,
    // backgroundColor:COLORS.lightGray1,
    alignItems: 'center',
  },
  slidingTab: {
    width: RFValue(50),
    height: RFValue(50),
    borderRadius: RFValue(50 / 2),
    backgroundColor: COLORS.primary,
    bottom: 25,
    borderWidth: 4,
    borderColor: COLORS.white,
  },
});
export default BottomTab;
