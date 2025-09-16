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
  Alert,
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
const SecondOption = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleNO, setModalVisibleNO] = useState(false);
  const [modalVisible18, setmodalVisible18] = useState(false);
  const [modalVisible20, setmodalVisible20] = useState(false);
 const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { id: 1, label: 'Age ≥ 65 years' },
    { id: 2, label: 'Confusion' },
    { id: 3, label: 'BUN ≥ 20 mg/dL (7 mmol/L)' },
    { id: 4, label: 'Respiratory rate ≥ 30 breaths/minute' },
    { id: 5, label: 'Systolic blood pressure < 90 mmHg or diastolic blood pressure ≤ 60 mmHg' },
    { id: 6, label: 'Major Comorbidity (Pulmonary, Cardiac, Renal, Hepatic, Cancer)' },
    { id: 7, label: 'NONE of the Above' },
  ];

  const buttons = [
    { title: 'Septic shock requiring vasopressor support', screen: '',alertt:false },
    { title: 'Impending need for invasive mechanical ventilation', screen: '' },
  
  ];
  const handleOptionSelect = (id) => {
    setSelectedOptions(prev => 
      prev.includes(id) ? prev.filter(option => option !== id) : [...prev, id]
    );
  };




  

const handleNextStep = () => {
  const hasNoneOfTheAbove = selectedOptions.includes(7);
  const hasAge65 = selectedOptions.includes(1);
  const hasMajorComorbidity = selectedOptions.includes(6);

  if (hasNoneOfTheAbove && selectedOptions.length === 1) {
    // Handle 'None of the Above' when selected alone
    navigation.navigate('ThirdOption');
    setModalVisibleNO(false);

  } else if (hasAge65 && selectedOptions.length === 1) {
    // Handle 'Age ≥65 years' when selected alone
    navigation.navigate('ThirdOption');
    setModalVisibleNO(false);
  
  } else if (
    (hasAge65 && hasMajorComorbidity) ||
    (selectedOptions.length === 1 && !hasNoneOfTheAbove) ||
    (selectedOptions.length === 2 && hasAge65 && !hasMajorComorbidity)
  ) {
    // Handle the second condition
    console.log("18")
    setmodalVisible18(true);
  } else if (
    (selectedOptions.length >= 3 && selectedOptions.length <= 5) &&
    selectedOptions.every(option => option >= 1 && option <= 5) 
  ) {
    // Handle the third condition
    setmodalVisible20(true);
    console.log("20")
  }
};

useEffect(() => {
  const unsubscribe = navigation.addListener('blur', () => {
    setModalVisible(false);
    setModalVisibleNO(false);
    setmodalVisible18(false);
    setmodalVisible20(false);
  });

  return unsubscribe;
}, [navigation]);


useFocusEffect(
  React.useCallback(() => {
    // Reset state when the screen is focused
    setSelectedOptions([]);
    setModalVisible(false);
    setModalVisibleNO(false);
    setmodalVisible18(false);
    setmodalVisible20(false);
  }, [])
);


   

 

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
              ...FONTS.body3,
              color: COLORS.primarydarkBule,
              fontWeight: "bold",
              textAlign:'left',
              marginBottom: SIZES.margin
            }}
          > {"Are either of the following present ? "}</Text>
          </View>


      <ScrollView>
        <View style={{
        //   paddingHorizontal: SIZES.base,
        //   alignItems:'center',
        //   backgroundColor:COLORS.secondColor,

        }}>
         


          {buttons.map((button, index) => (
          <Animatable.View
                useNativeDriver
                delay={50}
                animation={'fadeInRight'}
                style={{
                  width: "100%",
                  height: RFValue(70),
                  flexDirection: "row",
                  // borderRadius: SIZES.radius,
                  borderWidth: 2,
                  borderColor: COLORS.primary,
                  backgroundColor: COLORS.secondColor,
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
                    color: COLORS.primarydarkBule,
                    
                  }}
                  
                  >
                    {button.title}
                  </Text>
                </View>
              </Animatable.View>
          ))}
              

   

        </View>
 
   <View
   style={{
    width:'90%',
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
        setModalVisible(true)
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
                    fontStyle: "italic",
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
              setModalVisibleNO(true)
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
                    fontStyle: "italic",
                    color: COLORS.white,
                    fontWeight:'bold'
                    // marginBottom: SIZES.margin
                  }}>
                  {'NO'}
                  </Text>

            </Animatable.View>
            </TouchableOpacity>
            </View>

      </ScrollView>


     

  { modalVisible && 
   
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
         <Pressable
            style={styles.centeredView}
            onPress={() => setModalVisible(false)} 
          >

          <View style={styles.modalView}>
            <Image 
            source={images.alert}
            style={{
              width: 100,
              height: 100,
              marginBottom: 10
            }}
            ></Image>
            <Text style={styles.modalText}>{'Urgent transfer to a site of care that can provide critical care is warranted for this patient.'}</Text>
         
          </View>
        </Pressable>
      </Modal>
     
    }
  

  { modalVisibleNO && 
   
   <Modal
     animationType="slide"
     transparent={true}
     visible={modalVisibleNO}
     onRequestClose={() => setModalVisibleNO(false)}
   >
      <Pressable
         style={styles.centeredView}
        //  onPress={() => setModalVisibleNO(false)} 
       >

       <View style={styles.modalViewNO}>
       

<View style={{ width: 300, padding: 20, backgroundColor: 'white', borderRadius: 10 }}>
<Text style={{
                    ...FONTS.h3,
                    // fontFamily: FONTS.fontFamilyBold,
                    textAlign:'center',
                    fontWeight:'bold',
                    // fontStyle: "italic",
                    color: COLORS.primarydarkBule,
                    // marginBottom: SIZES.margin
                  }}>
                  {'Select all criteria that apply to your patient : '}
                  </Text>
          {options.map(option => (
            <Pressable key={option.id} onPress={() => handleOptionSelect(option.id)} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
              {selectedOptions.includes(option.id) && (
                <Icon name="check-box" size={24} color={COLORS.primarydarkBule} style={{ marginRight: 10 }} />
              )}
              {!selectedOptions.includes(option.id) && (
                <Icon name="check-box-outline-blank" size={24} color="gray" style={{ marginRight: 10 }} />
              )}
              <Text>{option.label}</Text>
            </Pressable>
          ))}
          <Pressable onPress={handleNextStep} style={{ marginTop: 20 ,backgroundColor:COLORS.secondColor,padding:10,borderRadius:10}}>
            <Text style={{ textAlign: 'center', color: COLORS.primarydarkBule }}>Next Step</Text>
          </Pressable>
        </View>

       </View>
     </Pressable>
   </Modal>
  
 }




{ modalVisible18 && 
   
   
   <Modal
     animationType="slide"
     transparent={true}
     visible={modalVisible18}
     onRequestClose={() => setmodalVisible18(false)}
   >
      <Pressable
         style={styles.centeredView}
         onPress={() => setmodalVisible18(false)} 
       >

       <View style={styles.modalView18}>
         {/* <Image 
         source={images.alert}
         style={{
           width: 100,
           height: 100,
           marginBottom: 10
         }}
         ></Image> */}
         <View 
         style={{
            // flexDirection:'row'
         }}
         >
         <Text style={[styles.modalText18,{color:'white'}]}>{'Please, Admit the patient to general medical unit'}</Text>
         <Text style={styles.modalText18}>{'Would You like to choose the best antibiotic regimen?'}</Text>

         </View>

         <View
   style={{
    width:'90%',
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
        setmodalVisible18(false)
        navigation.navigate('EighteenthOption')
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
                    fontStyle: "italic",
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
              setmodalVisible18(false)
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
                    fontStyle: "italic",
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



{ modalVisible20 && 
   
   
   <Modal
     animationType="slide"
     transparent={true}
     visible={modalVisible20}
     onRequestClose={() => setmodalVisible20(false)}
   >
      <Pressable
         style={styles.centeredView}
         onPress={() => setmodalVisible20(false)} 
       >

       <View style={styles.modalView18}>
         <Image 
         source={images.alert}
         style={{
           width: 100,
           height: 100,
           marginBottom: 10
         }}
         ></Image>
         <View 
         style={{
            // flexDirection:'row'
         }}
         >
         <Text style={[styles.modalText18,{color:'white'}]}>{'Please, Admit the patient to ICU unit'}</Text>
         <Text style={styles.modalText18}>{'Would You like to choose the best antibiotic regimen?'}</Text>

         </View>

         <View
   style={{
    width:'90%',
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
        setmodalVisible20(false)
        navigation.navigate('TwentiethOption')
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
                    fontStyle: "italic",
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
              setmodalVisible20(false)
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
                    fontStyle: "italic",
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
    color: COLORS.primary,
    fontWeight:'bold',
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center',
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
export default SecondOption;
