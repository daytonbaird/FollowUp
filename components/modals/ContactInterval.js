import React, {useState} from 'react';
import {View, Text, Button, TextInput} from 'react-native';
import Modal from 'react-native-modal';
import {Picker} from '@react-native-community/picker';

//styles
import {styles} from '../../styles/global';

const ContactInterval = ({
  isVisible,
  toggleContactVisible,
  userSettings,
  updateSettings,
  generatePrettyContactInterval,
  generateContactIntervalState,
}) => {
  //magic numbers
  const oneDayMs = 86400000;
  const oneWeekMs = 604800000;
  const oneMonthMs = 2419200000;
  const oneYearMs = 31536000000;

  let contactInterval = userSettings.contactInterval;
  let contactFreqFromSettings = userSettings.contactIntervalFreq;

  //Contact Frequency State
  const [contactFreq, setContactFreq] = useState({
    freq: contactFreqFromSettings,
  });

  //Creates a new contact interval and saves it to settings
  const createNewContactInterval = (num, freq) => {
    let newInterval = generateContactInterval(num, freq);
    updateSettings({contactInterval: newInterval});
  };

  //Saves the contact frequency to the contactIntervalFreq Setting (not displayed to user)
  const saveContactFreq = freq => {
    updateSettings({contactIntervalFreq: freq});
  };

  //Generates the appropriate contact interval based on user selection
  const gernerateContactInterval = (num, freq) => {
    if (!num) {
      num = 0;
    }
    if (freq === 'days') {
      return num * oneDayMs;
    }
    if (freq === 'weeks') {
      return num * oneWeekMs;
    }
    if (freq === 'months') {
      return num * oneMonthMs;
    }
    if (freq === 'years') {
      return num * oneYearMs;
    }
    return 4 * oneWeekMs; //default value
  };

  //convert the contact interval from MS to single unit & turns contactInterval into a displayable String
  contactInterval = generatePrettyContactInterval(
    contactInterval,
    contactFreq.freq,
  );
  contactInterval = contactInterval + '';
  const [contactNum, setContactNum] = useState(contactInterval);

  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={0.3}
      onBackdropPress={() => toggleContactVisible()}>
      <View style={styles.defaultModalView}>
        <View style={styles.modalHeaderView}>
          <Text style={styles.modalHeader}>Contact Interval</Text>
        </View>
        <View style={styles.dualPickerModalView}>
          <TextInput
            placeholder="0"
            keyboardType="number-pad"
            contextMenuHidden={true}
            style={styles.dualModalTextInput}
            onChangeText={num => {
              setContactNum(num);
              setContactFreq({freq: contactFreq.freq});
            }}
            value={contactNum}
          />
          <Picker
            selectedValue={contactFreq.freq}
            style={styles.dualPicker}
            onValueChange={(itemValue, itemIndex) => {
              setContactFreq({freq: itemValue});
              setContactNum(contactNum);
            }}>
            <Picker.Item label="Days" value="days" />
            <Picker.Item label="Weeks" value="weeks" />
            <Picker.Item label="Months" value="months" />
            <Picker.Item label="Years" value="years" />
          </Picker>
        </View>
        <Button
          title="Save"
          color="firebrick"
          onPress={() => {
            createNewContactInterval(contactNum, contactFreq.freq);
            saveContactFreq(contactFreq.freq);
            generateContactIntervalState();
            toggleContactVisible();
          }}
        />
      </View>
    </Modal>
  );
};

export default ContactInterval;
