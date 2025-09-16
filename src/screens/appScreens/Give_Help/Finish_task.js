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
    PermissionsAndroid,
    Dimensions
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import FastImage from 'react-native-fast-image';
import axios from 'axios';
// import LottieView from 'lottie-react-native';
import { useDispatch, useSelector } from 'react-redux';

import { COLORS, FONTS, icons, images, SIZES, lotties } from '../../../constants';

import { CheckBox, FormInput, TextButton, AlertModal } from '../../../components';
import utils from '../../../utils';
import * as Animatable from 'react-native-animatable';
import { ScrollView } from 'react-native-gesture-handler';
import AnimatedLottieView from 'lottie-react-native';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob'
import SignatureScreen from "react-native-signature-canvas";
import ReactNativeBiometrics from 'react-native-biometrics'
import { setAudio, setLoc } from '../../../redux/reducers/UserReducer';
import Geolocation from 'react-native-geolocation-service';
let epochTimeSeconds = Math.round((new Date()).getTime() / 1000).toString()
let payload = epochTimeSeconds + 'some message'
import ImageZoom from 'react-native-image-pan-zoom';
const Finish_task = ({ navigation, route }) => {


    const dispatch = useDispatch();
    const { userData, location, audio_rec } = useSelector(s => s.UserReducer);
    const { psData } = route.params;
    const [tasks, setTasks] = useState([])

    const [signModal, setSignModal] = useState(false);
    const [signImgLink, setSignImgLink] = useState("");
    const [submitMethodModel, setSubmitMethodModel] = useState(false);
    const [SubmitDoneModal, setSubmitDoneModal] = useState(false);
    const [signError, setSignError] = useState(false);
    const [Loading, setLoading] = useState(false);
    const [fininhLoading, setFininhLoading] = useState(false);
    const [image_path, setimage_path] = React.useState('')
    const [nid_image, setNid_image] = React.useState(false)
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [nid, setNid] = useState('');
    const [Image_zoom, setImage_zoom] = useState(null);

    async function _updateAudio() {
        setFininhLoading(true)
        const filePath = audio_rec.uri;
        // console.log(filePath)
        await RNFetchBlob.fs.readFile(filePath, 'base64').then(async data => {
            let dataForm = new FormData();

            dataForm.append('file_attachment', data);
            // console.log(dataForm)

            axios.post('https://camp-coding.online/zifta_work/pioneer_version/upload_file.php', dataForm, {

                headers: {
                    'Content-Type': 'multipart/form-data',
                    otherHeader: 'foo',
                },

            }).then(res => {
                if (res.data.includes("https")) {
                    finish_tasks(res.data)
                } else {
                    utils.toastAlert("error", "حدث خطأ اثناء رفع الصوت برجاء المحاولة مرة اخري")
                }
            })


        });
    }
    useEffect(() => {
        dispatch(setAudio({}))
        // requestLocationPermission()
    }, [])

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
                    `https://camp-coding.online/zifta_work/pioneer_version/image_uplouder.php`,
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

                        // console.log(resx)




                        getOCRData(resx)
                        // } else {
                        //     setimage_path(resx)
                        //     setNid_image(false)
                        // }


                    })        // 
                // console.log(source)


            }
        });
    };
    async function requestLocationPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    'title': 'Example App',
                    'message': 'Example App access to your location '
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                Geolocation.getCurrentPosition(
                    (position) => {
                        // console.log(position);
                        dispatch(setLoc(position?.coords))
                    },
                    (error) => {
                        // See error code charts below.
                        console.log(error.code, error.message);
                    },
                    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
                );
            }
        } catch (err) {
            console.warn(err)
        }
    }

    const upload_img = (img) => {

        setLoading(true)
        // console.log("erer")
        RNFetchBlob.fetch(
            'POST',
            `https://camp-coding.online/zifta_work/pioneer_version/image_uplouder.php`,
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
                if (resx.includes("https")) {
                    utils.toastAlert("success", "تم رفع التوقيع بنجاح")
                    setSignImgLink(resx)
                    setSignModal(false)
                } else {
                    utils.toastAlert('error', "حدث خطأ برجاء المحاولة مرة اخري")
                }
                // console.log(resx)



            })
    }



    getOCRData = (link) => {
        // console.log(link)
        axios.post("https://testzefta22.cognitiveservices.azure.com/computervision/imageanalysis:analyze?api-version=2023-02-01-preview&features=read&language=ar&gender-neutral-caption=False", {
            url: link,
        },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Ocp-Apim-Subscription-Key': 'd473c9121469447aad76ac25bf330bb9'
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




    function finish_tasks(aud_data) {
        setFininhLoading(true)
        let data_send = {


            "name": name,
            "nat_id": nid.split(" ").reverse().join("").replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d))
            // 
            // nid.replace(/[\u0660-\u0669\u06f0-\u06f9]/g, function (c) {
            //     return c.charCodeAt(0) & 0xf;
            // }).replace(/ /g, '').split("").reverse().join("")
            ,
            "address": address,
            "image_nat_id": image_path,
            "image_signature": signImgLink,
            "assign_id": psData.assign_id,
            "task_id": psData.task_id,
            "lat": location.latitude,
            "long": location.longitude,
            aduio: aud_data

        }
        console.log(data_send)
        axios.post("https://camp-coding.online/zifta_work/pioneer_version/finish_task.php", data_send).then((res) => {
            console.log(res.data)
            if (res.status == 200) {
                if (res.data.status == "success") {
                    utils.toastAlert("success", "تم تسليم التاسك بنجاح")
                    dispatch(setAudio(null))
                    navigation.goBack()
                    setFininhLoading(false)

                }
                else {
                    utils.toastAlert("error", res.data.message)
                    setFininhLoading(false)
                }

            } else {
                utils.toastAlert("error", "حدث خطأ ما برجاء المحاولة لاحقا")
                setFininhLoading(false)
            }
        })
    }

    // useEffect(() => {
    //     // get_tasks()
    // }, [])


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


    function _pressHandler() {
        // checkBiometricSupportednEnrolled()
        const rnBiometrics = new ReactNativeBiometrics()

        rnBiometrics.createKeys()
            .then((resultObject) => {
                const { publicKey } = resultObject
                console.log(publicKey)
                // sendPublicKeyToServer(publicKey)
            })
    }
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.white,
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
                >بيانات الأسرة</Text>
                <View />




            </View>
            <ScrollView contentContainerStyle={{
                paddingHorizontal: SIZES.base, paddingVertical: SIZES.margin
            }}>
                <Animatable.View
                    useNativeDriver
                    delay={50 * 0}
                    animation={'fadeInUp'}
                    style={{
                        width: "100%",
                        flexDirection: "row",
                        borderRadius: SIZES.radius,

                        backgroundColor: COLORS.white,
                        // padding: SIZES.base,
                        // elevation: RFValue(5),
                        marginBottom: SIZES.margin,

                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: SIZES.radius,
                        // marginHorizontal: 4,
                        elevation: 5,
                        // borderRadius: RFValue(20),
                    }}>

                    <View
                        style={{
                            width: "2%",

                            backgroundColor: COLORS.primary,
                            borderBottomLeftRadius: SIZES.radius,
                            borderTopLeftRadius: SIZES.radius
                        }}
                    ></View>
                    <View
                        style={{
                            width: "75%",
                            justifyContent: "space-around",
                            paddingVertical: SIZES.base
                        }}
                    >
                        <Text style={{
                            ...FONTS.body3,
                            fontFamily: FONTS.fontFamily,
                            color: COLORS.black,
                            marginBottom: SIZES.margin
                        }}>
                            اسم الزوج
                        </Text>

                        <Text
                            style={{
                                ...FONTS.body3,
                                fontFamily: FONTS.fontFamily,
                                color: COLORS.gray,
                                textAlign: "right"
                            }}
                        >
                            {psData?.family_data?.father_name}
                        </Text>

                    </View>

                    <View style={{ alignItems: "center", justifyContent: "center", width: "23%", }}>
                        <FastImage source={icons.profile} style={{ width: RFValue(50), height: RFValue(50) }} />

                    </View>

                    {/* </View> */}
                </Animatable.View>
                <Animatable.View
                    useNativeDriver
                    delay={50 * 1}
                    animation={'fadeInUp'}
                    style={{
                        width: "100%",
                        flexDirection: "row",
                        borderRadius: SIZES.radius,

                        backgroundColor: COLORS.white,
                        // padding: SIZES.base,
                        // elevation: RFValue(5),
                        marginBottom: SIZES.margin,

                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: SIZES.radius,
                        // marginHorizontal: 4,
                        elevation: 5,
                        // borderRadius: RFValue(20),
                    }}>

                    <View
                        style={{
                            width: "2%",

                            backgroundColor: COLORS.primary,
                            borderBottomLeftRadius: SIZES.radius,
                            borderTopLeftRadius: SIZES.radius
                        }}
                    ></View>
                    <View
                        style={{
                            width: "75%",
                            justifyContent: "space-around",
                            paddingVertical: SIZES.base
                        }}
                    >
                        <Text style={{
                            ...FONTS.body3,
                            fontFamily: FONTS.fontFamily,
                            color: COLORS.black,
                            marginBottom: SIZES.margin
                        }}>
                            الرقم القومي للزوج
                        </Text>

                        <Text
                            style={{
                                ...FONTS.body3,
                                fontFamily: FONTS.fontFamily,
                                color: COLORS.gray,
                                textAlign: "right"
                            }}
                        >
                            {psData?.family_data?.father_nat_id}
                        </Text>

                    </View>

                    <View style={{ alignItems: "center", justifyContent: "center", width: "23%", }}>
                        <FastImage source={icons.nationalid} style={{ width: RFValue(50), height: RFValue(50) }} />

                    </View>

                    {/* </View> */}
                </Animatable.View>
                <Animatable.View
                    useNativeDriver
                    delay={50 * 2}
                    animation={'fadeInUp'}
                    style={{
                        width: "100%",
                        flexDirection: "row",
                        borderRadius: SIZES.radius,

                        backgroundColor: COLORS.white,
                        // padding: SIZES.base,
                        // elevation: RFValue(5),
                        marginBottom: SIZES.margin,

                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: SIZES.radius,
                        // marginHorizontal: 4,
                        elevation: 5,
                        // borderRadius: RFValue(20),
                    }}>

                    <View
                        style={{
                            width: "2%",

                            backgroundColor: COLORS.primary,
                            borderBottomLeftRadius: SIZES.radius,
                            borderTopLeftRadius: SIZES.radius
                        }}
                    ></View>
                    <View
                        style={{
                            width: "75%",
                            justifyContent: "space-around",
                            paddingVertical: SIZES.base
                        }}
                    >
                        <Text style={{
                            ...FONTS.body3,
                            fontFamily: FONTS.fontFamily,
                            color: COLORS.black,
                            marginBottom: SIZES.margin
                        }}>
                            اسم الزوجة
                        </Text>

                        <Text
                            style={{
                                ...FONTS.body3,
                                fontFamily: FONTS.fontFamily,
                                color: COLORS.gray,
                                textAlign: "right"
                            }}
                        >
                            {psData?.family_data?.mother_name}
                        </Text>

                    </View>

                    <View style={{ alignItems: "center", justifyContent: "center", width: "23%", }}>
                        <FastImage source={icons.profile2} style={{ width: RFValue(50), height: RFValue(50) }} />

                    </View>

                    {/* </View> */}
                </Animatable.View>
                <Animatable.View
                    useNativeDriver
                    delay={50 * 3}
                    animation={'fadeInUp'}
                    style={{
                        width: "100%",
                        flexDirection: "row",
                        borderRadius: SIZES.radius,

                        backgroundColor: COLORS.white,
                        // padding: SIZES.base,
                        // elevation: RFValue(5),
                        marginBottom: SIZES.margin,

                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: SIZES.radius,
                        // marginHorizontal: 4,
                        elevation: 5,
                        // borderRadius: RFValue(20),
                    }}>

                    <View
                        style={{
                            width: "2%",

                            backgroundColor: COLORS.primary,
                            borderBottomLeftRadius: SIZES.radius,
                            borderTopLeftRadius: SIZES.radius
                        }}
                    ></View>
                    <View
                        style={{
                            width: "75%",
                            justifyContent: "space-around",
                            paddingVertical: SIZES.base
                        }}
                    >
                        <Text style={{
                            ...FONTS.body3,
                            fontFamily: FONTS.fontFamily,
                            color: COLORS.black,
                            marginBottom: SIZES.margin
                        }}>
                            الرقم القومي للزوجة
                        </Text>

                        <Text
                            style={{
                                ...FONTS.body3,
                                fontFamily: FONTS.fontFamily,
                                color: COLORS.gray,
                                textAlign: "right"
                            }}
                        >
                            {psData?.family_data?.mother_nat_id}
                        </Text>

                    </View>

                    <View style={{ alignItems: "center", justifyContent: "center", width: "23%", }}>
                        <FastImage source={icons.nationalid} style={{ width: RFValue(50), height: RFValue(50) }} />

                    </View>

                    {/* </View> */}
                </Animatable.View>

                <Animatable.View
                    useNativeDriver
                    delay={50 * 4}
                    animation={'fadeInUp'}
                    style={{
                        width: "100%",
                        flexDirection: "row",
                        borderRadius: SIZES.radius,

                        backgroundColor: COLORS.white,
                        // padding: SIZES.base,
                        // elevation: RFValue(5),
                        marginBottom: SIZES.margin,

                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: SIZES.radius,
                        // marginHorizontal: 4,
                        elevation: 5,
                        // borderRadius: RFValue(20),
                    }}>

                    <View
                        style={{
                            width: "2%",

                            backgroundColor: COLORS.primary,
                            borderBottomLeftRadius: SIZES.radius,
                            borderTopLeftRadius: SIZES.radius
                        }}
                    ></View>
                    <View
                        style={{
                            width: "75%",
                            justifyContent: "space-around",
                            paddingVertical: SIZES.base
                        }}
                    >
                        <Text style={{
                            ...FONTS.body3,
                            fontFamily: FONTS.fontFamily,
                            color: COLORS.black,
                            marginBottom: SIZES.margin
                        }}>
                            عدد افراد الأسرة
                        </Text>

                        <Text
                            style={{
                                ...FONTS.body3,
                                fontFamily: FONTS.fontFamily,
                                color: COLORS.gray,
                                textAlign: "right"
                            }}
                        >
                            {psData?.family_data?.num_chield}
                        </Text>

                    </View>

                    <View style={{ alignItems: "center", justifyContent: "center", width: "23%", }}>
                        <FastImage source={icons.childs} style={{ width: RFValue(50), height: RFValue(50) }} />

                    </View>

                    {/* </View> */}
                </Animatable.View>


                {psData.finished == 1 && <>

                    <Animatable.View
                        useNativeDriver
                        delay={50 * 5}
                        animation={'fadeInUp'}
                        style={{
                            width: "100%"
                        }}>
                        {psData?.complate_family_task?.image_nat_id &&
                            <>
                                <Text
                                    style={{
                                        ...FONTS.body3,
                                        fontFamily: FONTS.fontFamily,
                                        color: COLORS.black,
                                        textAlign: "right",
                                        marginBottom: SIZES.margin
                                    }}
                                >
                                    صورة بطاقة المستلم :
                                </Text>
                                <TouchableOpacity
                                    style={{ marginBottom: SIZES.margin, borderWidth: 0.5, borderColor: COLORS.primary, padding: RFValue(10), borderRadius: RFValue(15) }}
                                    onPress={() => {
                                        setImage_zoom(psData?.complate_family_task?.image_nat_id)
                                    }}>
                                    <FastImage
                                        style={{
                                            width: "100%",
                                            height: RFValue(200)
                                        }}
                                        source={{ uri: psData?.complate_family_task?.image_nat_id }}
                                        resizeMode='contain'
                                    />
                                </TouchableOpacity>
                            </>
                        }

                        {psData?.complate_family_task?.image_signature &&
                            <><Text
                                style={{
                                    ...FONTS.body3,
                                    fontFamily: FONTS.fontFamily,
                                    color: COLORS.black,
                                    textAlign: "right",
                                    marginBottom: SIZES.margin
                                }}
                            >
                                صورة توقيع المستلم :
                            </Text>
                                <TouchableOpacity
                                    style={{ marginBottom: SIZES.margin, borderWidth: 0.5, borderColor: COLORS.primary, padding: RFValue(10), borderRadius: RFValue(15) }}
                                    onPress={() => {
                                        setImage_zoom(psData?.complate_family_task?.image_signature)
                                    }}>
                                    <FastImage
                                        style={{
                                            width: "100%",
                                            height: RFValue(200)
                                        }}
                                        source={{ uri: psData?.complate_family_task?.image_signature }}
                                        resizeMode='contain'
                                    />
                                </TouchableOpacity>
                            </>
                        }

                        {psData?.complate_family_task?.aduio &&
                            <><Text
                                style={{
                                    ...FONTS.body3,
                                    fontFamily: FONTS.fontFamily,
                                    color: COLORS.black,
                                    textAlign: "right",
                                    marginBottom: SIZES.margin
                                }}
                            >
                                صوت  المستلم :
                            </Text>
                                <TextButton
                                    label={'صوت المستلم'}
                                    buttonContainerStyle={{
                                        height: RFValue(55),
                                        borderRadius: SIZES.radius,
                                        backgroundColor:  COLORS.primary,
                                        marginTop: RFValue(20),
                                    }}
                                    // loading={loading}
                                    labelStyle={{
                                        ...FONTS.h3,
                                        color: COLORS.white,
                                    }}
                                    onPress={() => {
                                        let obj = {
                                            uri:psData?.complate_family_task?.aduio ,
                                            duration: "00:00:00"
                                        }
                                        dispatch(setAudio(obj))
                                        navigation.navigate("RecordAudio",{type:""})
                                    }}
                                />
                            </>
                        }


                    </Animatable.View>


                </>}


                {psData.finished == 0 &&
                    <>
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
                                    {'صورة البطاقة المستلم'}
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

                        <TextButton
                            label={'توقيع المستلم'}
                            buttonContainerStyle={{
                                height: RFValue(55),
                                borderRadius: SIZES.radius,
                                backgroundColor: signImgLink == "" ? COLORS.primary : COLORS.green,
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
                            label={'صوت المستلم'}
                            buttonContainerStyle={{
                                height: RFValue(55),
                                borderRadius: SIZES.radius,
                                backgroundColor: Object.keys(audio_rec).length > 0 ? COLORS.green : COLORS.primary,
                                marginTop: RFValue(20),
                            }}
                            // loading={loading}
                            labelStyle={{
                                ...FONTS.h3,
                                color: COLORS.white,
                            }}
                            onPress={() => {
                                navigation.navigate("RecordAudio",{type:"recording"})
                            }}
                        />

                        <TextButton
                            label={'التأكيد'}
                            buttonContainerStyle={{
                                height: RFValue(55),
                                borderRadius: SIZES.radius,
                                backgroundColor: COLORS.primary,
                                marginTop: RFValue(20),
                            }}
                            loading={fininhLoading}
                            labelStyle={{
                                ...FONTS.h3,
                                color: COLORS.white,
                            }}
                            onPress={() => {
                                
                                if (image_path != "" && (signImgLink != "" || Object.keys(audio_rec).length != 0)) {
                                    if (Object.keys(audio_rec).length > 0)
                                        _updateAudio()
                                    else
                                        finish_tasks(null)
                                } else
                                    utils.toastAlert("error", "يجب رفع جميع البيانات")
                            }}
                        />
                    </>
                }




            </ScrollView>
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

            <Modal
                visible={Image_zoom !== null}
                transparent
                onRequestClose={() => {
                    setImage_zoom(null);
                }}>
                <View
                    style={{
                        flex: 1,
                        backgroundColor: 'rgba(0,0,0,0.9)',
                    }}>
                    <Text
                        style={{
                            ...FONTS.body3,
                            color: COLORS.gray3,
                            textAlign: 'center',
                            margin: SIZES.margin,
                        }}>
                        Swipe down to close
                    </Text>

                    <ImageZoom
                        cropWidth={Dimensions.get('window').width}
                        cropHeight={Dimensions.get('window').height}
                        imageWidth={200}
                        imageHeight={200}
                        enableSwipeDown={true}
                        onSwipeDown={() => {
                            // console.log("hh")
                            setImage_zoom(null);
                        }}>
                        <Image
                            source={{ uri: Image_zoom }}
                            style={{
                                width: '100%',
                                height: 150,
                                marginBottom: SIZES.margin,
                                backgroundColor: COLORS.white
                            }}
                            resizeMode="contain"
                        />
                    </ImageZoom>
                </View>
            </Modal>







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

});
export default Finish_task;
