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

import { useFocusEffect } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import FastImage from 'react-native-fast-image';
import axios from 'axios';
import LottieView from 'lottie-react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons'
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


const EighteenthOption = ({ navigation }) => {

   const[ BetaModal, setBetaModal] = useState(false)
   const[ PRiskDosesModal, setPRiskDosesModal] = useState(false)
   const[ MRSARiskModal, setMRSARiskModal] = useState(false)
   
   const [betaOption, setBetaOption] = useState(null);
  const [pRiskOptions, setPRiskOptions] = useState([]);
  const [mrsaOptions, setMRSAOptions] = useState([]);


   const [selectedOptions, setSelectedOptions] = useState([]);

  const PRiskoptions = [
    { id: 1, label: 'Known colonization or prior infection with P. aeruginosa' },
    { id: 2, label: 'Gram-negative bacilli on high-quality sputum Gram stain' },
    { id: 3, label: 'Hospitalization with receipt of intravenous (IV) antibiotics within the past 3 months' },
    { id: 4, label: 'Frequent chronic obstructive pulmonary disease exacerbations requiring frequent glucocorticoid or antibiotic use' },
    { id: 5, label: 'Other structural lung diseases (eg, bronchiectasis, cystic fibrosis)' },
    { id: 6, label: 'NONE of the Above' },
  ];


  const MRSARiskoptions = [
    { id: 1, label: 'Gram-positive cocci in clusters seen on sputum Gram stain' },
    { id: 2, label: 'Known colonization or prior infection with MRSA' },
    { id: 3, label: 'Antimicrobial therapy, particularly receipt of IV antibiotics during hospitalization with the past 3 months' },
    { id: 4, label: 'Recent influenza-like illness' },
    { id: 5, label: 'Necrotizing or cavitary pneumonia' },
    { id: 6, label: 'Presence of empyema' },
    { id: 7, label: 'Risk factors for MRSA colonization: (End-stage renal disease, Living in crowded conditions, Incarceration, Injection drug use, Contact sports participation)' },
    { id: 8, label: 'NONE of the Above' },

  ];


  const handleSelection = (type, selection) => {
    if (type === 'beta') setBetaOption(selection);
    if (type === 'pRisk') {
      setPRiskOptions(prev => 
        prev.includes(selection) 
          ? prev.filter(option => option !== selection)
          : [...prev, selection]
      );
    }
    if (type === 'mrsa') {
      setMRSAOptions(prev => 
        prev.includes(selection) 
          ? prev.filter(option => option !== selection)
          : [...prev, selection]
      );
    }
  };

  const handleNextStep = () => {
    const pRiskSelected = pRiskOptions.length === 1 && pRiskOptions.includes(6); // Ensure only 'NONE of the Above' is selected in pRiskOptions
    const mrsaSelected = mrsaOptions.length === 1 && mrsaOptions.includes(8); // Ensure only 'NONE of the Above' is selected in mrsaOptions
  
    if (betaOption === 'NO' && pRiskSelected && mrsaSelected) {
      navigation.navigate('NineteenthOption');
    }
  }
    const isNextEnabled = betaOption !== null && pRiskOptions.length > 0 && mrsaOptions.length > 0;


    useFocusEffect(
      React.useCallback(() => {
        // Reset state when the screen is focused
        setBetaModal(false);
        setPRiskDosesModal(false);
        setMRSARiskModal(false);
        setBetaOption(null);
        setPRiskOptions([]);
        setMRSAOptions([]);

      }, [])
    );
    
  

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
    width:'100%',
    // height:'100%',
    // marginTop:RFValue(100),
   backgroundColor:COLORS.primarydarkBule,
   borderTopWidth:2,
   borderBottomWidth:2,
   borderColor:COLORS.secondColor,
   paddingVertical:10,
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
      width:50,
      height:90,
      // backgroundColor:COLORS.red,
     }}
    ></FastImage> */}

<View 
style={{
  // backgroundColor:"#f0f",
  alignSelf:'center',
  width:'85%',
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
                  {"You've carefully considered your patient's condition and navigated through the evidence-based recommendations for management of CAP in general ward. "}
                  </Text>

          </View>
                  </View>
  </View>

      <ScrollView>
        <View style={{
          // paddingHorizontal: SIZES.base,
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
                borderWidth:2,
                borderColor:COLORS.primary,
                backgroundColor: COLORS.white,
                padding: SIZES.base,
                marginBottom: SIZES.margin,

              }}>
             

               
                  <Text style={{
                    ...FONTS.h3,
                    // fontFamily: FONTS.fontFamilyBold,
                    textAlign:'center',
                    fontWeight:'bold',
                    color: COLORS.primarydarkBule,
                    marginBottom: SIZES.margin
                  }}>
                  {'Select all criteria that apply to your patient in each of the following tab: '}
                  </Text>

                 
                  <TouchableOpacity
            onPress={()=>{
              setBetaModal(true)
            }}
            >
            <Animatable.View
              useNativeDriver
              delay={50 * 0}
              animation={'fadeInRight'}
              style={{
                width: "75%",
                // paddingHorizontal:40,
                // height: RFValue(0),
                padding: 10,
                // flexDirection: "row",
                alignSelf:'center',
                borderRadius: SIZES.radius,
                borderWidth: 2,
                borderColor: COLORS.primary,
                backgroundColor: COLORS.primarydarkBule,
                // marginTop: RFValue(15),
                // elevation: RFValue(5),
                alignItems:"center",
                justifyContent:'center',
                // marginBottom: SIZES.margin,
                // alignSelf:'center'

              }}>
             
                  <Text style={{
                    ...FONTS.h2,
                    // fontFamily: FONTS.fontFamilyBold,
                    textAlign:'center',
                    // fontStyle: "italic",
                    color: COLORS.white,
                    fontWeight:'bold'
                    // marginBottom: SIZES.margin
                  }}>
                  {'Beta-lactam allergy'}
                  </Text>

            </Animatable.View>
            </TouchableOpacity>
         
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
       style={{width:'45%'}}
       onPress={()=>{
        setMRSARiskModal(true)
       }}
       >
            <Animatable.View
              useNativeDriver
              delay={50 * 0}
              animation={'fadeInRight'}
              style={{
                // width: "30%",
                // paddingHorizontal:30,
                // height: RFValue(0),
                padding: 10,
                // flexDirection: "row",
                borderRadius: SIZES.radius,
                borderWidth: 2,
                borderColor: COLORS.primary,
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
                    // fontStyle: "italic",
                    color: COLORS.white,
                    fontWeight:'bold'
                    // marginBottom: SIZES.margin
                  }}>
                  {'MRSA Risk'}
                  </Text>
                 
            </Animatable.View>
            </TouchableOpacity>
        
            <TouchableOpacity
        style={{width:'45%'}}
            onPress={()=>{
              setPRiskDosesModal(true)
            }}
            >
            <Animatable.View
              useNativeDriver
              delay={50 * 0}
              animation={'fadeInRight'}
              style={{
                // width: "30%",
                // paddingHorizontal:30,
                // height: RFValue(0),
                // paddingVertical:10,
                padding: 10,
                // flexDirection: "row",
                borderRadius: SIZES.radius,
                borderWidth: 2,
                borderColor: COLORS.primary,
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
                    // fontStyle: "italic",
                    color: COLORS.white,
                    fontWeight:'bold'
                    // marginBottom: SIZES.margin
                  }}>
                  {'P.aeruginosa Risk'}
                  </Text>

            </Animatable.View>
            </TouchableOpacity>
            </View>
            
            </Animatable.View>


          

        </View>

    
        {isNextEnabled && (
        <TouchableOpacity
        style={{}}
        onPress={handleNextStep}
            >
            <Animatable.View
              useNativeDriver
              delay={50 * 0}
              animation={'fadeInRight'}
              style={{
                // width: "30%",
                paddingHorizontal:30,
                // height: RFValue(0),
                // paddingVertical:10,
                padding: 10,
                alignSelf:'center',
                // flexDirection: "row",
                borderRadius: SIZES.radius,
                borderWidth: 2,
                borderColor: COLORS.primarydarkBule,
                backgroundColor: COLORS.primary,
                marginTop: RFValue(15),
                // elevation: RFValue(5),
                alignItems:"center",
                justifyContent:'center',
                // marginBottom: SIZES.margin,
                // alignSelf:'center'

              }}>
             
                  <Text style={{
                    ...FONTS.h2,
                    // fontFamily: FONTS.fontFamilyBold,
                    textAlign:'center',
                    // fontStyle: "italic",
                    color: COLORS.white,
                    fontWeight:'bold'
                    // marginBottom: SIZES.margin
                  }}>
                  {'Next Step'}
                  </Text>

            </Animatable.View>
            </TouchableOpacity>
       )}

      </ScrollView>


    </View>



{ BetaModal && 
   
   <Modal
     animationType="slide"
     transparent={true}
     visible={BetaModal}
     onRequestClose={() => setBetaModal(false)}
   >
      <Pressable
         style={styles.centeredView}
         onPress={() => setBetaModal(false)} 
       >

       <View style={styles.modalView}>
         
               <Text style={styles.modalText}>{"History of a severe beta-lactam allergy (eg, anaphylaxis)"}</Text>
 
               <View
   style={{
    width:'95%',
    alignSelf:'center',
    paddingHorizontal: SIZES.base,
      marginTop: RFValue(15),
    // backgroundColor:"#00f",
    alignItems:'center',
    flexDirection:'row-reverse',
    justifyContent:'space-around'
   }}
   >
       <TouchableOpacity
       onPress={()=>{
        // setmodalVisible(true)
        handleSelection('beta', 'YES'); setBetaModal(false);
        
       }}
       >
            <Animatable.View
              useNativeDriver
              delay={50 * 0}
              animation={'fadeInRight'}
              style={{
                // width: "30%",
                paddingHorizontal:20,
                // height: RFValue(0),
                padding: 15,
                // flexDirection: "row",
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.green,
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
                    // fontStyle: "italic",
                    color: COLORS.white,
                    fontWeight:'bold'
                    // marginBottom: SIZES.margin
                  }}>
                  {'YES'}
                  </Text>

            </Animatable.View>
            </TouchableOpacity>
        
            <TouchableOpacity
            onPress={()=>{
              handleSelection('beta', 'NO'); setBetaModal(false);
            }}
            >
            <Animatable.View
              useNativeDriver
              delay={50 * 0}
              animation={'fadeInRight'}
              style={{
                // width: "30%",
                paddingHorizontal:20,
                // height: RFValue(0),
                padding: 15,
                // flexDirection: "row",
                borderRadius: SIZES.radius,
                backgroundColor: 'red',
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
                    // fontStyle: "italic",
                    color: COLORS.white,
                    fontWeight:'bold'
                    // marginBottom: SIZES.margin
                  }}>
                  {'NO'}
                  </Text>

            </Animatable.View>
            </TouchableOpacity>
            </View>
       </View>
     </Pressable>
   </Modal>
  
 }
 



{ PRiskDosesModal && 
   
   <Modal
     animationType="slide"
     transparent={true}
     visible={PRiskDosesModal}
     onRequestClose={() => setPRiskDosesModal(false)}
   >
      <Pressable
         style={styles.centeredView}
        //  onPress={() =>{
        //   // setPRiskDosesModal(false)
        //   } }
       >

       <View style={styles.modalViewNO}>
       

<View style={{ width: 300, padding: 20, backgroundColor: 'white', borderRadius: 10 }}>

{PRiskoptions.map(option => (
                <Pressable
                  key={option.id} onPress={() => handleSelection('pRisk', option.id)} style={{flexDirection: 'row', alignItems: 'center', marginVertical: 10}}
                >
                  {pRiskOptions.includes(option.id) ? (
                    <Icon name="check-box" size={24} color={COLORS.primarydarkBule} style={{ marginRight: 10 }} />
                  ) : (
                    <Icon name="check-box-outline-blank" size={24} color={COLORS.primarydarkBule} style={{ marginRight: 10 }} />
                  )}
                  <Text>{option.label}</Text>
                  
                </Pressable>
              ))}
      <Pressable onPress={()=> {
        setPRiskDosesModal(false)

                  }} style={{ marginTop: 20 ,backgroundColor:COLORS.secondColor,padding:10,borderRadius:10}}>
            <Text style={{ textAlign: 'center', color: COLORS.primarydarkBule }}>Close</Text>
          </Pressable>
        </View>

       </View>
     </Pressable>
   </Modal>
  
 }


{ MRSARiskModal && 
   
   <Modal
     animationType="slide"
     transparent={true}
     visible={MRSARiskModal}
     onRequestClose={() => setMRSARiskModal(false)}
   >
      <Pressable
         style={styles.centeredView}
        //  onPress={() =>{
        //    setMRSARiskModal(false)
        //   } }
       >

       <View style={styles.modalViewNO}>
       

<View style={{ width: 300, padding: 20, backgroundColor: 'white', borderRadius: 10 }}>

          {MRSARiskoptions.map(option => (
            <Pressable key={option.id} onPress={() => handleSelection('mrsa', option.id)} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
             
              {mrsaOptions.includes(option.id) ? (
                    <Icon name="check-box" size={24} color={COLORS.primarydarkBule} style={{ marginRight: 10 }} />
                  ):(
                    <Icon name="check-box-outline-blank" size={24} color={COLORS.primarydarkBule} style={{ marginRight: 10 }} />
                  )}
              <Text>{option.label}</Text>
            </Pressable>
          ))}
          <Pressable onPress={()=> {
        setMRSARiskModal(false)

                  }} style={{ marginTop: 20 ,backgroundColor:COLORS.secondColor,padding:10,borderRadius:10}}>
            <Text style={{ textAlign: 'center', color: COLORS.primarydarkBule }}>Close</Text>
          </Pressable>
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
    fontSize: 15,
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
export default EighteenthOption;
