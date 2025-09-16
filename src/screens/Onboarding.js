import AnimatedLottieView from 'lottie-react-native';
import React, { useRef } from 'react';
import { View, Text, FlatList, Animated, StatusBar,Dimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch } from 'react-redux';
import { TextButton } from '../components';
import { COLORS, FONTS, images, lotties, SIZES } from '../constants';
import { modifyIsFirst } from '../redux/reducers/UserReducer';
import Auth from '../Services';
import * as Animatable from 'react-native-animatable';
const { width ,height} = Dimensions.get('screen');
const Onboarding = () => {
  const onboarding_screens = [
    {
      id: 1,
      image: images.HikmaLogo,
      title: 'Welcome to CAP Care',
      smalldesc:'Better health. Within reach. Every day',
      description: "",
      anotherDesc: ""

    },
    {
      id: 2,
      image: images.HikmaLogo,
      title: "CAP Care is here to help!",
      smalldesc:'',
      description: "This app is designed to streamline your workflow and provide you with the most up-to-date information to confidently diagnose and manage patients with community-acquired pneumonia.",
      anotherDesc: ""
     
    },
    {
      id: 3,
      image: images.HikmaLogo,
      title: "Here's what you can expect:",
      smalldesc:'',
      description:
      "1-Evidence-Based Recommendations \n 2-Personalized Decision Support \n 3-Quick & Easy Navigation",
      anotherDesc: "Ready to empower your pneumonia care?"

    },
    
    
  ];
  const dispatch = useDispatch();
  const flatListRef = useRef();
  const onViewChangeRef = React.useRef(({ viewableItems, changes }) => {
    setCurrentIndex(viewableItems[0].index);
  });
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const Dots = () => {
    const dotPosition = Animated.divide(scrollX, SIZES.width);
    return (
      <View
        style={{
          flexDirection: 'row-reverse',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {onboarding_screens.map((item, index) => {
          const dotColor = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [
              COLORS.primaryLite,
              COLORS.primary,
              COLORS.primaryLite,
            ],
            extrapolate: 'clamp',
          });
          const dotWidth = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [10, 30, 10],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              key={`Dots-${index}`}
              style={{
                borderRadius: 5,
                marginHorizontal: 5,
                width: dotWidth,
                height: 10,
                backgroundColor: dotColor,
              }}
            />
          );
        })}
      </View>
    );
  };

  return (
    <>
    <StatusBar backgroundColor={COLORS.primaryLite} />
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.primaryLite,
        }}>
        <Animated.FlatList
          ref={flatListRef}
          horizontal
          pagingEnabled
          data={onboarding_screens}
          scrollEventThrottle={16}
          snapToAlignment="center"
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => `${item.id}`}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
            },
          )}
          onViewableItemsChanged={onViewChangeRef.current}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  width: SIZES.width,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Animatable.Image
                  animation="pulse" easing="ease-out" iterationCount="infinite" duration={1500}
                  // animation="slideInDown" iterationCount={5} direction="alternate"
                  source={item.image}
                  style={{
                    width: RFValue(250),
                    height: RFValue(250),
                  }}

                  resizeMode="contain"
                />
              </View>
            );
          }}
        />
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
          marginTop: RFValue(-20),
          borderTopLeftRadius: SIZES.radius * 3,
          borderTopRightRadius: SIZES.radius * 3,
          ...COLORS.shadow,
          padding: SIZES.padding * 1.5,
        }}>
        <View
          style={{
            // flex: 1,
            justifyContent: 'center',
            // backgroundColor:"#0f0"
          }}>
          <Dots />
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor:"#00f",
            marginTop: RFValue(30),
          }}>
    
    <View 
    style={{
      // backgroundColor:"#0f0",
      
      // marginTop: RFValue(-140),
    }}
    >
          <Text style={{ fontSize:18,fontWeight:'bold', color: COLORS.primarydarkBule, textAlign: 'center' }}>
            {onboarding_screens[currentIndex].title}
          </Text>
    </View>
     
     <View >
          <Text style={{ ...FONTS.h4, color: COLORS.primary, textAlign: 'center' }}>
            {onboarding_screens[currentIndex].smalldesc}
          </Text>
          </View>

        <View
        style={{ 
          backgroundColor:onboarding_screens[currentIndex].description === ''?COLORS.white:COLORS.primaryLite,
      // marginTop: RFValue(10),
      // borderRadius:20,
      padding:5,
      borderWidth:onboarding_screens[currentIndex].description === ''? 0: 1,
      borderColor:COLORS.primarydarkBule,
      paddingHorizontal:10,
      alignItems:'center'
        }}
        >
          <Text style={{ ...FONTS.h4, color: COLORS.primarydarkBule, textAlign: 'center',lineHeight:25 }}>
            {onboarding_screens[currentIndex].description}
          </Text>
          </View>

    

        </View>

        <View
        style={{ 
      // marginBottom: RFValue(20),
      alignItems:'center'
        }}
        >
          <Text style={{ ...FONTS.h3, color: COLORS.primarydarkBule, textAlign: 'center' }}>
            {onboarding_screens[currentIndex].anotherDesc}
          </Text>
          </View>

        {currentIndex < onboarding_screens.length - 1 && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              // paddingHorizontal: SIZES.padding,
              // marginVertical: SIZES.padding,
            }}>
            <TextButton
              label="Skip"
              buttonContainerStyle={{
                backgroundColor: COLORS.lightGray3,
                height: RFValue(45),
                width: RFValue(125),
                borderRadius: SIZES.base,
              }}
              labelStyle={{
                color: COLORS.darkGray,
                ...FONTS.h3,
              }}
              onPress={async () => {
                dispatch(modifyIsFirst(false));
                await Auth.setFirst('1');
              }}
            />
            <TextButton
              label={'Next'}
              labelStyle={{
                color: COLORS.white,
                ...FONTS.h3,
              }}
              buttonContainerStyle={{
                backgroundColor: COLORS.primary,
                height: RFValue(45),
                width: RFValue(125),
                borderRadius: SIZES.base,
              }}
              onPress={() => {
                flatListRef?.current?.scrollToIndex({
                  index: currentIndex + 1,
                  animated: true,
                });
              }}
              
            />
          </View>
        )}

        {currentIndex == 2 && (
          <View
            style={{
              paddingHorizontal: SIZES.padding,
              marginVertical: SIZES.padding,
            }}>
            <TextButton
              label="Start"
              labelStyle={{
                ...FONTS.h3,
                color: COLORS.white,
              }}
              buttonContainerStyle={{
                height: 60,
                borderRadius: SIZES.base,
              }}
              onPress={async () => {
                dispatch(modifyIsFirst(false));
                await Auth.setFirst('1');
              }}
            />
          </View>
        )}
      </View>
    </View>
    </>
  );
};

export default Onboarding;


