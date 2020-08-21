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
} from 'react-native';
import Modal from 'react-native-modal';

import DateTimePicker from '@react-native-community/datetimepicker';

//styles
import {styles} from '../../styles/global';

const ManuallySchedule = ({
  isVisible,
  toggleManuallyScheduleVisible,
  oldPerson,
  updatePerson,
  generatePrettyNotificationTime,
  updatePushNotification,
}) => {
  const oneYearMs = 31104000000;
  let appearance = Appearance.getColorScheme();

  let personCopy = JSON.parse(JSON.stringify(oldPerson));
  const [person, setPerson] = useState(personCopy);

  const [date, setDate] = useState(person.nextContactDate);
  let neatDate = new Date(date).toLocaleDateString();
  let neatTime = generatePrettyNotificationTime(
    new Date(date).getHours(),
    new Date(date).getMinutes(),
  );

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const toggleDatePicker = () => {
    setShowDatePicker(previousState => !previousState);
  };

  const toggleTimePicker = () => {
    setShowTimePicker(previousState => !previousState);
  };

  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={0.3}
      onBackdropPress={() => toggleManuallyScheduleVisible()}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[
          appearance === 'dark'
            ? styles.editDefaultModalViewDark
            : styles.editDefaultModalView,
        ]}>
        <View style={styles.modalHeaderView}>
          <Text style={styles.modalHeader}>Manually Schedule Contact</Text>
        </View>

        {/* DATE */}
        <View style={styles.scheduleModalView}>
          <View style={styles.editDateView}>
            <View style={styles.scheduleRowView}>
              <Text style={styles.editDateHeaderText}>Contact Date:</Text>
              <Text
                style={[
                  appearance === 'dark'
                    ? styles.editDateContentDark
                    : styles.editDateContent,
                ]}>
                {neatDate}
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
            maximumDate={Date.now() + oneYearMs}
            onChange={(e, selectedDate) => {
              setDate(selectedDate);
              setPerson({...person, nextContactDate: selectedDate});
            }}
          />
        )}

        {/* TIME */}
        <View style={styles.scheduleModalView}>
          <View style={styles.editDateView}>
            <View style={styles.scheduleRowView}>
              <Text style={styles.editDateHeaderText}>Contact Time:</Text>
              <Text
                style={[
                  appearance === 'dark'
                    ? styles.editDateContentDark
                    : styles.editDateContent,
                ]}>
                {neatTime}
              </Text>
            </View>
            <View style={styles.personSmEditView}>
              <TouchableOpacity onPress={toggleTimePicker}>
                <Text style={styles.personEditBtnSm}>edit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {showTimePicker && (
          <DateTimePicker
            value={new Date(date)}
            mode="time"
            is24Hour="true"
            onChange={(e, selectedTime) => {
              setDate(selectedTime);
              setPerson({...person, nextContactDate: selectedTime});
            }}
          />
        )}

        <Button
          title="Save"
          color="firebrick"
          onPress={() => {
            updatePerson(person);

            updatePushNotification(
              oldPerson, //The reason for this is b/c when the person is updated above, the "oldPerson" is now updated with the new date. the "person" in this modal is a copy of the actual person and therefore will not point to the same instance of the object.
              new Date(date).getHours(),
              new Date(date).getMinutes(),
            );
            toggleManuallyScheduleVisible();
          }}
        />
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default ManuallySchedule;
