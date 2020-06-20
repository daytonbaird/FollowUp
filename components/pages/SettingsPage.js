//The page to select settings

//Libraries
import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  Switch,
  Button,
  TouchableOpacity,
  Settings,
  Alert,
} from 'react-native';

//Components
import NotificationTime from '../modals/NotificationTime';
import CallInterval from '../modals/CallInterval';
import NumCallsToComplete from '../modals/NumCallsToComplete';

//Styling
import {styles} from '../../styles/global';

//Converts boolean values from their binary form to boolean form
const convertBool = bool => {
  if (bool) {
    return true;
  }
  return false;
};

//Hook
const SettingsPage = ({route}) => {
  //Function that retrieves all user settings. Important for all below actions.
  const {getUserSettings} = route.params;
  const {updateUserSettings} = route.params;
  const {defaultSettings} = route.params;

  //Page-Level State Declarations
  //The Settings
  const [userSettings, setUserSettings] = useState(getUserSettings());

  //magic numbers
  const oneDayMs = 86400000;
  const oneWeekMs = 604800000;
  const oneMonthMs = 2419200000;
  const oneYearMs = 31536000000;

  const [prettyCreatePushNotifs, setPrettyCreatePushNotifs] = useState(
    convertBool(userSettings.createPushNotifications),
  );

  const [prettyShowCalledPersons, setPrettyShowCalledPersons] = useState(
    convertBool(userSettings.showCalledPersons),
  );
  const [prettyCallInterval, setPrettyCallInterval] = useState('');
  const [prettyCallFreq, setPrettyCallFreq] = useState('');
  const [prettyNotificationTime, setPrettyNotificaitonTime] = useState('');

  const [isNotifVisible, setIsNotifVisible] = useState(false);
  const [isCallVisible, setIsCallVisible] = useState(false);
  const [isNumCallVisible, setIsNumCallVisible] = useState(false);

  //Modal control functions
  const toggleNotifVisible = () => {
    setIsNotifVisible(previousState => !previousState);
  };

  const toggleCallVisible = () => {
    setIsCallVisible(previousState => !previousState);
  };

  const toggleNumCallVisible = () => {
    setIsNumCallVisible(previousState => !previousState);
  };

  //Switch Control Functions
  const togglePrettyCreatePushNotifs = () => {
    setPrettyCreatePushNotifs(previousState => !previousState);
  };

  const togglePrettyShowCalledPeople = () => {
    setPrettyShowCalledPersons(previousState => !previousState);
  };

  //
  const generatePrettyCallInterval = (msGiven, freq) => {
    if (freq === 'days') {
      return msGiven / oneDayMs;
    }
    if (freq === 'weeks') {
      return msGiven / oneWeekMs;
    }
    if (freq === 'months') {
      return msGiven / oneMonthMs;
    }
    if (freq === 'years') {
      return msGiven / oneYearMs;
    }
    return -1; //if nothing else
  };

  //Creates a 'pretty' frequency with correct plurality
  const generatePrettyFreq = (prettyInterval, freq) => {
    if (prettyInterval > 1) {
      return freq;
    }
    return freq.substring(0, freq.length - 1);
  };

  //Creates a pretty notification time to display to the user
  const generatePrettyNotificationTime = (notifTimeHrs, notifTimeMins) => {
    let prettyTime;
    let prettyTimeHrs = notifTimeHrs;
    let prettyTimeMins = notifTimeMins;
    let amPm = 'AM';

    if (notifTimeHrs > 12) {
      amPm = 'PM';
      prettyTimeHrs = notifTimeHrs - 12;
    }

    if (notifTimeMins < 10) {
      prettyTimeMins = `0${notifTimeMins}`;
    }
    prettyTime = `${prettyTimeHrs}:${prettyTimeMins} ${amPm}`;

    setPrettyNotificaitonTime(prettyTime);
  };

  //Updates the settings and refreshes the state with the new settings.
  const updateSettings = data => {
    Settings.set(data);
    setUserSettings(getUserSettings());
  };

  const updateCreatePushNotifications = current => {
    updateSettings({createPushNotifications: !current});
  };

  const updateShowCalledPersons = current => {
    updateSettings({showCalledPersons: !current});
  };

  const generateCallInterval = () => {
    setPrettyCallInterval(
      generatePrettyCallInterval(
        userSettings.callInterval,
        userSettings.callIntervalFreq,
      ),
    );
    setPrettyCallFreq(
      generatePrettyFreq(prettyCallInterval, userSettings.callIntervalFreq),
    );
  };

  //Resets to default settings and update the state to reflect changes.
  const resetToDefault = defaultSettings => {
    updateSettings(defaultSettings);
    if (!prettyCreatePushNotifs) {
      togglePrettyCreatePushNotifs();
    }
    if (prettyShowCalledPersons) {
      togglePrettyShowCalledPeople();
    }
  };
  useEffect(() => {
    generatePrettyNotificationTime(
      userSettings.notificaitonTimeHrs,
      userSettings.notificaitonTimeMins,
    );
    generateCallInterval();
  });

  return (
    <ScrollView>
      <CallInterval
        isVisible={isCallVisible}
        toggleCallVisible={toggleCallVisible}
        userSettings={userSettings}
        updateSettings={updateSettings}
        generatePrettyCallInterval={generatePrettyCallInterval}
        generateCallIntervalState={generateCallInterval}
      />
      <NotificationTime
        isVisible={isNotifVisible}
        toggleNotifVisible={toggleNotifVisible}
        updateSettings={updateSettings}
        generatePrettyNotificationTime={generatePrettyNotificationTime}
      />
      <NumCallsToComplete
        isVisible={isNumCallVisible}
        toggleNumCallVisible={toggleNumCallVisible}
        updateSettings={updateSettings}
        numCallsToComplete={userSettings.numCallsToComplete}
      />
      {/* Header */}
      <View style={styles.settingsHeaderView}>
        <Text style={styles.settingsHeader}>Settings</Text>
      </View>
      {/* Call Interval */}
      <View style={styles.settingsView}>
        <View style={styles.settingsDisplay}>
          <Text style={styles.settingsDisplayText}>Call Interval</Text>
          <Text
            style={
              styles.settingsDisplayText
            }>{`${prettyCallInterval} ${prettyCallFreq}`}</Text>
        </View>
        <View style={styles.settingsEditView}>
          <TouchableOpacity onPress={toggleCallVisible}>
            <Text style={styles.settingsBtn}>edit</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Notification Time */}
      <View style={styles.settingsView}>
        <View style={styles.settingsDisplay}>
          <Text style={styles.settingsDisplayText}>Notification Time</Text>
          <Text style={styles.settingsDisplayText}>
            {prettyNotificationTime}
          </Text>
        </View>
        <View style={styles.settingsEditView}>
          <TouchableOpacity onPress={toggleNotifVisible}>
            <Text style={styles.settingsBtn}>edit</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Number Calls Before Completed */}
      <View style={styles.settingsView}>
        <View style={styles.settingsDisplay}>
          <Text style={styles.settingsDisplayText}>
            Number Calls to Complete
          </Text>
          <Text style={styles.settingsDisplayText}>
            <Text style={styles.settingsDisplayText}>
              {userSettings.numCallsToComplete}
            </Text>
          </Text>
        </View>
        <View style={styles.settingsEditView}>
          <TouchableOpacity onPress={toggleNumCallVisible}>
            <Text style={styles.settingsBtn}>edit</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Create Push Notifications */}
      <View style={styles.settingsView}>
        <View style={styles.settingsDisplay}>
          <Text style={styles.settingsDisplayText}>
            Create Push Notifications
          </Text>
          <Switch
            onValueChange={() => {
              togglePrettyCreatePushNotifs();
              updateCreatePushNotifications(prettyCreatePushNotifs);
              updateUserSettings();
            }}
            value={prettyCreatePushNotifs}
            trackColor={{true: 'firebrick'}}
          />
        </View>
      </View>
      {/* Show Called People */}
      <View style={styles.settingsView}>
        <View style={styles.settingsDisplay}>
          <Text style={styles.settingsDisplayText}>Show Called People</Text>
          <Switch
            onValueChange={() => {
              togglePrettyShowCalledPeople();
              updateShowCalledPersons(prettyShowCalledPersons);
              updateUserSettings();
              alert('Saved! Restart your app to see changes.');
            }}
            value={prettyShowCalledPersons}
            trackColor={{true: 'firebrick'}}
          />
        </View>
      </View>
      <Button
        title="Reset Defaults"
        color="firebrick" /* Will soon turn this into TouchableOpacity Btn */
        onPress={() => {
          Alert.alert(
            'Are you sure you wish to reset to default settings?',
            '',
            [
              {
                text: 'Yes',
                onPress: () => {
                  resetToDefault(defaultSettings);
                },
              },
              {
                text: 'No',
                style: 'cancel',
              },
            ],
          );
        }}
      />
    </ScrollView>
  );
};

export default SettingsPage;
