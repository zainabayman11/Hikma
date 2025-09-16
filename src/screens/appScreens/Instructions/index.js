import React, {Component, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Dimensions,
  Animated,
  Easing,
  RefreshControl,
  Modal,
  ToastAndroid,
  AsyncStorage,
  Image,
  ActivityIndicator,
} from 'react-native';
// import {COLORS, FONTS, SIZES} from '../../../constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {RFValue} from 'react-native-responsive-fontsize';
import {useState} from 'react';
import axios from 'axios';
import { COLORS, FONTS, icons, images, SIZES, lotties } from '../../../constants';

import ImageZoom from 'react-native-image-pan-zoom';
import ImageViewer from 'react-native-image-zoom-viewer';
import FastImage from 'react-native-fast-image';
const Instructions = ({navigation}) => {
  const [instructions, setInstructions] = useState([]);
  const [modalimg, setmodalimg] = useState(false);
  const [image_link, setimage_link] = useState('');

  const [loading, setloading] = useState(false);

  const ins = async () => {
    setloading(true);
    axios
      .get(
        'https://camp-coding.online/zifta_work/pioneer_version/select_directions.php',
      )
      .then(async (res) => {
        if (res.status == 200) {
          if (typeof res.data == 'object') {
            // console.log(res.data);
            setInstructions(res.data);
          }
        }
        setloading(false);
      });
  };
  useEffect(() => {
    ins();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        
      }}>
       <View
                style={{
                    height: SIZES.height * .09,
                    marginBottom: RFValue(20),
                    backgroundColor: COLORS.primary, alignItems: "center", justifyContent: "space-between",
                    flexDirection: "row",
                    paddingHorizontal: RFValue(10)

                }}
            >
                <TouchableOpacity onPress={() => {
                    navigation.goBack()
                }}>
                    <FastImage
                        source={icons.back}
                        style={{
                            width: RFValue(25),
                            height: RFValue(25),
                            // alignSelf:"center"
                        }}
                        resizeMode='contain'
                        tintColor={COLORS.white}
                    />
                </TouchableOpacity>
                <Text
                    style={{
                        ...FONTS.body2,
                        color: COLORS.white,
                        // textAlign:"center",
                        // marginTop:SIZES.base
                    }}
                >التعليمات</Text>
                <View />




            </View>
      <ScrollView contentContainerStyle={{padding: SIZES.padding,}} showsVerticalScrollIndicator={false}>
        {loading ? (
          <>
            <View
              style={{
                justifyContent: 'center',
                // alignContent: 'center',
                // flex: 1/,
                marginTop: 100,
                // alignSelf: 'center',
              }}>
              <ActivityIndicator size={50} color={COLORS.primary} />
            </View>
          </>
        ) : (
          <>
            {instructions.map((item, index) => {
              return (
                <View
                  style={{
                    alignItems: 'center',
                    //   backgroundColor: 'red',
                    borderRadius: RFValue(15),
                    borderWidth: 1,
                    borderColor: COLORS.blue,
                    padding: RFValue(10),
                    marginBottom: RFValue(20),
                  }}>
                  {item?.image && (
                    // <ImageViewer
                    //   style={{
                    //     height: RFValue(150),
                    //     width: '100%',
                    //     marginBottom: RFValue(20),
                    //   }}
                    //   enableImageZoom={true}
                    //   imageUrls={[{url: item?.image}]}
                    // />
                    <TouchableOpacity
                      onPress={() => {
                        setimage_link(item?.image);
                        setmodalimg(true);
                      }}
                      style={{
                        width: '100%',
                      }}>
                      <Image
                        style={{
                          height: RFValue(150),
                          width: '100%',
                          marginBottom: RFValue(20),
                        }}
                        source={{uri: item.image}}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  )}
                  <Text
                    style={{
                      ...FONTS.body4,
                      textAlign: 'justify',
                    }}>
                    {item.title}
                  </Text>
                </View>
              );
            })}
          </>
        )}
      </ScrollView>
      <Modal
        visible={modalimg}
        onRequestClose={() => {
          setmodalimg(false);
        }}>
        <ImageZoom
          cropWidth={Dimensions.get('window').width}
          cropHeight={Dimensions.get('window').height - 100}
          imageWidth={Dimensions.get('window').width}
          imageHeight={Dimensions.get('window').height * 0.7}>
          <Image
            source={{uri: image_link}}
            style={{
              flex: 1,
              // height: '100%',
              // width: '100%',
            }}
            resizeMode="contain"
          />
        </ImageZoom>
        <TouchableOpacity
          onPress={() => {
            setmodalimg(false);
          }}
          style={{
            width: '40%',
            padding: 6,
            backgroundColor: COLORS.primary,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <Text
            style={{
              color: '#fff',
              fontFamily: 'Janna LT Bold',
              fontSize: 20,
            }}>
            اغلاق
          </Text>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({});
export default Instructions;
