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
const AuthMain = ({ navigation }) => {


  const [image_path, setimage_path] = React.useState('')
  const [nid_image, setNid_image] = React.useState(false)

  function chooseFile() {
    var options = {
      title: 'Select Image',

      storageOptions: {
        skipBackup: true,
        path: 'images',
        color: "#000",
      },
    };
    ImagePicker.showImagePicker(options, response => {
      // console.log(response)
      if (response.didCancel) {
      } else if (response.error) {
      } else {
        let source = response;
        // let obj = this.state.question_obj
        // obj.question_image = source.uri
        // console.log(source.uri)
        setimage_path(source.uri)
        setNid_image(true)
        RNFetchBlob.fetch(
          'POST',
          `https://camp-coding.tech/twkieel/item_img_uploader.php`,
          {
            Authorization: 'Bearer access-token',
            otherHeader: 'foo',
            'Content-Type': 'multipart/form-data',
          },
          [
            // element with property `filename` will be transformed into `file` in form data
            {
              name: 'image',
              filename: 'avatar.png',
              type: 'image/png',
              data: source.data,
            },


          ])
          .then(resp => {
            let resx = resp.json()

            console.log(resx)
            
            
            
            if(resx.use_ocr){
            getOCRData(resx.image_link)
          }else{
            setimage_path(resx.image_link)
            setNid_image(false)
          }

         
          })        // 
        // console.log(source)


      }
    });
  };



  getOCRData = (link) => {
    // console.log(link)
    axios.post("https://camp-coding.cognitiveservices.azure.com/computervision/imageanalysis:analyze?api-version=2023-02-01-preview&features=read", {
      url: link,
    },
      {
        headers: {
          'Content-Type': 'application/json',
          'Ocp-Apim-Subscription-Key': 'dac0c9448c32451181b9c50880fc6915'
        }
      }
    ).then((res) => {
      console.log(res.data)
      let arr = res.data.readResult.content.split("\n")
      arr = arr.slice(arr.indexOf("بطاقة تحقيق الشخصية") + 1, -1)
      // console.log(arr)
      setName(arr[0] + " " + arr[1])
      setAddress(arr[2] + " " + arr[3])
      setNid(arr[arr.length - 2])
      setimage_path(link)
      setNid_image(false)


    })
  }



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
      height: SIZES.height * 0.56,
    },
    signUp: {
      height: SIZES.height * 0.70,
    },
  });

  useEffect(() => {
    animationState.transitionTo('signUp');
  }, []);

  // async function _checkSignin() {
  //   if (phone != '' && password != '') {

  //     setloading(true)

  //     let data_send = {
  //       email: email,
  //       password: password

  //     }
  //     // console.log(JSON.stringify(data_send))


  //     axios.post('https://camp-coding.tech/ship_shop/user/auth/user_login.php', data_send).then(res => {
  //       if (res.data.status == 'success') {
  //         // console.log(res.data)
  //         dispatch(setUser(res.data.message));
  //         storedata(res.data.message)
  //         navigation.navigate('SignOTP', {
  //           uData: res.data.message,
  //         });
  //       } else {
  //         utils.toastAlert('error', res.data.message);
  //       }
  //       setloading(false)

  //     })

  //   } else {
  //     utils.toastAlert('error', 'tray agine later');

  //   }
  // }

  // async function _checkSignup() {
  //   if (email != '' && name != '' && phone != '' && password != '') {
  //     let uData = {
  //       name: name,
  //       email: email,
  //       password: password,
  //       phone: phone,
  //       image: image_path
  //     };

  //     axios.post('https://camp-coding.tech/ship_shop/user/auth/user_signup.php', uData).then(res => {
  //       console.log(uData)
  //       if (res.data.status == 'success') {
  //         dispatch(setUser(res.data.message));
  //         // navigation.navigate('SignOTP', {
  //         //   uData : res.data.message,
  //         // });

  //       } else {
  //         utils.toastAlert('error', res.data.message);
  //       }

  //     })
  //     // await Auth.setAccount(res.data.message);


  //   } else {
  //     utils.toastAlert('error', 'برجاء استكمال بيانات التسجيل');
  //   }
  // }


  // async function _checkSignup() {

  //   if (email != '' && name != '' && phone != '' && password != '') {
  //     setloading(true)
  //     let uData = {
  //       name: name,
  //       email: email,
  //       password: password,
  //       phone: phone,
  //       image: image_path
  //     };

  //     RNFetchBlob.fetch(
  //       'POST',
  //       `https://camp-coding.tech/ship_shop/user/auth/user_signup.php`,
  //       {
  //         Authorization: 'Bearer access-token',
  //         otherHeader: 'foo',
  //         'Content-Type': 'multipart/form-data',
  //       },
  //       [
  //         // element with property `filename` will be transformed into `file` in form data
  //         {
  //           name: 'image',
  //           filename: 'avatar.png',
  //           type: 'image/png',
  //           data: image_path,
  //         },
  //         {
  //           name: 'name',
  //           data: name
  //         },
  //         {
  //           name: 'password',
  //           data: password
  //         },
  //         {
  //           name: 'email',
  //           data: email
  //         },
  //         {
  //           name: 'phone',
  //           data: phone
  //         }

  //       ])
  //       .then(resp => {
  //         let resx = resp.data

  //         resx = resx.replace('\n', '')
  //         resx = JSON.parse(resx)
  //         console.log(resx)
  //         if (resx.status == 'success') {

  //           dispatch(setUser(resx.message));
  //           navigation.navigate('SignOTP', {
  //             uData: resx.message,
  //           });
  //           storedata(resx.message)
  //           //
  //         } else {

  //           utils.toastAlert('error', resx.message);
  //         }
  //         setloading(false)
  //       })



  //   } else {
  //     utils.toastAlert('error', 'tray agine later');
  //     // utils.toastAlert('error', 'برجاء استكمال بيانات التسجيل');
  //   }



  // }
  async function storedata(data) {

    await Auth.setAccount(data);
  }



  // function renderSignIn() {
  //   return (
  //     <MotiView
  //       state={animationState}
  //       style={{
  //         marginTop: SIZES.padding,
  //         alignSelf: 'center',
  //       }}>
  //       <Shadow>
  //         <View style={styles.authContainer}>
  //           <Text
  //             style={{
  //               width: '60%',
  //               lineHeight: 45,
  //               color: COLORS.darkBlue,
  //               ...FONTS.h2,
  //             }}>
  //             Login to Continue
  //           </Text>
  //           <KeyboardAwareScrollView
  //             showsVerticalScrollIndicator={false}
  //             enableOnAndroid={true}
  //             keyboardDismissMode="on-drag"
  //             keyboardShouldPersistTaps="handled"
  //             extraScrollHeight={-300}
  //             contentContainerStyle={
  //               {
  //                 // flexGrow: 1,
  //                 // justifyContent: 'center',
  //               }
  //             }>
  //             <FormInput
  //               containerStyle={{
  //                 marginTop: SIZES.radius,
  //                 borderRadius: SIZES.radius,
  //                 backgroundColor: COLORS.error,
  //               }}
  //               keyboardType="email-address"
  //               placeholder="Email"
  //               value={email}
  //               onChange={text => setEmail(text)}
  //               prependComponent={
  //                 <FastImage
  //                   source={icons.email}
  //                   style={{ width: 25, height: 24, marginRight: SIZES.base }}
  //                 />
  //               }
  //             />
  //             <FormInput
  //               containerStyle={{
  //                 marginTop: SIZES.radius,
  //                 borderRadius: SIZES.radius,
  //                 backgroundColor: COLORS.error,
  //               }}
  //               placeholder="Password"
  //               value={password}
  //               secureTextEntry={!isVisable}
  //               onChange={text => setPassword(text)}
  //               prependComponent={
  //                 <FastImage
  //                   source={icons.lock}
  //                   style={{ width: 25, height: 24, marginRight: SIZES.base }}
  //                 />
  //               }
  //               appendComponent={
  //                 <IconButton
  //                   icon={isVisable ? icons.eye : icons.eye_off}
  //                   iconStyle={{
  //                     tintColor: COLORS.gray,
  //                   }}
  //                   onPress={() => setIsVisable(!isVisable)}
  //                 />
  //               }
  //             />



  //           </KeyboardAwareScrollView>
  //           <TextButton
  //             label={'Login'}
  //             buttonContainerStyle={{
  //               height: 55,
  //               borderRadius: SIZES.radius,
  //               backgroundColor: COLORS.primary,
  //               marginTop: RFValue(20),
  //             }}
  //             loading={loading}

  //             labelStyle={{
  //               ...FONTS.h3,
  //               color: COLORS.white,
  //             }}
  //             onPress={() => _checkSignin()}
  //           />
  //         </View>
  //       </Shadow>
  //     </MotiView>
  //   );
  // }

  function renderSignUp() {
    return (
      <MotiView
        state={animationState}
        style={{
          height: SIZES.height * 0.70,
          marginTop: SIZES.padding,
          alignSelf: 'center',
          elevation:10
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
              التسجيل
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

              {image_path == "" ? (
                <TouchableOpacity
                  onPress={() => {
                    chooseFile()

                  }}
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    marginTop: SIZES.margin,
                    // borderBottomWidth: .5,
                    // width: "90%",
                    // alignSelf: "center",
                    borderColor: "#9F9FA0",
                    height: 55,
                    paddingHorizontal: SIZES.base,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.lightGray,
                    alignItems: 'center',
                  }}
                >




                  <Text
                    style={{
                      ...SIZES.h3,
                      fontFamily: 'Janna LT Bold', color: "#9F9FA0",
                      fontSize: 15,
                      textAlign: "right",
                      ...FONTS.h3,
                      marginRight: SIZES.base
                    }}
                  >
                    {'صورة البطاقة'}
                  </Text>


                  <FastImage
                    source={icons.upload}
                    style={{
                      width: 30, height: 30
                      // , marginRight: SIZES.base,
                      // alignItems:"flex-end"
                    }}
                    resizeMode='contain'
                  />


                </TouchableOpacity>
              ) : (

                <View
                  onPress={() => {
                    chooseFile()

                  }}
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    marginTop: SIZES.margin,
                    // borderBottomWidth: .5,
                    // width: "90%",
                    // alignSelf: "center",
                    borderColor: "#9F9FA0",
                    height: 55,
                    paddingHorizontal: SIZES.base,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.lightGray,
                    alignItems: 'center',
                  }}
                >

                  <Text
                     style={{
                      ...SIZES.h3,
                      fontFamily: 'Janna LT Bold', color: "#9F9FA0",
                      fontSize: 15,
                      textAlign: "right",
                      ...FONTS.h3,
                      marginRight: SIZES.base
                    }}
                  >
                    {'تم تحميل الصورة بنجاح'}
                  </Text>

                  <FastImage
                    source={icons.checkmark}
                    style={{
                      width: 30, height: 30, marginRight: SIZES.base,
                      // alignItems:"flex-end"
                    }}
                    resizeMode='contain'
                  />



                </View>


              )}

              <FormInput
                containerStyle={{
                  marginTop: SIZES.margin,
                  borderRadius: SIZES.radius,
                  backgroundColor: COLORS.error,
                }}
                placeholder="الإسم"
                value={name}
                onChange={text => setName(text)}

                appendComponent={
                  <FastImage
                    source={icons.person}
                    style={{ width: 25, height: 24, marginRight: SIZES.base }}
                    tintColor={COLORS.black}
                  />
                }
              />

              <FormInput
                containerStyle={{
                  marginTop: SIZES.margin,
                  borderRadius: SIZES.radius,
                  backgroundColor: COLORS.error,
                }}
                placeholder="العنوان"
                value={address}
                onChange={text => setAddress(text)}

                appendComponent={
                  <FastImage
                    source={icons.address}
                    style={{ width: 25, height: 24, marginRight: SIZES.base }}
                    tintColor={COLORS.black}
                  />
                }
              />
              <FormInput
                containerStyle={{
                  marginTop: SIZES.margin,
                  borderRadius: SIZES.radius,
                  backgroundColor: COLORS.error,
                }}
                keyboardType="phone-pad"
                placeholder="الرقم القومي"
                value={nid}
                onChange={text => setNid(text.replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]))}
                appendComponent={
                  <FastImage
                    source={icons.id}
                    style={{ width: 25, height: 24, marginRight: SIZES.base }}
                  />
                }
              />






            </KeyboardAwareScrollView>
            <TextButton
              label={'التأكيد والاقرار'}
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
               
               
                // navigation.navigate("SubmitInfo",{
                //   name:name,
                //   nid:nid,
                //   address:address,
                //   image_path:image_path
                // })
             
              
                
                
                if (name == "") {
                  utils.toastAlert("error", "من فضلك تأكد من ادخال الاسم بطريقة صحيحة")
                  return;
                }
                if (!ValidId(nid.replace(/ /g, ''))) {
                  utils.toastAlert("error", "من فضلك تأكد من ادخال الرقم القومي بطريقة صحيحة")
                  return;
                }
                if (image_path == "") {
                  utils.toastAlert("error", "من فضلك تأكد من ادخال صورة البطاقة بطريقة صحيحة")
                  return;
                }
                navigation.navigate("SubmitInfo",{
                  name:name,
                  nid:nid,
                  address:address,
                  image_path:image_path
                })
                setName('')
                setAddress('')
                setNid('')
                setimage_path('')
               

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



  const ValidId = (id) => {
    const regex = /^([1-9]{1})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})[0-9]{3}([0-9]{1})[0-9]{1}$/;

    // Alternative syntax using RegExp constructor
    // const regex = new RegExp('^([1-9]{1})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})[0-9]{3}([0-9]{1})[0-9]{1}$', '')

    const str = id.replace(/[\u0660-\u0669\u06f0-\u06f9]/g, function (c) {
      return c.charCodeAt(0) & 0xf;
  });
  // console.log(str)
    let m;

    if ((m = regex.exec(str)) !== null) {

      // console.log(m)
      // The result can be accessed through the m-variable.
      // m.forEach((match, groupIndex) => {
      //   console.log(`Found match, group ${groupIndex}: ${match}`);
      // });
      return true
    } else {
      return false

    }
  }


  function renderAuthContainerFooter() {
    return (
      <View
        style={{
          flexDirection: 'row',
          height: 80,
          alignItems: 'flex-end',
          justifyContent: 'center',
          marginTop: -30,
          marginHorizontal: SIZES.radius,
          paddingBottom: SIZES.radius,
          borderBottomLeftRadius: SIZES.radius,
          borderBottomRightRadius: SIZES.radius,
          backgroundColor: COLORS.light60,
          zIndex: 0,
        }}>
        <Text
          style={{
            color: COLORS.gray,
            ...FONTS.body5,
          }}>
          {mode == 'signIn' ? "Don't have account" : 'Have Account'}
        </Text>
        <TextButton
          label={mode == 'signIn' ? 'Create New Account' : 'Login'}
          buttonContainerStyle={{
            marginLeft: SIZES.base,
            backgroundColor: null,
          }}
          labelStyle={{
            color: COLORS.support4,
            ...FONTS.h5,
          }}
          onPress={() => {
            if (animationState.current === 'signIn') {
              animationState.transitionTo('signUp');
              setMode('signUp');
            } else {
              animationState.transitionTo('signIn');
              setMode('signIn');
            }
          }}
        />
      </View>
    );
  }

  const handleSignature = (signature) => {
    // `signature` is the captured signature image data (base64 string)
    console.log(signature);
  };

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
                  source={images.sisi}
                  style={{
                    alignSelf: 'center',
                    marginTop: SIZES.padding ,
                    width: "100%",
                    height: RFValue(100),
                  }}

                  resizeMode="contain"
                />
        {/* Auth Container */}
        <ScrollView
        contentContainerStyle={{
          elevation:15
        }}
       showsVerticalScrollIndicator={false}
        >
        <View
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
                position:"absolute",
                top:"24%",
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

export default AuthMain;
