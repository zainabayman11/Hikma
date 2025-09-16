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
const Home = ({ navigation }) => {

  

 

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
              fontWeight: "700",
              textAlign:'left',
              marginBottom: SIZES.margin
            }}
          > {"You're one step closer to making confident \n    decisions for  your pneumonia patients!"}</Text>
          </View>
        <View />

      </View>

      <View
          style={{
          width:"100%",
          // backgroundColor:"#f0f",
          alignItems:'center',
          justifyContent:'center'

          }}
          >
          <Text
            style={{
              ...FONTS.h3,
              color: COLORS.primarydarkBule,
              fontWeight: "bold",
              textAlign:'center',
              marginBottom: SIZES.margin
            }}
          > {"Choose the area where you'd like to explore further :"}</Text>
          </View>


      <ScrollView>
        <View style={{
          paddingHorizontal: SIZES.base,
          alignItems:'center'
        }}>
          

          <TouchableOpacity
          style={{  
            alignItems:'center'
          }}
            activeOpacity={.8}
            onPress={() => {

              // navigation.navigate("Families")
              
              navigation.navigate("FirstOption")
              
            }}
          >
            <Animatable.View
              useNativeDriver
              delay={50 * 0}
              animation={'fadeInRight'}
              style={{
                width: "96%",
                
                height: RFValue(70),
                flexDirection: "row",
                borderRadius: SIZES.radius,
                borderWidth:2,
                borderColor:COLORS.primary,
                backgroundColor: COLORS.primarydarkBule,
                // padding: SIZES.base,
                // elevation: RFValue(5),
                alignItems:"center",
                justifyContent:'center',
                marginBottom: SIZES.margin,

              }}>
             

                <View
                  style={{
                    width: "95%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    // backgroundColor: "rgba(0,0,0,0.4)",
                    // paddingVertical: 10,
                    borderRadius: SIZES.radius
                  }}
                >
                  <Text style={{
                    ...FONTS.h3,
                    // fontFamily: FONTS.fontFamilyBold,
                    textAlign:'center',
                    color: COLORS.white,
                    // marginBottom: SIZES.margin
                  }}>
                  {'CAP Clinical Decision Support System'}
                  </Text>



                </View>
               
            </Animatable.View>

          </TouchableOpacity>

          <TouchableOpacity
          style={{  
            alignItems:'center'
          }}
            activeOpacity={.8}
            onPress={() => {

              // navigation.navigate("Families")
            }}
          >
            <Animatable.View
              useNativeDriver
              delay={50 * 0}
              animation={'fadeInRight'}
              style={{
                width: "96%",
                
                height: RFValue(70),
                flexDirection: "row",
                borderRadius: SIZES.radius,
                borderWidth:2,
                borderColor:COLORS.primary,
                backgroundColor: COLORS.primarydarkBule,
                // padding: SIZES.base,
                // elevation: RFValue(5),
                alignItems:"center",
                justifyContent:'center',
                marginBottom: SIZES.margin,

              }}>
             

                <View
                  style={{
                    width: "95%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    // backgroundColor: "rgba(0,0,0,0.4)",
                    // paddingVertical: 10,
                    borderRadius: SIZES.radius
                  }}
                >
                  <Text style={{
                    ...FONTS.h3,
                    // fontFamily: FONTS.fontFamilyBold,
                    textAlign:'center',
                    color: COLORS.white,
                    // marginBottom: SIZES.margin
                  }}>
                  {'AI Diagnostic Tool'}
                  </Text>



                </View>
               
            </Animatable.View>

          </TouchableOpacity>


          <TouchableOpacity
          style={{  
            alignItems:'center'
          }}
            activeOpacity={.8}
            onPress={() => {

              // navigation.navigate("Families")
            }}
          >
            <Animatable.View
              useNativeDriver
              delay={50 * 0}
              animation={'fadeInRight'}
              style={{
                width: "96%",
                
                height: RFValue(70),
                flexDirection: "row",
                borderRadius: SIZES.radius,
                borderWidth:2,
                borderColor:COLORS.primary,
                backgroundColor: COLORS.primarydarkBule,
                // padding: SIZES.base,
                // elevation: RFValue(5),
                alignItems:"center",
                justifyContent:'center',
                marginBottom: SIZES.margin,

              }}>
             

                <View
                  style={{
                    width: "95%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    // backgroundColor: "rgba(0,0,0,0.4)",
                    // paddingVertical: 10,
                    borderRadius: SIZES.radius
                  }}
                >
                  <Text style={{
                    ...FONTS.h3,
                    // fontFamily: FONTS.fontFamilyBold,
                    textAlign:'center',
                    color: COLORS.white,
                    // marginBottom: SIZES.margin
                  }}>
                  {'Drug-Drug Interaction checker'}
                  </Text>



                </View>
               
            </Animatable.View>

          </TouchableOpacity>

          <TouchableOpacity
          style={{  
            alignItems:'center'
          }}
            activeOpacity={.8}
            onPress={() => {

              // navigation.navigate("Families")
            }}
          >
            <Animatable.View
              useNativeDriver
              delay={50 * 0}
              animation={'fadeInRight'}
              style={{
                width: "96%",
                
                height: RFValue(70),
                flexDirection: "row",
                borderRadius: SIZES.radius,
                borderWidth:2,
                borderColor:COLORS.primary,
                backgroundColor: COLORS.primarydarkBule,
                // padding: SIZES.base,
                // elevation: RFValue(5),
                alignItems:"center",
                justifyContent:'center',
                marginBottom: SIZES.margin,

              }}>
             

                <View
                  style={{
                    width: "95%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    // backgroundColor: "rgba(0,0,0,0.4)",
                    // paddingVertical: 10,
                    borderRadius: SIZES.radius
                  }}
                >
                  <Text style={{
                    ...FONTS.h3,
                    // fontFamily: FONTS.fontFamilyBold,
                    textAlign:'center',
                    color: COLORS.white,
                    // marginBottom: SIZES.margin
                  }}>
                  {'Dose Adjustment'}
                  </Text>



                </View>
               
            </Animatable.View>

          </TouchableOpacity>

        </View>

        <View
  style={{
    width:'100%',
    // height:'100%',
    marginTop:RFValue(20),
   backgroundColor:COLORS.secondColor,
   borderTopWidth:2,
   borderBottomWidth:2,
   borderColor:COLORS.primarydarkBule,
   padding:RFValue(10),
  //  alignItems:'center',
  //  justifyContent:'flex-start',
  //  flexDirection:'row'
  }}>
    
    <View 
    style={{
      alignItems:'center',
      // alignSelf:'flex-start',
      // justifyContent:'space-between',
      flexDirection:'row',
      // backgroundColor:"#00f",
      width:'100%',

    }}
    >
      
    {/* <FastImage 
     source={images.whitelogoHikmaa}
     resizeMode='contain'
     style={{
      width:20,
      height:80,
      // marginRight:RFValue(50),
      // backgroundColor:'green',
     
      // 
     }}
    ></FastImage> */}

<View 
style={{
  // backgroundColor:"#f0f",
  alignSelf:'center',
   marginLeft:RFValue(30),
  // width:'90%',
}}
>
<Text style={{
                    ...FONTS.h3,
                    // fontFamily: FONTS.fontFamilyBold,
                    textAlign:'center',
                    color: COLORS.white,
                    lineHeight:20,
                    flexWrap:'wrap'
                    // marginBottom: SIZES.margin
                  }}>
                  {"Select your area of interest and we'll\nprovide you with the most relevant\n information and decision support tools"}
                  </Text>

          </View>
                  </View>
  </View>


   {/* <Text 
   onPress={() => navigation.navigate("ThirteenthOption")}
   >{"press"}</Text> */}

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
export default Home;
