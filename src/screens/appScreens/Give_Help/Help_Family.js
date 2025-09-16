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
    ActivityIndicator
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
import { ScrollView, TextInput } from 'react-native-gesture-handler';
const CARD_HEIGHT = 220;
const CARD_WIDTH = SIZES.width * 0.8;
const SPACING_FOR_CARD_INSET = SIZES.width * 0.1 - 10;
if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}
const Help_Family = ({ navigation,route }) => {


    const dispatch = useDispatch();
    const { userData } = useSelector(s => s.UserReducer);
    const { task_id } = route.params;
    
    const [finisedTasks, setFinisedTasksTasks] = useState([])
    const [notFinisedTasks, setNotFinisedTasksTasks] = useState([])
    const [searchText, setSearchText] = useState("")
    const [status, setStatus] = useState("NotDone")
    const [loading, setloading] = useState(true);

    function get_not_finish_tasks() {

        let data_send = {

            "task_id": task_id
        }
        axios.post("https://camp-coding.online/zifta_work/pioneer_version/select_family_not_finished_task.php", data_send).then((res) => {
            if (res.status == 200) {
                if (res.data.status == "success") {
                    setNotFinisedTasksTasks(res.data.message)

                    setloading(false)

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
    function get_finish_tasks() {

        let data_send = {

            "task_id": task_id
        }
        axios.post("https://camp-coding.online/zifta_work/pioneer_version/select_family_finished_task.php", data_send).then((res) => {
            if (res.status == 200) {
                if (res.data.status == "success") {
                    console.log(res.data.message)
                    setFinisedTasksTasks(res.data.message)

                    setloading(false)

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

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            get_not_finish_tasks()
            get_finish_tasks()
          });
      
          return unsubscribe;
        }, [navigation]);
   










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
                >الأسر</Text>
                <View />




            </View>

            <View style={{
                flexDirection: "row",
                justifyContent: "space-around",
                paddingHorizontal: SIZES.base,
                marginBottom: SIZES.margin
            }}>
                <TouchableOpacity
                    onPress={() => {
                        setStatus("Done")
                    }}
                    style={{
                        width: "45%",
                        height: RFValue(50),
                        backgroundColor: status == "NotDone" ? COLORS.gray3 : COLORS.primary,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: SIZES.radius

                    }}>
                    <Text
                        style={{
                            ...FONTS.body4,
                            color: status == "NotDone" ? COLORS.black : COLORS.white,
                            // textAlign:"center",
                            // marginTop:SIZES.base
                        }}
                    >تم التسليم</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setStatus("NotDone")
                    }}
                    style={{
                        width: "45%",
                        height: RFValue(50),
                        backgroundColor: status == "NotDone" ? COLORS.primary : COLORS.gray3,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: SIZES.radius

                    }}>
                    <Text
                        style={{
                            ...FONTS.body4,
                            color: status == "NotDone" ? COLORS.white : COLORS.black,
                            // textAlign:"center",
                            // marginTop:SIZES.base
                        }}
                    >لم يتم التسليم</Text>
                </TouchableOpacity>

            </View>


            <TextInput
                style={{
                    width: "90%",
                    height: RFValue(50),
                    backgroundColor: COLORS.gray3,
                    borderRadius: SIZES.radius,
                    alignSelf: "center",
                    marginBottom: SIZES.margin,
                    color: COLORS.black,
                    paddingHorizontal: SIZES.base


                }}
                textAlign='center'
                placeholderTextColor={COLORS.black}

                placeholder='بحث عن أسرة'
                onChangeText={(text) => {
                    setSearchText(text)
                }}
            />
            {/* <ScrollView> */}
            {/* <ScrollView> */}
            {loading ? (


                <>
                    <View style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center"
                    }} >
                        <LottieView
                            source={icons.loading}
                            autoPlay
                            loop
                            style={{ height: 180, width: '100%' }}
                            resizeMode="contain"
                        />

                    </View>

                </>
            ) :

                <FlatList
                    data={status == "Done" ? finisedTasks : notFinisedTasks}
                    ListEmptyComponent={<>
                        <View style={{
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "center"
                        }} >
                            <LottieView
                                source={icons.empty}
                                autoPlay
                                loop
                                style={{ height: 180, width: '100%' }}
                                resizeMode="contain"
                            />


                            <Text
                                style={{
                                    ...FONTS.body3,
                                    textAlign: "center",
                                    marginTop: SIZES.margin * 2
                                }}
                            >لا يوجد أسر</Text>
                        </View>
                    </>}
                    renderItem={({ item, index }) => {
                        return (
                            item?.family_data?.father_name.toLowerCase().includes(searchText.toLowerCase())&&
                            <View style={{
                                paddingHorizontal: SIZES.base
                            }}>

                                <TouchableOpacity
                                    activeOpacity={.8}
                                    onPress={() => {
                                        // item.finished==0?
                                        navigation.navigate("Finish_task",{
                                            psData:item
                                        })
                                        // :utils.toastAlert("success","تم التسليم")

                                    }}
                                >
                                    <Animatable.View
                                        useNativeDriver
                                        delay={50 * index}
                                        animation={'fadeInRight'}
                                        style={{
                                            width: "100%",
                                            height: RFValue(100),
                                            flexDirection: "row",
                                            borderRadius: SIZES.radius,

                                            backgroundColor: COLORS.white,
                                            // padding: SIZES.base,
                                            // elevation: RFValue(5),
                                            // alignItems:"center",
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
                                                width: "80%",
                                                height: "100%",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                backgroundColor: COLORS.gray3,
                                                paddingVertical: SIZES.base,
                                                borderTopLeftRadius: SIZES.radius,
                                                borderBottomLeftRadius: SIZES.radius,

                                            }}
                                        >

                                            <Text
                                                style={{
                                                    ...FONTS.body3,
                                                    color: COLORS.black,
                                                    // textAlign:"center",
                                                    // marginTop:SIZES.base
                                                }}
                                            >
                                                {item?.family_data?.father_name}
                                            </Text>




                                        </View>
                                        <View
                                            style={{
                                                width: "20%",

                                                backgroundColor: COLORS.primary,
                                                borderBottomRightRadius: SIZES.radius,
                                                borderTopRightRadius: SIZES.radius,
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                        >
                                            <FastImage
                                                source={images.big_family2}
                                                style={{
                                                    width: RFValue(50),
                                                    height: RFValue(50),
                                                    // alignSelf:"center"
                                                }}
                                                resizeMode='contain'
                                            // tintColor={COLORS.white}
                                            />
                                        </View>

                                    </Animatable.View>

                                </TouchableOpacity>



                            </View>
                        )
                    }}
                />
            }


            {/* </ScrollView> */}







        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },


});
export default Help_Family;
