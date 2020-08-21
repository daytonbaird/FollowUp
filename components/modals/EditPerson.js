import React, {useState, useEffect} from 'react';
import {
  KeyboardAvoidingView,
  View,
  Text,
  Button,
  TouchableOpacity,
  TextInput,
  Platform,
  Appearance,
  Settings,
} from 'react-native';
import Modal from 'react-native-modal';

import DateTimePicker from '@react-native-community/datetimepicker';
import Stepper from 'react-native-ios-stepper';

//styles
import {styles} from '../../styles/global';
import ContactInterval from './ContactInterval';

const EditPerson = ({
  isVisible,
  toggleEditVisible,
  oldPerson,
  updatePerson,
  updatePushNotification,
}) => {
  const oneMonthMs = 2592000000;
  const intervalInMs = Settings.get('contactInterval');
  console.log(intervalInMs);
  let appearance = Appearance.getColorScheme();

  let personCopy = JSON.parse(JSON.stringify(oldPerson));

  const [person, setPerson] = useState(personCopy);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(person.startDate);
  let neatStartDate = new Date(person.startDate).toLocaleDateString();

  const toggleDatePicker = () => {
    setShowDatePicker(previousState => !previousState);
  };

  let [stepValue, setStepValue] = useState(person.contactsCompleted);

  const compareAndUpdateDate = (oldP, newP) => {
    if (oldP.startDate === newP.startDate) {
      return;
    } else {
      if (person.contactsCompleted === 0) {
        let nextContactDateWithTime = new Date(
          newP.startDate.getTime() + Settings.get('contactInterval'),
        );
        newP.nextContactDate = nextContactDateWithTime.setHours(
          Settings.get('notificationTimeHrs'),
          Settings.get('notificationTimeMins'),
          0,
        );
        newP.nextContactDate = nextContactDateWithTime;
        updatePushNotification(
          newP,
          new Date(newP.nextContactDate).getHours(),
          new Date(newP.nextContactDate).getMinutes(),
        );
      }
    }
  };

  const getTextStyle = () => {
    if (appearance === 'dark') {
      return styles.editTextValueDark;
    } else {
      return styles.editTextValue;
    }
  };

  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={0.3}
      onBackdropPress={() => toggleEditVisible()}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[
          appearance === 'dark'
            ? styles.editDefaultModalViewDark
            : styles.editDefaultModalView,
        ]}>
        <View style={styles.modalHeaderView}>
          <Text style={styles.modalHeader}>Edit Person</Text>
        </View>
        <View style={styles.editPersonModalView}>
          <View style={styles.editPersonModalTitleView}>
            <Text style={styles.editText}>Name</Text>
          </View>

          <TextInput
            placeholder="Name"
            style={styles.dualEditTextInput}
            onChangeText={name => setPerson({...person, name: name})}
            value={person.name}
          />

          <View style={styles.editContactedDisplay}>
            <Text style={styles.editText}>Number Times Contacted: </Text>
            <Text style={getTextStyle()}>
              <Text style={getTextStyle()}>{stepValue}</Text>
            </Text>
          </View>
          <View style={styles.editContactedStepper}>
            <Stepper
              maxValue={Settings.get('numContactsToComplete')}
              minValue={0}
              value={stepValue}
              color={'firebrick'}
              onPress={index => {
                setStepValue(index);
                setPerson({...person, contactsCompleted: index});
              }}
            />
          </View>

          <View style={styles.editDateView}>
            <View style={styles.editPersonRowView}>
              <Text style={styles.editDateHeaderText}>Start Date</Text>
              <Text
                style={[
                  appearance === 'dark'
                    ? styles.editDateContentDark
                    : styles.editDateContent,
                ]}>
                {neatStartDate}
              </Text>
            </View>
            <View style={styles.personSmEditView}>
              <TouchableOpacity onPress={toggleDatePicker}>
                <Text style={styles.personEditBtnSm}>edit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {showDatePicker && (
          <DateTimePicker
            value={new Date(date)}
            mode="date"
            is24Hour="true"
            maximumDate={Date.now() + oneMonthMs}
            onChange={(e, selectedDate) => {
              setDate(selectedDate);
              setPerson({...person, startDate: selectedDate});
            }}
          />
        )}

        <View style={styles.editPersonModalTitleView}>
          <Text style={styles.editText}>Location</Text>
        </View>

        <TextInput
          placeholder="Location"
          style={styles.dualEditTextInput}
          onChangeText={location => setPerson({...person, location: location})}
          value={person.location}
        />

        <View style={styles.editPersonModalTitleView}>
          <Text style={styles.editText}>Notes</Text>
        </View>

        <TextInput
          placeholder="Notes"
          // multiline
          style={styles.dualEditTextInput}
          onChangeText={notes => setPerson({...person, notes: notes})}
          value={person.notes}
        />

        <Button
          title="Save"
          color="firebrick"
          onPress={() => {
            compareAndUpdateDate(personCopy, person);
            updatePerson(person);
            toggleEditVisible();
          }}
        />
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default EditPerson;
