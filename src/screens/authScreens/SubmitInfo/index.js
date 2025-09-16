import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Modal,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet, ScrollView, ActivityIndicator
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { RFValue } from 'react-native-responsive-fontsize';
import { AlertModal, CheckBox, FormInput, IconButton, TextButton } from '../../../components';
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
const SubmitInfo = ({ navigation, route }) => {
  const { name, nid, address, image_path } = route.params;

  // const [name, setName] = useState('');
  const [signModal, setSignModal] = useState(false);
  const [submitMethodModel, setSubmitMethodModel] = useState(false);
  const [SubmitDoneModal, setSubmitDoneModal] = useState(false);
  const [signError, setSignError] = useState(false);
  const [Loading, setLoading] = useState(false);

  // const [image_path, setimage_path] = React.useState('')

  function chooseFile() {
    setSubmitMethodModel(false)
    var options = {
      title: 'Select Image',

      storageOptions: {
        skipBackup: true,
        path: 'images',
        color: "#000",
      },
    };
    ImagePicker.showImagePicker(options, response => {
      console.log(response)
      if (response.didCancel) {
      } else if (response.error) {
        utils.toastAlert("error", "حدث خطأ ما برجاء المحاولة مرة اخري")
      } else {
        let source = response;
        // let obj = this.state.question_obj
        // obj.question_image = source.uri

        // setimage_path(source.data)
        // console.log(source)
        upload_img(source.data)




      }
    });
  };
  const upload_img = (img) => {
    setLoading(true)
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
          data: img,
        },


      ])
      .then(resp => {
        let resx = resp.json()
        sendData(resx.image_link)



      })
  }

  const sendData = (image) => {


    let data_send = {
      image_nat_id: image_path,
      address: address,
      nat_id: nid,
      name: name,
      image_signature: image
    }
    axios.post("https://camp-coding.tech/twkieel/user_signup.php", data_send).then((res) => {
      // console.log(res.data)
      setSignModal(false)
      if (res.data.status == "error") {
        utils.toastAlert("success", "شكرا لثقتكم", res.data.message)
        navigation.goBack()
        setLoading(false)

      } else {
        setSubmitDoneModal(true)
        // utils.toastAlert("success","شكرا لثقتكم","تم تأكيد الطلب بنجاح")
        setLoading(false)
      }
    })

  }


  function renderModelPerson() {
    return (
      <MotiView
        // state={animationState}
        style={{
          height: SIZES.height * 0.70,
          marginTop: SIZES.padding,
          alignSelf: 'center'

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
            نموذج تأييد طالب ترشح
          </Text>
          <View style={{

            marginTop: SIZES.padding,
            paddingBottom: SIZES.padding * 2,
          }}>
            <Text
              style={{
                // width: '60%',
                lineHeight: 25,
                color: COLORS.darkBlue,
                ...FONTS.h4,
                textAlign: "right"
              }}>
              أؤيد انا المواطن (المؤيد) : <Text style={{ fontWeight: "bold" }}>{name} </Text>
            </Text>
            <Text
              style={{
                // width: '60%',
                lineHeight: 25,
                color: COLORS.darkBlue,
                ...FONTS.h4,
                textAlign: "right"
              }}>
              ومحل اقامتي : <Text style={{ fontWeight: "bold" }}>{address} </Text>
            </Text>


            <Text
              style={{
                // width: '60%',
                lineHeight: 25,
                color: COLORS.darkBlue,
                ...FONTS.h4,
                textAlign: "right"
              }}>
              ترشح السيد : <Text style={{ fontWeight: "bold" }}>{"عبد الفتاح سعيد حسن خليل السيسي"}</Text>
            </Text>

            <Text
              style={{
                // width: '60%',
                lineHeight: 25,
                color: COLORS.darkBlue,
                ...FONTS.h4,
                textAlign: "right"
              }}>
              وشهرته : <Text style={{ fontWeight: "bold" }}>{"عبد الفتاح السيسي"}</Text>
            </Text>
            <Text
              style={{
                // width: '60%',
                lineHeight: 25,
                color: COLORS.darkBlue,
                ...FONTS.h4,
                textAlign: "right",
                marginTop: SIZES.margin,
                fontWeight: "bold"
              }}>
              رئيسا لجمهورية مصر العربية في انتخابات رئاسة الجمهورية لعام ٢٠٢٤ اقر بعدم سبق تأييدي له او لمرشح احر لهذا المنسب وان جميع البيانات المثبتة بهذا النموذج صحيح
            </Text>
          </View>
          {/* <KeyboardAwareScrollView
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

                       </KeyboardAwareScrollView> */}
          <TextButton
            label={'التأكيد'}
            buttonContainerStyle={{
              height: RFValue(55),
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.primary,
              marginTop: RFValue(20),
            }}
            // loading={loading}
            labelStyle={{
              ...FONTS.h3,
              color: COLORS.white,
            }}
            onPress={() => {
              setSubmitMethodModel(true)
            }}
          />

        </View>
        {/* </Shadow> */}

      </MotiView>
    );
  }



  const dispatch = useDispatch();
  // States



  const handleSignature = (signature) => {
    // `signature` is the captured signature image data (base64 string)
    // setSignError(false)
    // console.log();
    upload_img(signature.slice(signature.indexOf("base64,") + 7))
  };
  const style = `
    
    .m-signature-pad {
        position: absolute;
        font-size: 8px;
        width: 100%;
        height: 90%;
        // top: 50%;
        // left: 50%;
        // margin-left: -350px;
        // margin-top: -200px;
        border: 1px solid #e8e8e8;
        background-color: #fff;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.27), 0 0 40px rgba(0, 0, 0, 0.08) inset;
      }
      .m-signature-pad--footer
    .button {
      background-color: ${COLORS.primary};
      color: #FFF;
      width:100px;
      height:40px;
      margin-top:10px
    }
    `;

  return (
    <View style={styles.container}>


      <Animatable.Image
        animation="pulse" easing="ease-out" iterationCount="infinite" duration={1500}
        // animation="slideInDown" iterationCount={5} direction="alternate"
        source={images.sisi}
        style={{
          alignSelf: 'center',
          marginTop: SIZES.padding,
          width: "100%",
          height: RFValue(100),
        }}

        resizeMode="contain"
      />
      <ScrollView
        contentContainerStyle={{
          elevation: 15
        }}
        showsVerticalScrollIndicator={false}
      >
        {renderModelPerson()}
      </ScrollView>
      <Modal
        visible={signModal}
        onRequestClose={() => {
          setSignModal(false)
        }}
      >


        <View style={styles.container}>
          <SignatureScreen

            imageType='image/png'
            style={{ marginTop: SIZES.margin }}

            clearText='ازالة'
            confirmText='تأكيد'

            webStyle={style}
            onOK={handleSignature}
            onEmpty={() => {
              setSignError(true)

            }}
          />
          <AlertModal visableAlertModal={signError} message={"من فضلك تأكد من التوقيع"} res={"error"} onClose={() => { setSignError(false) }} />
        </View>

      </Modal>


      <Modal transparent visible={submitMethodModel}
        onRequestClose={() => {
          setSubmitMethodModel(false)
        }}
      >
        <View style={styles.modalBackGround}>
          <View
            style={styles.modalContainer}>
            <Text
              style={{
                // width: '60%',
                // lineHeight: 45,
                color: COLORS.darkBlue,
                ...FONTS.h2,
                textAlign: "center"
              }}>
              تأكيد بواسطة
            </Text>
            <TextButton
              label={'التوقيع'}
              buttonContainerStyle={{
                height: RFValue(55),
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.primary,
                marginTop: RFValue(20),
              }}
              // loading={loading}
              labelStyle={{
                ...FONTS.h3,
                color: COLORS.white,
              }}
              onPress={() => {
                setSubmitMethodModel(false)
                setSignModal(true)
              }}
            />
            <TextButton
              label={'صورة شخصية'}
              buttonContainerStyle={{
                height: RFValue(55),
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.primary,
                marginTop: RFValue(20),
              }}
              // loading={loading}
              labelStyle={{
                ...FONTS.h3,
                color: COLORS.white,
              }}
              onPress={() => {
                chooseFile()
              }}
            />

          </View>
        </View>
      </Modal>


      <Modal
        visible={SubmitDoneModal}
        onRequestClose={() => {
          navigation.goBack()
        }}
      >


        <View style={styles.container}>
          <AnimatedLottieView
            autoPlay
            source={lotties.done2}
            style={{
              width: 300, height: 300,
              // position:"absolute",
              alignSelf: "center"
              // top:"24%",
              // backgroundColor:COLORS.primary
              // top:"50%"
            }}
            loop
            duration={4000}
          />
          <Text
            style={{
              // width: '60%',
              // lineHeight: 45,
              color: COLORS.darkBlue,
              ...FONTS.h2,
              textAlign: "center"
            }}>
            شكرا لثقتكم
          </Text>
          <Text
            style={{
              // width: '60%',
              // lineHeight: 45,
              color: COLORS.darkBlue,
              ...FONTS.h2,
              textAlign: "center"
            }}>
            تم تأكيد الطلب بنجاح
          </Text>

          <TextButton
            label={'خروج'}
            buttonContainerStyle={{
              height: RFValue(55),
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.primary,
              marginTop: RFValue(40),
            }}
            // loading={loading}
            labelStyle={{
              ...FONTS.h3,
              color: COLORS.white,
            }}
            onPress={() => {
              navigation.goBack()
              setSubmitDoneModal(false)
            }}
          />
        </View>

      </Modal>
      <Modal
        visible={Loading}
        transparent>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.8)',
            alignItems: 'center',
            justifyContent: 'center',
          }}>

          {/* <ActivityIndicator size={50} color={COLORS.primary} style={{position:"absolute",top:"50%"}}/> */}
          <AnimatedLottieView
            autoPlay
            source={lotties.Loading2}
            style={{
              width: 300, height: 300,

              // backgroundColor:COLORS.primary
              // top:"50%"
            }}
            loop
            duration={4000}
          />


        </View>

      </Modal>



    </View>
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
  modalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    paddingHorizontal: RFValue(20),
    paddingVertical: RFValue(30),
    borderRadius: RFValue(30),
    elevation: RFValue(20),

  },
  header: {
    width: '100%',
    height: RFValue(40),
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});

export default SubmitInfo;
