import React, {useState} from 'react';
import {View, Text, Button, Settings, Appearance} from 'react-native';
import Modal from 'react-native-modal';
import DateTimePicker from '@react-native-community/datetimepicker';

//styles
import {styles} from '../../styles/global';

const AlreadyContactedDate = ({
  isVisible,
  toggleVisible,
  startDate,
  setStartDate,
  generatePrettyStartDate,
  formikProps,
}) => {
  const [userDate, setUserDate] = useState(startDate);
  let appearance = Appearance.getColorScheme();

  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={0.3}
      onBackdropPress={() => toggleVisible()}>
      <View
        style={[
          appearance === 'dark'
            ? styles.defaultModalViewDark
            : styles.defaultModalView,
        ]}>
        <View style={styles.modalHeaderView}>
          <Text style={styles.modalHeader}>Start Date</Text>
        </View>
        <DateTimePicker
          value={userDate}
          mode="date"
          maximumDate={Date.now()}
          is24Hour="true"
          onChange={(e, selectedTime) => {
            setUserDate(selectedTime);
          }}
        />
        <Button
          title="Save"
          color="firebrick"
          onPress={() => {
            setStartDate(userDate);
            generatePrettyStartDate(userDate);
            formikProps.handleChange('startDate');
            formikProps.values.startDate = userDate;
            toggleVisible();
          }}
        />
      </View>
    </Modal>
  );
};

export default AlreadyContactedDate;
