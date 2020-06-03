import React, {useState} from 'react';
import {View, Text, Button, TextInput} from 'react-native';
import Modal from 'react-native-modal';
import {Picker} from '@react-native-community/picker';

//styles
import {styles} from '../../styles/global';

const NumCallsToComplete = ({
  isVisible,
  toggleNumCallVisible,
  numCallsToComplete,
  updateSettings,
}) => {
  const [numCallsComp, setNumCallsComp] = useState('' + numCallsToComplete);

  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={0.3}
      onBackdropPress={() => toggleNumCallVisible()}>
      <View style={styles.defaultModalView}>
        <View style={styles.numCallsModalView}>
          <TextInput
            placeholder="1"
            keyboardType="number-pad"
            style={styles.dualModalTextInput}
            onChangeText={num => setNumCallsComp('' + num)}
            value={numCallsComp}
          />
        </View>
        <Button
          title="Save"
          onPress={() => {
            if (numCallsComp < 1) {
              setNumCallsComp('' + 1);
            }
            updateSettings({numCallsToComplete: numCallsComp});
            toggleNumCallVisible();
          }}
        />
      </View>
    </Modal>
  );
};

export default NumCallsToComplete;
