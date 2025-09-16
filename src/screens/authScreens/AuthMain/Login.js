import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Modal,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet, ScrollView, ActivityIndicator,
  Image
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { RFValue } from 'react-native-responsive-fontsize';
import { CheckBox, FormInput, IconButton, TextButton } from '../../../components';
import { MotiView, useAnimationState } from 'moti';
import { Shadow } from 'react-native-shadow-2';
import { FONTS, SIZES, COLORS, icons, images, lotties } from '../../../constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import utils from '../../../utils';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../redux/reducers/UserReducer';
import Auth from '../../../Services';
import axios, { all } from 'axios';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob'
import SignatureScreen from "react-native-signature-canvas";
import { Button } from 'react-native-paper';
import AnimatedLottieView from 'lottie-react-native';
import * as Animatable from 'react-native-animatable';
const Login = ({ navigation }) => {


  const [image_path, setimage_path] = React.useState('')
  const [nid_image, setNid_image] = React.useState(false)

  // function chooseFile() {
  //   var options = {
  //     title: 'Select Image',

  //     storageOptions: {
  //       skipBackup: true,
  //       path: 'images',
  //       color: "#000",
  //     },
  //   };
  //   ImagePicker.showImagePicker(options, response => {
  //     // console.log(response)
  //     if (response.didCancel) {
  //     } else if (response.error) {
  //     } else {
  //       let source = response;
  //       // let obj = this.state.question_obj
  //       // obj.question_image = source.uri
  //       // console.log(source.uri)
  //       setimage_path(source.uri)
  //       setNid_image(true)
  //       RNFetchBlob.fetch(
  //         'POST',
  //         `https://camp-coding.tech/twkieel/item_img_uploader.php`,
  //         {
  //           Authorization: 'Bearer access-token',
  //           otherHeader: 'foo',
  //           'Content-Type': 'multipart/form-data',
  //         },
  //         [
  //           // element with property `filename` will be transformed into `file` in form data
  //           {
  //             name: 'image',
  //             filename: 'avatar.png',
  //             type: 'image/png',
  //             data: source.data,
  //           },


  //         ])
  //         .then(resp => {
  //           let resx = resp.json()

  //           console.log(resx)



  //           if(resx.use_ocr){
  //           getOCRData(resx.image_link)
  //         }else{
  //           setimage_path(resx.image_link)
  //           setNid_image(false)
  //         }


  //         })        // 
  //       // console.log(source)


  //     }
  //   });
  // };



  // getOCRData = (link) => {
  //   // console.log(link)
  //   axios.post("https://camp-coding.cognitiveservices.azure.com/computervision/imageanalysis:analyze?api-version=2023-02-01-preview&features=read", {
  //     url: link,
  //   },
  //     {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Ocp-Apim-Subscription-Key': 'dac0c9448c32451181b9c50880fc6915'
  //       }
  //     }
  //   ).then((res) => {
  //     console.log(res.data)
  //     let arr = res.data.readResult.content.split("\n")
  //     arr = arr.slice(arr.indexOf("بطاقة تحقيق الشخصية") + 1, -1)
  //     // console.log(arr)
  //     setName(arr[0] + " " + arr[1])
  //     setAddress(arr[2] + " " + arr[3])
  //     setNid(arr[arr.length - 2])
  //     setimage_path(link)
  //     setNid_image(false)


  //   })
  // }



  const dispatch = useDispatch();
  // States
  const [mode, setMode] = useState('signUp');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [isVisable, setIsVisable] = useState(false);
  const [nid, setNid] = useState('');
  const [phone, setPhone] = useState('');
  const [termsChecked, setTermsChecked] = useState(false);
  const [loading, setloading] = useState(false);


  // Animation States
  const animationState = useAnimationState({
    signIn: {
      height: SIZES.height * 0.60,
    },
    signUp: {
      height: SIZES.height * 0.70,
    },
  });

  useEffect(() => {
    animationState.transitionTo('signIn');
  }, []);


  async function storedata(data) {

    await Auth.setAccount(data);
  }



  function login() {
    setloading(true)
    let data_send={

      nat_id:nid,
      pass:password
    }
    axios.post("https://camp-coding.online/zifta_work/pioneer_version/login.php",data_send).then((res) => {
      if (res.status == 200) {
        if (res.data.status == "success") {
          utils.toastAlert("success", "تم تسجيل الدخول بنجاح")
          dispatch(setUser(res.data.message))
          storedata(res.data.message)
          setloading(false)
          setPassword('')
          setNid('')
        }
        else {
          utils.toastAlert("error", "حدث خطأ ما برجاء المحاولة لاحقا")
          setloading(false)
        }

      } else {
        utils.toastAlert("error", "حدث خطأ ما برجاء المحاولة لاحقا")
        setloading(false)
      }
    })
  }

  function renderSignUp() {
    return (
      <MotiView
        state={animationState}
        style={{
          height: SIZES.height * 0.60,
          // marginTop: SIZES.padding,
          alignSelf: 'center',
          elevation: 10
        }}>
        {/* <Shadow> */}
        <View style={styles.authContainer}>
          <Text
            style={{
              // width: '60%',
              lineHeight: 45,
              color: COLORS.darkBlue,
              ...FONTS.h2,
              textAlign: "center"
            }}>
            تسجيل الدخول
          </Text>
          <KeyboardAwareScrollView
            enableOnAndroid={true}
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="handled"
            extraScrollHeight={-300}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
              marginTop: SIZES.padding,
              paddingBottom: SIZES.padding * 2,
            }}
          >






            <FormInput
              containerStyle={{
                marginTop: SIZES.margin,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.error,
              }}
              keyboardType="phone-pad"
              placeholder="الرقم القومي"
              value={nid}
              onChange={text => setNid(text)}
              appendComponent={
                <FastImage
                  source={icons.id}
                  style={{ width: 25, height: 24, marginRight: SIZES.base }}
                />
              }
            />
            <FormInput
              containerStyle={{
                marginTop: SIZES.margin,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.error,
              }}
              keyboardType="password"
              placeholder="كلمة المرور"
              value={password}

              onChange={text => setPassword(text)}
              appendComponent={
                <FastImage
                  source={icons.id}
                  style={{ width: 25, height: 24, marginRight: SIZES.base }}
                />
              }
            />






          </KeyboardAwareScrollView>
          <TextButton
            label={'تسجيل'}
            buttonContainerStyle={{
              height: RFValue(55),
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.primary,
              marginTop: RFValue(20),
            }}
            loading={loading}
            labelStyle={{
              ...FONTS.h3,
              color: COLORS.white,
            }}
            onPress={() => {
              // console.log(email)


              // navigation.navigate("Home")

              // navigation.navigate("")
            


              
              if (nid=="") {
                utils.toastAlert("error", "من فضلك تأكد من ادخال الرقم القومي بطريقة صحيحة")
                return;
              }
              if (password == "") {
                utils.toastAlert("error", "من فضلك تأكد من ادخال كلمة المرور بطريقة صحيحة")
                return;
              }
              login()
             
              // setimage_path('')


            }}
          />
        </View>
        {/* </Shadow> */}
      </MotiView>
    );
  }
  function renderAuthContainer() {

    return renderSignUp();

  }



  


  

  

  return (
    <>
      <View style={styles.container}>
        {/* <FastImage
          source={images.sisi}
          style={{
            alignSelf: 'center',
            marginTop: SIZES.padding ,
            width: "100%",
            height: RFValue(100),
            
          }}
          resizeMode='contain'
        /> */}
        <Animatable.Image
                  animation="pulse" easing="ease-out" iterationCount="infinite" duration={1500}
                  // animation="slideInDown" iterationCount={5} direction="alternate"
                  source={images.main_logo_full}
                  style={{
                    alignSelf: 'center',
                    marginTop: SIZES.padding ,
                    width: "100%",
                    height: RFValue(150),
                  }}

                  resizeMode="contain"
                />
        {/* Auth Container */}
        <ScrollView
          contentContainerStyle={{
            elevation: 15,

          }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              // marginTop: SIZES.margin
            }}
          >
            {renderAuthContainer()}
          </View>
        </ScrollView>


        {/* <SignatureScreen
      
      imageType='image/jpeg'
     
      clearText='ازالة'
      confirmText='تأكيد'
        onOK={handleSignature}
        onEmpty={() => console.log('No signature')}
      />
      <Button
        title="Clear Signature"
        // onPress={() =>signatureRef.clearSignature()}
      /> */}
        {/* {renderAuthContainerFooter()} */}

        {/* {mode === 'signIn'} */}




        <Modal
          visible={nid_image}
          transparent>
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.8)',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                ...FONTS.body2,
                color: COLORS.white,
                marginBottom: SIZES.margin

              }}
            >
              جاري تحليل الصورة
            </Text>
            <Image
              source={{ uri: image_path }}
              style={{
                width: "90%",
                height: 250
              }}
            />
            {/* <ActivityIndicator size={50} color={COLORS.primary} style={{position:"absolute",top:"50%"}}/> */}
            <AnimatedLottieView
              autoPlay
              source={lotties.Loading2}
              style={{
                width: 300, height: 300,
                position: "absolute",
                top: "24%",
                // backgroundColor:COLORS.primary
                // top:"50%"
              }}
              loop
              duration={3000}
            />


          </View>

        </Modal>
      </View>

    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZES.padding,
    backgroundColor: COLORS.lightGray,
  },
  authContainer: {
    flex: 1,
    width: SIZES.width - SIZES.padding * 2,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.light,

    // alignSelf: 'center',
    // alignItems:"center",
    // justifyContent:"center",
    zIndex: 1,
  },
  socialButtonContainer: {
    width: 55,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.gray3,
  },
});

export default Login;
