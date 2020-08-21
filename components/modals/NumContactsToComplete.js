import React, {useState} from 'react';
import {
  View,
  KeyboardAvoidingView,
  Text,
  Button,
  TextInput,
  Platform,
  Appearance,
} from 'react-native';
import Modal from 'react-native-modal';
import {Picker} from '@react-native-community/picker';
import Stepper from 'react-native-ios-stepper';

//styles
import {styles} from '../../styles/global';

const NumContactsToComplete = ({
  isVisible,
  toggleNumContactVisible,
  numContactsToComplete,
  updateSettings,
}) => {
  const [numContactsComp, setNumContactsComp] = useState(numContactsToComplete);
  let appearance = Appearance.getColorScheme();

  let [stepValue, setStepValue] = useState(1);

  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={0.3}
      onBackdropPress={() => toggleNumContactVisible()}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[
          appearance === 'dark'
            ? styles.defaultModalViewDark
            : styles.defaultModalView,
        ]}>
        <View style={styles.modalHeaderView}>
          <Text style={styles.modalHeader}>Number of Contacts to Complete</Text>
        </View>
        <View style={styles.numContactsModalView}>
          <Text style={styles.dualModalTextInput}>{numContactsComp}</Text>
          <Stepper
            maxValue={100}
            minValue={1}
            value={numContactsComp}
            color={'firebrick'}
            onPress={index => {
              setNumContactsComp(index);
            }}
          />
        </View>
        <Button
          title="Save"
          color="firebrick"
          onPress={() => {
            if (numContactsComp < 1) {
              setNumContactsComp('' + 1);
            }
            updateSettings({numContactsToComplete: numContactsComp});
            toggleNumContactVisible();
          }}
        />
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default NumContactsToComplete;
