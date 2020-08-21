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

const WhatsNewModal = ({isVisible, toggleWhatsNewModalVisible}) => {
  let appearance = Appearance.getColorScheme();

  const getTextStyle = () => {
    if (appearance === 'dark') {
      return styles.whatsNewTextDark;
    } else {
      return styles.whatsNewText;
    }
  };

  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={0.3}
      onBackdropPress={() => toggleWhatsNewModalVisible()}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[
          appearance === 'dark'
            ? styles.defaultModalViewDark
            : styles.defaultModalView,
        ]}>
        <View style={styles.modalHeaderView}>
          <Text style={styles.modalHeader}>What's New!</Text>
          <Text style={styles.modalSubHeader}>Version 1.1.0</Text>
        </View>
        <View style={styles.whatsNewModalView}>
          <Text style={styles.whatsNewHeader}>
            New Feature: Manual Scheduling
          </Text>
          <Text style={getTextStyle()}>
            Now you can manually schedule your next contact with anyone! Long
            press on any person and you will be given the option to set your
            next contact date manually, outside of your set contact interval.
          </Text>
          <Text style={styles.whatsNewHeader}>Other Updates</Text>
          <Text style={getTextStyle()}>
            Added the ability to import people easier, as well as several
            bugfixes. Fixed an issue where editing a person's start time would
            not re-schedule their contact date.
          </Text>
          <Text style={styles.whatsNewHeader}>Did you Know?</Text>
          <Text style={getTextStyle()}>
            Did you know you can press the '...' at the top right of the app to
            view additional settings and options? Try it out!
          </Text>
        </View>
        <Button
          title="Okay!"
          color="firebrick"
          onPress={() => {
            toggleWhatsNewModalVisible();
          }}
        />
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default WhatsNewModal;
