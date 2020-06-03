import React, {useState} from 'react';
import {View, Text, Button, TextInput} from 'react-native';
import Modal from 'react-native-modal';
import {Picker} from '@react-native-community/picker';

//styles
import {styles} from '../../styles/global';

const CallInterval = ({
  isVisible,
  toggleCallVisible,
  userSettings,
  updateSettings,
  generatePrettyCallInterval,
  generateCallIntervalState,
}) => {
  //magic numbers
  const oneDayMs = 86400000;
  const oneWeekMs = 604800000;
  const oneMonthMs = 2419200000;
  const oneYearMs = 31536000000;

  let callInterval = userSettings.callInterval;
  let callFreqFromSettings = userSettings.callIntervalFreq;

  //Call Frequency State
  const [callFreq, setCallFreq] = useState({
    freq: callFreqFromSettings,
  });

  //Creates a new call interval and saves it to settings
  const createNewCallInterval = (num, freq) => {
    let newInterval = generateCallInterval(num, freq);
    updateSettings({callInterval: newInterval});
  };

  //Saves the call frequency to the callIntervalFreq Setting (not displayed to user)
  const saveCallFreq = freq => {
    updateSettings({callIntervalFreq: freq});
  };

  //Generates the appropriate call interval based on user selection
  const generateCallInterval = (num, freq) => {
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

  //convert the call interval from MS to single unit & turns callInterval into a displayable String
  callInterval = generatePrettyCallInterval(callInterval, callFreq.freq);
  callInterval = callInterval + '';
  const [callNum, setCallNum] = useState(callInterval);

  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={0.3}
      onBackdropPress={() => toggleCallVisible()}>
      <View style={styles.defaultModalView}>
        <View style={styles.dualPickerModalView}>
          <TextInput
            placeholder="0"
            keyboardType="number-pad"
            style={styles.dualModalTextInput}
            onChangeText={num => {
              setCallNum(num);
              setCallFreq({freq: callFreq.freq});
            }}
            value={callNum}
          />
          <Picker
            selectedValue={callFreq.freq}
            style={styles.dualPicker}
            onValueChange={(itemValue, itemIndex) => {
              setCallFreq({freq: itemValue});
              setCallNum(callNum);
            }}>
            <Picker.Item label="Days" value="days" />
            <Picker.Item label="Weeks" value="weeks" />
            <Picker.Item label="Months" value="months" />
            <Picker.Item label="Years" value="years" />
          </Picker>
        </View>
        <Button
          title="Save"
          onPress={() => {
            createNewCallInterval(callNum, callFreq.freq);
            saveCallFreq(callFreq.freq);
            generateCallIntervalState();
            toggleCallVisible();
          }}
        />
      </View>
    </Modal>
  );
};

export default CallInterval;
