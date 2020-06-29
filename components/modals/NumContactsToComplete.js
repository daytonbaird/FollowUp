import React, {useState} from 'react';
import {
  View,
  KeyboardAvoidingView,
  Text,
  Button,
  TextInput,
  Platform,
} from 'react-native';
import Modal from 'react-native-modal';
import {Picker} from '@react-native-community/picker';

//styles
import {styles} from '../../styles/global';

const NumContactsToComplete = ({
  isVisible,
  toggleNumContactVisible,
  numContactsToComplete,
  updateSettings,
}) => {
  const [numContactsComp, setNumContactsComp] = useState(
    '' + numContactsToComplete,
  );

  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={0.3}
      onBackdropPress={() => toggleNumContactVisible()}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.defaultModalView}>
        <View style={styles.modalHeaderView}>
          <Text style={styles.modalHeader}>Number of Contacts to Complete</Text>
        </View>
        <View style={styles.numContactsModalView}>
          <TextInput
            placeholder="1"
            keyboardType="number-pad"
            contextMenuHidden={true}
            style={styles.dualModalTextInput}
            onChangeText={num => setNumContactsComp('' + num)}
            value={numContactsComp}
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
