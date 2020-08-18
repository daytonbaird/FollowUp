import React, {useEffect} from 'react';
import {View, Text, Appearance, Button, TouchableOpacity} from 'react-native';
import {useState} from 'react';
import Stepper from 'react-native-ios-stepper';

import DateTimePicker from '@react-native-community/datetimepicker';

//Styling
import {styles} from '../styles/global';
import AlreadyContactedDate from './modals/AlreadyContactedDate';

const AlreadyContacted = ({getUserSettings, formikProps}) => {
  const oneMonthMs = 2592000000;
  let appearance = Appearance.getColorScheme();
  let [userSettings, setUserSettings] = useState(getUserSettings());

  let [stepValue, setStepValue] = useState(
    formikProps.values.contactsCompleted,
  );

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  const [prettyStartDate, setPrettyStartDate] = useState('');

  const [isAlreadyContactedDate, setIsAlreadyContactedDate] = useState(false);

  const toggleDatePicker = () => {
    setShowDatePicker(previousState => !previousState);
  };

  const toggleIsAlreadyContactedDate = () => {
    setIsAlreadyContactedDate(previousState => !previousState);
  };

  const generatePrettyStartDate = date => {
    let prettyDate;

    prettyDate = date.toLocaleDateString();

    setPrettyStartDate(prettyDate);
  };

  const getTextStyle = () => {
    if (appearance === 'dark') {
      return styles.alreadyContactedDisplayTextDark;
    } else {
      return styles.alreadyContactedDisplayText;
    }
  };

  useEffect(() => {
    if (prettyStartDate === '') {
      generatePrettyStartDate(startDate);
    }
  });

  return (
    <View isVisible="false">
      <AlreadyContactedDate
        isVisible={isAlreadyContactedDate}
        toggleVisible={toggleIsAlreadyContactedDate}
        startDate={startDate}
        setStartDate={setStartDate}
        generatePrettyStartDate={generatePrettyStartDate}
        formikProps={formikProps}
      />
      <View style={styles.alreadyContactedView}>
        <View style={styles.alreadyContactedDisplay}>
          <Text style={getTextStyle()}>Number Times Contacted: </Text>
          <Text style={getTextStyle()}>
            <Text style={getTextStyle()}>{stepValue}</Text>
          </Text>
        </View>
        <View style={styles.alreadyContactedStepper}>
          <Stepper
            maxValue={userSettings.numContactsToComplete - 1}
            minValue={0}
            value={stepValue}
            color={'firebrick'}
            onPress={index => {
              setStepValue(index);
              formikProps.handleChange('contactsCompleted');
              formikProps.values.contactsCompleted = index;
            }}
          />
        </View>
        <View style={styles.editDateView}>
          <View style={styles.editPersonRowView}>
            <Text
              style={[
                appearance === 'dark'
                  ? styles.editDateHeaderTextNoColorDark
                  : styles.editDateHeaderTextNoColor,
              ]}>
              Last Contacted
            </Text>
            <Text
              style={[
                appearance === 'dark'
                  ? styles.editDateContentDark
                  : styles.editDateContent,
              ]}>
              {prettyStartDate}
            </Text>
          </View>
          <View style={styles.personSmEditView}>
            <TouchableOpacity onPress={toggleIsAlreadyContactedDate}>
              <Text style={styles.personEditBtnSm}>edit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
export default AlreadyContacted;

//TODO: Add date picker for most recent call date.
