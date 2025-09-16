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
  Image,
  Pressable
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
const SixthOption = ({ navigation }) => {

   const[ SummaryModal, setSummaryModal] = useState(false)
   const[ DosesModal, setDosesModal] = useState(false)
   const[ FollowModal, setFollowModal] = useState(false)




   

  return (
    <>
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
              marginBottom: RFValue(20)
            }}
          > {"You've Got This"}</Text>
          </View>
        <View />




      </View>

      <View
  style={{
    width:'95%',
    alignSelf:'center',
    // height:'100%',
    // marginTop:RFValue(10),
    borderRadius:RFValue(10),
   backgroundColor:COLORS.primarydarkBule,
   borderTopWidth:2,
   borderBottomWidth:2,
   borderColor:COLORS.primary,
   padding:RFValue(10),
  //  alignItems:'center',
  //  justifyContent:'flex-start',
  //  flexDirection:'row'
  }}>
    
    
   

<View 
style={{
  // backgroundColor:"#f0f",
  // alignSelf:'center',
  width:'75%',
}}
>
<Text style={{
                    ...FONTS.h3,
                    // fontFamily: FONTS.fontFamilyBold,
                    textAlign:'left',
                    color: COLORS.white,
                    lineHeight:15,
                    flexWrap:'wrap'
                    // marginBottom: SIZES.margin
                  }}>
                  {"You've carefully considered your patient's condition and navigated through the evidence-based recommendations"}
                  </Text>

        
                  </View>
  </View>

      <ScrollView>
        <View style={{
          paddingHorizontal: SIZES.base,
          alignItems:'center'
        }}>




          <View
          style={{
          // backgroundColor:"#f0f",
          alignItems:'center',
          justifyContent:'center',
           marginTop:RFValue(10),
          }}
          >
          <Text
            style={{
              ...FONTS.h3,
              color: COLORS.primarydarkBule,
              fontWeight: "bold",
              textAlign:'left',
              marginBottom: SIZES.margin
            }}
          > {"Based on your choices, here's your tailored guidance :"}</Text>
          </View>

        
            <Animatable.View
              useNativeDriver
              delay={50 * 0}
              animation={'fadeInRight'}
              style={{
                width: "100%",
                // height: RFValue(140),
                // flexDirection: "row",
                // borderRadius: SIZES.radius,
                borderWidth:2,
                borderColor:COLORS.primarydarkBule,
                backgroundColor: COLORS.primary,
                padding: SIZES.base,
                // elevation: RFValue(5),
                // alignItems:"center",
                // justifyContent:'center',
                marginBottom: SIZES.margin,

              }}>
             

               
                  <Text style={{
                    ...FONTS.h3,
                    // fontFamily: FONTS.fontFamilyBold,
                    textAlign:'center',
                    color: COLORS.white,
                    marginBottom: SIZES.margin
                  }}>
                  {'A 5–7 days treatment course'}
                  </Text>

                  <Text style={{
                    ...FONTS.h3,
                    // fontFamily: FONTS.fontFamilyBold,
                    textAlign:'center',
                    color: COLORS.white,
                    // marginBottom: SIZES.margin
                  }}>
                  {'Amoxicillin plus a Macrolide (eg, azithromycin, clarithromycin) is an appropriate treatment option for this patient.'}
                  </Text>

         
                  <View
   style={{
    width:'100%',
    alignSelf:'center',
    // paddingHorizontal: SIZES.base,
      marginTop: RFValue(15),
    // backgroundColor:"#00f",
    alignItems:'center',
    flexDirection:'row-reverse',
    justifyContent:'space-around',
    marginBottom:SIZES.margin
   }}
   >
       <TouchableOpacity
       style={{width:'40%'}}
       onPress={()=>{
        setFollowModal(true)
       }}
       >
            <Animatable.View
              useNativeDriver
              delay={50 * 0}
              animation={'fadeInRight'}
              style={{
                // width: "30%",
                paddingHorizontal:30,
                // height: RFValue(0),
                padding: 5,
                // flexDirection: "row",
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.primarydarkBule,
                // elevation: RFValue(5),
                alignItems:"center",
                justifyContent:'center',
                // marginBottom: SIZES.margin,
                // alignSelf:'center'

              }}>
             
                  <Text style={{
                    ...FONTS.h3,
                    // fontFamily: FONTS.fontFamilyBold,
                    textAlign:'center',
                    fontStyle: "italic",
                    color: COLORS.white,
                    fontWeight:'bold'
                    // marginBottom: SIZES.margin
                  }}
                  numberOfLines={1}
                  
                  >
                  {'Follow up'}
                  </Text>

            </Animatable.View>
            </TouchableOpacity>
        
            <TouchableOpacity
        style={{width:'40%'}}
            onPress={()=>{
              setDosesModal(true)
            }}
            >
            <Animatable.View
              useNativeDriver
              delay={50 * 0}
              animation={'fadeInRight'}
              style={{
                // width: "30%",
                paddingHorizontal:30,
                // height: RFValue(0),
                padding: 5,
                // flexDirection: "row",
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.primarydarkBule,
                // marginTop: RFValue(15),
                // elevation: RFValue(5),
                alignItems:"center",
                justifyContent:'center',
                // marginBottom: SIZES.margin,
                // alignSelf:'center'

              }}>
             
                  <Text style={{
                    ...FONTS.h3,
                    // fontFamily: FONTS.fontFamilyBold,
                    textAlign:'center',
                    fontStyle: "italic",
                    color: COLORS.white,
                    fontWeight:'bold'
                    // marginBottom: SIZES.margin
                  }}
                  numberOfLines={1}
                  
                  >
                  {'Doses'}
                  </Text>

            </Animatable.View>
            </TouchableOpacity>
            </View>
            <TouchableOpacity
            onPress={()=>{
              setSummaryModal(true)
            }}
            >
            <Animatable.View
              useNativeDriver
              delay={50 * 0}
              animation={'fadeInRight'}
              style={{
                // width: "30%",
                paddingHorizontal:40,
                // height: RFValue(0),
                padding: 5,
                // flexDirection: "row",
                alignSelf:'center',
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.primarydarkBule,
                // marginTop: RFValue(15),
                // elevation: RFValue(5),
                alignItems:"center",
                justifyContent:'center',
                // marginBottom: SIZES.margin,
                // alignSelf:'center'

              }}>
             
                  <Text style={{
                    ...FONTS.h3,
                    // fontFamily: FONTS.fontFamilyBold,
                    textAlign:'center',
                    fontStyle: "italic",
                    color: COLORS.white,
                    fontWeight:'bold'
                    // marginBottom: SIZES.margin
                  }}>
                  {'Summary'}
                  </Text>

            </Animatable.View>
            </TouchableOpacity>
            </Animatable.View>


          

        </View>

    

        <View
  style={{
    width:'100%',
    // height:'100%',
    marginTop:RFValue(100),
   backgroundColor:COLORS.primarydarkBule,
   borderTopWidth:2,
   borderBottomWidth:2,
   borderColor:COLORS.secondColor,
   padding:RFValue(10),

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
      // backgroundColor:COLORS.red,
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
                    textAlign:'left',
                    color: COLORS.white,
                    lineHeight:20,
                    fontStyle: "italic",
                    flexWrap:'wrap'
                    // marginBottom: SIZES.margin
                  }}>
                  {"We're confident that you're\nmaking the best decisions for your patients."}
                  </Text>

          </View>
                  </View>
  </View>
      </ScrollView>


    </View>



{ SummaryModal && 
   
   <Modal
     animationType="slide"
     transparent={true}
     visible={SummaryModal}
     onRequestClose={() => setSummaryModal(false)}
   >
      <Pressable
         style={styles.centeredView}
         onPress={() => setSummaryModal(false)} 
       >

       <View style={styles.modalView}>
         
               <Text style={styles.modalText}>{"Comorbidities, smoking, or recent antibiotic use: No.\n\nPenicillin hypersensitivity or other intolerance: No.\n\nReason to avoid macrolides: No."}</Text>

       </View>
     </Pressable>
   </Modal>
  
 }
 

 { DosesModal && 
   
   <Modal
     animationType="slide"
     transparent={true}
     visible={DosesModal}
     onRequestClose={() => setDosesModal(false)}
   >
      <Pressable
         style={styles.centeredView}
         onPress={() => setDosesModal(false)} 
       >

       <View style={styles.modalViewDoses}>
    
    <Text style={[styles.modalText,{color:COLORS.primary}]}>{"Amoxicillin"}
    <Text style={[styles.modalText,{color:'white'}]}>{" 1000 mg orally 3 times daily for 5 day"}
 </Text>
    </Text>

    <Text style={[styles.modalText,{color:'white',fontStyle:'italic',marginBottom:0}]}>{"Plus"}</Text>


    <Text style={[styles.modalText,{color:COLORS.primary}]}>{"Azithromycin"}
    <Text style={[styles.modalText,{color:'white'}]}>{" 500 mg orally daily for 3 days"}
 </Text>
    </Text>

    <Text style={[styles.modalText,{color:'white',fontStyle:'italic',marginBottom:0}]}>{"OR"}</Text>

   <Text style={[styles.modalText,{color:COLORS.primary}]}>{"Clarithromycin"}
    <Text style={[styles.modalText,{color:'white'}]}>{" 500 mg orally twice daily for 5 days ( Or XL two 500 mg tablets (1000 mg total) orally once daily for 5 days)"}
 </Text>
    </Text>
       </View>
     </Pressable>
   </Modal>
  
 }


{ FollowModal && 
   
   <Modal
     animationType="slide"
     transparent={true}
     visible={FollowModal}
     onRequestClose={() => setFollowModal(false)}
   >
      <Pressable
         style={styles.centeredView}
         onPress={() => setFollowModal(false)} 
       >

       <View style={styles.modalViewDoses}>
    
    <Text style={[styles.modalText,{color:'white'}]}>{"Follow-up with patients within 72 hours of starting therapy to ensure that they are improving.For patients who are improving, we stop antibiotics at the 5-day mark provided that they have been afebrile and clinically stable for ≥48 hours. Other symptoms (eg, cough, dyspnea, fatigue) may persist during convalescence and are generally not indications to extend treatment."}</Text>
    <View 
    style={{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',
      // backgroundColor:"#0f0"
      // marginTop:10
    }}
    >
    <Image 
         source={images.alert}
         style={{
           width: 50,
           height: 50,
           marginRight:RFValue(10),
          //  marginBottom: 10
         }}
         ></Image>
 <Text style={[styles.modalText,{color:COLORS.primary}]}>{"Patients who have not improved within 72 hours of therapy should be evaluated for complications or alternative diagnoses"}</Text>
 </View>

    
       </View>
     </Pressable>
   </Modal>
  
 }

</>
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width:'90%',
    backgroundColor: COLORS.primarydarkBule, 
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalViewDoses: {
    width:'90%',
    backgroundColor: COLORS.primarydarkBule, 
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    color: 'white',
    fontWeight:'bold',
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'left',
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonText: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // 
  modalViewNO: {
    backgroundColor: COLORS.white, 
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
//   18
modalView18: {
    width: '90%',
    backgroundColor: COLORS.primarydarkBule, 
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText18: {
    color: COLORS.primary,
    fontWeight:'bold',
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
  },
});
export default SixthOption;
