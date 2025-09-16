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
const MemberData = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleNO, setModalVisibleNO] = useState(false);
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

  const handleOptionSelect = (id) => {
    setSelectedOptions(prev => 
      prev.includes(id) ? prev.filter(option => option !== id) : [...prev, id]
    );
  };

  const handleNextStep = () => {
    if (selectedOptions.includes(7)) {
      // Handle 'None of the Above'
      Alert.alert('Next Step', 'Move to the next page.'); //////
    } else if (selectedOptions.length === 1 && selectedOptions.includes(1)) {
      // Handle 'Age ≥65 years' only
      // Alert.alert('Next Step', 'Move to the next page.');
     navigation.navigate('Give_Help')

    } else if (
      selectedOptions.includes(1) && selectedOptions.includes(6) ||
      selectedOptions.length === 2 ||
      (selectedOptions.length === 1 && !selectedOptions.includes(7) && !selectedOptions.includes(6))
    ) {
      // Handle the second condition
      Alert.alert(
        'Please, Admit the patient to general medical unit',
        'Would You like to choose the best antibiotic regimen?'
      );
    } else if (selectedOptions.length >= 3 && selectedOptions.length <= 5 && !selectedOptions.includes(6) && !selectedOptions.includes(7)) {
      // Handle the third condition
      Alert.alert(
        'Please, Admit the patient to general medical unit',
        'Would You like to choose the best antibiotic regimen?'
      );
    }
  };

    const buttons = [
        { title: 'Septic shock requiring vasopressor support', screen: '',alertt:false },
        { title: 'Impending need for invasive mechanical ventilation', screen: '' },
      
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

{/* <View
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
        
          </View> */}
        <View />




      </View>
      <ScrollView>
        <View style={{
        //   paddingHorizontal: SIZES.base,
        //   alignItems:'center',
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
          > {"Are either of the following present ? "}</Text>
          </View>



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
              

    {/* <View
    style={{
          backgroundColor:COLORS.secondColor,
          width:'100%',
          alignItems:'center',
          paddingHorizontal: SIZES.base,
          paddingVertical: SIZES.base,
          justifyContent:'center'

    }}
    >
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

</View> */}

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
         onPress={() => setModalVisibleNO(false)} 
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
});
export default MemberData;
