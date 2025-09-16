import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Animated,
  Platform,
  TouchableOpacity,
  FlatList, ImageBackground,
  UIManager,
  LayoutAnimation, Modal,
  ActivityIndicator,
  Image
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import FastImage from 'react-native-fast-image';
import axios from 'axios';
import LottieView from 'lottie-react-native';
import { useDispatch, useSelector } from 'react-redux';

import { COLORS, FONTS, icons, images, SIZES } from '../../../constants';
import DatePicker from 'react-native-date-picker'
import moment from 'moment';
import { CheckBox, FormInput, TextButton } from '../../../components';
import utils from '../../../utils';
import * as Animatable from 'react-native-animatable';
import { ScrollView } from 'react-native-gesture-handler';
import {removeUser} from '../../../redux/reducers/UserReducer';
import Auth from '../../../Services';
const CARD_HEIGHT = 220;
const CARD_WIDTH = SIZES.width * 0.8;
const SPACING_FOR_CARD_INSET = SIZES.width * 0.1 - 10;
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
const Families = ({ navigation }) => {

    const buttons = [
        { title: 'Determine site of care', screen: 'MemberData' },
        { title: 'Diagnostic workup & Differential Diagnosis', screen: '' },
        { title: 'Antibiotic selection based on severity and risk factors', screen: '' },
        { title: 'Duration of therapy', screen: '' },
        { title: 'Management of complications', screen: '' },
        { title: 'Follow-up and monitoring', screen: '' }

      ];

 

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      <View
        style={{
          // height: SIZES.height * .09,
          marginBottom: RFValue(10),
          backgroundColor: COLORS.primary, alignItems: "center", justifyContent: "space-between",
          // flexDirection: "row",
          paddingHorizontal: RFValue(10)
        }}
      >
       
        <Text
          style={{
            ...FONTS.h1,
            color: COLORS.white,
            fontWeight:'bold',
            textAlign:"center",
            marginTop:RFValue(10),
          }}
        >{'CAP Care'}</Text>

<View
          style={{
          // backgroundColor:"#f0f",
          alignItems:'flex-start',
          // marginTop:

          }}
          >
          <Text
            style={{
              ...FONTS.body4,
              color: COLORS.primarydarkBule,
              fontWeight: "800",
              textAlign:'left',
              marginBottom: SIZES.margin
            }}
          > {"Welcome to "}
            <Text style={{
             color: COLORS.white,
             fontWeight: "500",
             fontStyle: "italic"
          }}
          
          >{'the CAP Clinical Decision Support System'}</Text>
          </Text>
        
          </View>
        <View />




      </View>
      <ScrollView>
        <View style={{
          paddingHorizontal: SIZES.base,
          alignItems:'center',
        //   backgroundColor:COLORS.secondColor,

        }}>
          <View
          style={{
        //   backgroundColor:COLORS.secondColor,
          alignItems:'center',
          justifyContent:'center'

          }}
          >
          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.primarydarkBule,
              fontWeight: "bold",
              textAlign:'left',
              marginBottom: SIZES.margin
            }}
          > {"Choose the area where you need help : "}</Text>
          </View>

  
          {buttons.map((button, index) => (
            <TouchableOpacity
              key={index}
              style={{ alignItems: 'center' }}
              activeOpacity={.8}
              onPress={() => {
                if (button.screen) {
                  navigation.navigate(button.screen);
                }
              }}
            >
              <Animatable.View
                useNativeDriver
                delay={50 * index}
                animation={'fadeInRight'}
                style={{
                  width: "96%",
                  height: RFValue(70),
                  flexDirection: "row",
                  borderRadius: SIZES.radius,
                  borderWidth: 2,
                  borderColor: COLORS.primary,
                  backgroundColor: COLORS.primarydarkBule,
                  alignItems: "center",
                  justifyContent: 'center',
                  marginBottom: 10,
                }}>
                <View
                  style={{
                    // backgroundColor:"#0f0",
                    width: "100%",
                    height: "100%",
                    alignSelf:"center",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: SIZES.radius
                  }}>
                  <Text style={{
                    ...FONTS.h3,
                    textAlign: 'center',
                    color: COLORS.white,
                    
                  }}
                  
                  >
                    {button.title}
                  </Text>
                </View>
              </Animatable.View>
            </TouchableOpacity>
          ))}


        </View>

      
            <Animatable.View
              useNativeDriver
              delay={50 * 0}
              animation={'fadeInRight'}
              style={{
                width: "60%",
                // height: RFValue(0),
                padding: 15,
                flexDirection: "row",
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.primarydarkBule,
                marginTop: RFValue(15),
                elevation: RFValue(5),
                alignItems:"center",
                justifyContent:'center',
                marginBottom: SIZES.margin,
                alignSelf:'center'

              }}>
             
                  <Text style={{
                    ...FONTS.h3,
                    // fontFamily: FONTS.fontFamilyBold,
                    textAlign:'center',
                    fontStyle: "italic",
                    color: COLORS.white,
                    // marginBottom: SIZES.margin
                  }}>
                  {'Explore all areas in-depth ?'}
                  </Text>

            </Animatable.View>


      </ScrollView>



 



    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  markerWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
  searchBox: {
    position: 'absolute',
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  chipsScrollView: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 90 : 80,
    paddingHorizontal: 10,
  },
  chipsIcon: {
    marginRight: 5,
  },
  marker: {
    width: 30,
    height: 30,
  },
  button: {
    alignSelf: 'center',
    marginTop: 5,
  },
  signIn: {
    width: '100%',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
  },
  scrollView: {
    position: 'absolute',
    bottom: RFValue(60),
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  card: {
    elevation: 2,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffcardImageset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: 'hidden',
    marginBottom: 4,
  },
  cardImage: {
    flex: 3,
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
});
export default Families;
