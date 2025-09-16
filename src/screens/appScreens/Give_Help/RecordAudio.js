import React, { Component, useEffect } from 'react';
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
    PermissionsAndroid
} from 'react-native';
// import {COLORS, FONTS, SIZES} from '../../../constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useState } from 'react';
import axios from 'axios';
import { COLORS, FONTS, icons, images, SIZES, lotties } from '../../../constants';
import FastImage from 'react-native-fast-image';
import { TextButton } from '../../../components';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { useDispatch, useSelector } from 'react-redux';
import { setAudio } from '../../../redux/reducers/UserReducer';
import RNFetchBlob from 'rn-fetch-blob';
import utils from '../../../utils';
const audioRecorderPlayer = new AudioRecorderPlayer();

const RecordAudio = ({ navigation,route }) => {
    const dispatch = useDispatch()
    const { audio_rec } = useSelector(s => s.UserReducer);
    const {type}=route.params
    const [recordSecs, setRecordSecs] = useState(0);
    const [recoredTime, setRecordTime] = useState(0);
    const [CurrentPositionSec, serCurrentPositionSec] = useState(0);
    const [CurrentDurationSec, serCurrentDurationSec] = useState(0);
    const [PlayTime, setPlayTime] = useState(0);
    const [Duration, setDuration] = useState(0);
    const [showTime, setShowTime] = useState("00:00:00");
    const [showPlay, setShowPlay] = useState(false);
    const [audio_to_play, setAudio_to_play] = useState("")




    const [modalimg, setmodalimg] = useState(false);
    const [image_link, setimage_link] = useState('');

    const [loading, setloading] = useState(false);


    useEffect(() => {


        if (Object.keys(audio_rec).length > 0) {
            setShowPlay(true)
            setAudio_to_play(audio_rec.uri)
            setShowTime(audio_rec.duration)


        }


    }, []);



    
    // async function _updateAudio() {
       
    //     const filePath =audio_rec.uri;
    //     console.log(filePath)
    //     await RNFetchBlob.fs.readFile(filePath, 'base64').then(async data => {
    //       let dataForm = new FormData();
          
    //       dataForm.append('file_attachment', data);
    //       console.log(dataForm)

    //       axios.post('https://camp-coding.online/zifta_work/pioneer_version/upload_file.php',dataForm,{
            
    //             headers: {
    //                 'Content-Type': 'multipart/form-data',
    //                 otherHeader: 'foo',
    //               },
            
    //       }).then(res=>{
    //         if(res.data.includes("https")){
    //         let obj = {
    //             uri: res.data,
    //             duration: recoredTime
    //         }
    //         dispatch(setAudio(obj))
    //     }else{
    //         utils.toastAlert("error","حدث خطأ اثناء حفظ الصوت")
    //     }
    //       })
    
   
    //     });
    //   }

    async function play() {
        if (Platform.OS === 'android') {
            try {
                const grants = await PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                ]);

                console.log('write external stroage', grants);

                if (
                    grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
                    PermissionsAndroid.RESULTS.GRANTED &&
                    grants['android.permission.READ_EXTERNAL_STORAGE'] ===
                    PermissionsAndroid.RESULTS.GRANTED &&
                    grants['android.permission.RECORD_AUDIO'] ===
                    PermissionsAndroid.RESULTS.GRANTED
                ) {

                    onStartRecord()

                } else {
                    console.log('All required permissions not granted');
                    return;
                }
            } catch (err) {
                console.warn(err);
                return;
            }
        }
    }


    const onStartRecord = async () => {
        setShowPlay(false)
        const result = await audioRecorderPlayer.startRecorder();
        audioRecorderPlayer.addRecordBackListener((e) => {
            console.log(e)
            setRecordSecs(e.currentPosition)
            setRecordTime(audioRecorderPlayer.mmssss(
                Math.floor(e.currentPosition)))
            setShowTime(audioRecorderPlayer.mmssss(
                Math.floor(e.currentPosition)))
            //   this.setState({
            //     recordSecs: e.currentPosition,
            //     recordTime: this.audioRecorderPlayer.mmssss(
            //       Math.floor(e.currentPosition),
            //     ),
            //   });
            return;
        });
        // console.log(result);
    };

    const onStopRecord = async () => {
        const result = await audioRecorderPlayer.stopRecorder();
        audioRecorderPlayer.removeRecordBackListener();
        // this.setState({
        //     recordSecs: 0,
        // });
        setShowTime("00:00:00")
        setShowPlay(true)
        setRecordSecs(0)
        let obj = {
            uri: result,
            duration: recoredTime
        }
        dispatch(setAudio(obj))

        // console.log(result);
    };

    const onStartPlay = async () => {
        // console.log('onStartPlay');

        let msg;
        if (audio_to_play !== "") {
            msg = await audioRecorderPlayer.startPlayer(audio_to_play);
        }else{
            msg = await audioRecorderPlayer.startPlayer();
        }
        // console.log(msg);
        audioRecorderPlayer.addPlayBackListener((e) => {
            serCurrentPositionSec(e.currentPosition)
            serCurrentDurationSec(e.duration)
            setPlayTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)))
            setDuration(audioRecorderPlayer.mmssss(Math.floor(e.duration)))
            setShowTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)))
            //   this.setState({
            //     currentPositionSec: e.currentPosition,
            //     currentDurationSec: e.duration,
            //     playTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
            //     duration: audioRecorderPlayer.mmssss(Math.floor(e.duration)),
            //   });
            return;
        });
    };

    const onPausePlay = async () => {
        await audioRecorderPlayer.pausePlayer();
    };

    const onStopPlay = async () => {
        console.log('onStopPlay');
        setShowTime("00:00:00")
       
        if(audio_to_play!==""){
        audioRecorderPlayer.stopPlayer(audio_to_play);
        setAudio_to_play("")
        }else{
            audioRecorderPlayer.stopPlayer();
        }
        audioRecorderPlayer.removePlayBackListener();
    };


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
                >تسجيل صوت</Text>
                <View />




            </View>
            <ScrollView contentContainerStyle={{ padding: SIZES.padding, }} showsVerticalScrollIndicator={false}>
                <Text
                    style={{
                        ...FONTS.body2,
                        color: COLORS.black,
                        textAlign: "center", marginBottom: SIZES.margin
                    }}
                >
                    {showTime}
                </Text>
                {type=="recording"&&<>
                <TextButton
                    label={'تسجيل'}
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
                        play()
                    }}
                />
                <TextButton
                    label={'ايقاف التسجيل'}
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
                        onStopRecord()
                    }}
                />
                </>}
                {(showPlay||type=="")&&<>
                <TextButton
                    label={'تشغيل الصوت'}
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
                        onStartPlay()
                    }}
                />
                <TextButton
                    label={'استئناف الصوت'}
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
                        onPausePlay()
                    }}
                />
                <TextButton
                    label={'ايقاف الصوت'}
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
                    onPress={async () => {
                        onStopPlay()

                       
                    }}
                />
                {type=="recording"&&
                 <TextButton
                    label={'حفظ'}
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
                    onPress={async () => {
                        navigation.goBack()
                        // _updateAudio()

                       
                    }}
                />
            }
                </>}
            </ScrollView>

        </View>
    );
};
const styles = StyleSheet.create({});
export default RecordAudio;
