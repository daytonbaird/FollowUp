import React, {useState} from 'react';
import {View, Text, Button, Settings} from 'react-native';
import Modal from 'react-native-modal';
import DateTimePicker from '@react-native-community/datetimepicker';

//styles
import {styles} from '../../styles/global';

const NotificationTime = ({
  isVisible,
  toggleNotifVisible,
  updateSettings,
  generatePrettyNotificationTime,
}) => {
  const now = new Date();
  now.setHours(Settings.get('notificationTimeHrs'));
  now.setMinutes(Settings.get('notificationTimeMins'));
  const [userTime, setUserTime] = useState(now);
  const [hours, setHours] = useState(userTime.getHours());
  const [minutes, setMinutes] = useState(userTime.getMinutes());

  const generateNotificationTime = (hrs, mins) => {
    updateSettings({notificationTimeHrs: hrs});
    updateSettings({notificationTimeMins: mins});
  };

  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={0.3}
      onBackdropPress={() => toggleNotifVisible()}>
      <View style={styles.defaultModalView}>
        <DateTimePicker
          value={userTime}
          mode="time"
          is24Hour="true"
          onChange={(e, selectedTime) => {
            setUserTime(selectedTime);
            setMinutes(selectedTime.getMinutes());
            setHours(selectedTime.getHours());
          }}
        />
        <Button
          title="Save"
          color="firebrick"
          onPress={() => {
            setMinutes(userTime.getMinutes());
            setHours(userTime.getHours());
            generateNotificationTime(hours, minutes);
            generatePrettyNotificationTime();
            toggleNotifVisible();
          }}
        />
      </View>
    </Modal>
  );
};

export default NotificationTime;
