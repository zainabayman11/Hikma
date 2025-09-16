
import React, { useState,useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  ScrollView,
  Platform,
  UIManager,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // استيراد مكتبة الأيقونات
import { RFValue } from 'react-native-responsive-fontsize';
import { COLORS, FONTS, SIZES } from '../../../constants';
import { useFocusEffect } from '@react-navigation/native';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ThirdOption = ({ navigation }) => {

  const buttons = [
    { id: 1, title: 'Chronic pulmonary disease (eg, chronic obstructive pulmonary disease [COPD])', info: '' },
    { id: 2, title: 'Chronic heart disease (eg, heart failure)', info: '' },
    { id: 3, title: 'Chronic liver disease', info: '' },
    { id: 4, title: 'Chronic renal disease', info: '' },
    { id: 5, title: 'Cancer', info: '' },
    { id: 6, title: 'Diabetes mellitus', info: '' },
    { id: 7, title: 'Alcohol use disorder', info: '' },
    { id: 8, title: 'Immunosuppression (including asplenia)', info: '' },
    { id: 9, title: 'Smoking', info: '' },
    { id: 10, title: 'Use of antibiotics within the past three months', info: '' },
    { id: 11, title: 'Patient has penicillin allergy', info: '' },
    { id: 12, title: 'Contraindications to macrolide use', info: '• An allergy to a macrolide\n• A markedly prolonged QTc (rate-corrected QT interval) at baseline\n• Significant risk factors for QT interval prolongation (including use of other QT-prolonging agents)' },
    { id: 13, title: 'NONE of the Above', info: '' }
  ];

  const [infoModal, setInfoModal] = useState(false);
  const [selectedInfo, setSelectedInfo] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);

  const handleSelection = (ids) => {
    const hasNone = ids.includes(13);
    const hasPenicillinAllergy = ids.includes(11);
    const hasMacrolideContraindications = ids.includes(12);
    const hasFirst10Choices = ids.some(id => id >= 1 && id <= 10);
  
    if (hasNone && ids.length === 1) {
      // Scenario: If the user chooses ONLY "NONE of the Above", move to slide 6
      navigation.navigate('SixthOption');
    console.log("6")

    } else if (!hasPenicillinAllergy && !hasMacrolideContraindications && hasFirst10Choices) {
      // Scenario: If the user chooses any number of the first 10 choices except the last 2, move to slide 7
      navigation.navigate('SeventhOption');
    console.log("SeventhOption")

    } else if (hasPenicillinAllergy && !hasMacrolideContraindications && !hasFirst10Choices) {
      // Scenario: If the user chooses "Patient has penicillin allergy" ONLY, move to slide 8
      navigation.navigate('EighthOption');
    console.log("EighthOption")
      
    } else if (!hasPenicillinAllergy && hasMacrolideContraindications && !hasFirst10Choices) {
      // Scenario: If the user chooses "Contraindications to macrolide use" ONLY, move to slide 10
      navigation.navigate('TenthOption');
    console.log("TenthOption")
      
    } else if (hasPenicillinAllergy && hasFirst10Choices) {
      // Scenario: If the user chooses any number of the first 10 choices + "Patient has penicillin allergy", move to slide 13
      navigation.navigate('ThirteenthOption');
      console.log("ThirteenthOption")

    } else if (hasMacrolideContraindications && hasFirst10Choices) {
      // Scenario: If the user chooses any number of the first 10 choices + "Contraindications to macrolide use", move to slide 15
      navigation.navigate('FifteenthOption');
      console.log("FifteenthOption")

    }
  };
  

const handlePress = (id) => {
  setSelectedIds(prevSelectedIds => {
    const updatedIds = prevSelectedIds.includes(id)
      ? prevSelectedIds.filter(selectedId => selectedId !== id)
      : [...prevSelectedIds, id];
    return updatedIds;
  });
};

const handleSubmit = () => {
  handleSelection(selectedIds);
};

  const handleLongPress = (info) => {
    setSelectedInfo(info);
    setInfoModal(true);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setSelectedInfo(null);
      setInfoModal(false);
    });
  
    return unsubscribe;
  }, [navigation]);


  useFocusEffect(
    React.useCallback(() => {
      // Reset state when the screen is focused
      setSelectedIds([]);
      setSelectedInfo(null);
      setInfoModal(false);
    }, [])
  );
  
  useFocusEffect(
    React.useCallback(() => {
      return () => setInfoModal(false);
    }, [])
  );



  return (
    <>
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{'CAP Care'}</Text>
      </View>
      <ScrollView>
        <View style={styles.content}>
          <Text style={styles.instruction}>{"Select all criteria that apply to your patient:"}</Text>
          {buttons.map((button) => (
            <Pressable
              key={button.id}
              onPress={() => handlePress(button.id)}
              style={styles.checkboxContainer}
            >
              {selectedIds.includes(button.id) ? (
                <Icon name="check-box" size={24} color={COLORS.primarydarkBule} style={styles.icon} />
              ) : (
                <Icon name="check-box-outline-blank" size={24} color="gray" style={styles.icon} />
              )}
              <Text style={styles.checkboxText}>{button.title}</Text>
              {button.info && (
                <TouchableOpacity
                  onPress={() => handleLongPress(button.info)}
                  style={styles.infoButton}
                >
                  <Text style={styles.infoButtonText}>Info.</Text>
                </TouchableOpacity>
              )}
            </Pressable>
          ))}
        </View>
      </ScrollView>
      <Pressable style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>{"Next"}</Text>
      </Pressable>
    
    </View>

{infoModal &&
  <Modal
    animationType="slide"
    transparent={true}
    visible={infoModal}
    onRequestClose={() => setInfoModal(false)}
  >
    <Pressable
      style={styles.centeredView}
      onPress={() => setInfoModal(false)}
    >
      <View style={styles.modalView}>
        <Text style={styles.modalText}>{selectedInfo}</Text>
      </View>
    </Pressable>
  </Modal>
}
</>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    marginBottom: RFValue(10),
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: RFValue(10),
    paddingVertical: RFValue(10),
  },
  headerText: {
    ...FONTS.h1,
    color: COLORS.white,
    fontWeight: 'bold',
    textAlign: "center",
  },
  content: {
    paddingHorizontal: SIZES.base,
    alignItems: 'center',
  },
  instruction: {
    ...FONTS.body3,
    color: COLORS.primarydarkBule,
    fontWeight: "bold",
    textAlign: 'left',
    marginBottom: SIZES.margin
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    width: '100%',
    paddingHorizontal: SIZES.base,
  },
  checkboxText: {
    ...FONTS.h3,
    textAlign: 'left',
    color: COLORS.primarydarkBule,
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
  infoButton: {
    marginLeft: 10,
  },
  infoButtonText: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: COLORS.primarydarkBule,
    padding: SIZES.base,
    borderRadius: SIZES.base,
    alignItems: 'center',
    justifyContent: 'center',
    margin: SIZES.margin,
  },
  submitButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: RFValue(16),
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
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
  modalText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'left',
    lineHeight: 25,
  },
});

export default ThirdOption;
