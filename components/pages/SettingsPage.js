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
  Appearance,
} from 'react-native';

//Components
import NotificationTime from '../modals/NotificationTime';
import ContactInterval from '../modals/ContactInterval';
import NumContactsToComplete from '../modals/NumContactsToComplete';

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
  let appearance = Appearance.getColorScheme();

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

  const [prettyShowContactedPersons, setPrettyShowContactedPersons] = useState(
    convertBool(userSettings.showContactedPersons),
  );
  const [prettyContactInterval, setPrettyContactInterval] = useState('');
  const [prettyContactFreq, setPrettyContactFreq] = useState('');
  const [prettyNotificationTime, setPrettyNotificaitonTime] = useState('');

  const [isNotifVisible, setIsNotifVisible] = useState(false);
  const [isContactVisible, setIsContactVisible] = useState(false);
  const [isNumContactVisible, setIsNumContactVisible] = useState(false);

  //Modal control functions
  const toggleNotifVisible = () => {
    setIsNotifVisible(previousState => !previousState);
  };

  const toggleContactVisible = () => {
    setIsContactVisible(previousState => !previousState);
  };

  const toggleNumContactVisible = () => {
    setIsNumContactVisible(previousState => !previousState);
  };

  //Switch Control Functions
  const togglePrettyCreatePushNotifs = () => {
    setPrettyCreatePushNotifs(previousState => !previousState);
  };

  const togglePrettyShowContactedPeople = () => {
    setPrettyShowContactedPersons(previousState => !previousState);
  };

  //
  const generatePrettyContactInterval = (msGiven, freq) => {
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

  const updateShowContactedPersons = current => {
    updateSettings({showContactedPersons: !current});
  };

  const generateContactInterval = () => {
    setPrettyContactInterval(
      generatePrettyContactInterval(
        userSettings.contactInterval,
        userSettings.contactIntervalFreq,
      ),
    );
    setPrettyContactFreq(
      generatePrettyFreq(
        prettyContactInterval,
        userSettings.contactIntervalFreq,
      ),
    );
  };

  //Resets to default settings and update the state to reflect changes.
  const resetToDefault = defaultSettings => {
    updateSettings(defaultSettings);
    if (!prettyCreatePushNotifs) {
      togglePrettyCreatePushNotifs();
    }
    if (prettyShowContactedPersons) {
      togglePrettyShowContactedPeople();
    }
  };
  useEffect(() => {
    generatePrettyNotificationTime(
      userSettings.notificaitonTimeHrs,
      userSettings.notificaitonTimeMins,
    );
    generateContactInterval();
  });

  return (
    <ScrollView
      style={[appearance === 'dark' ? styles.settingsScrollViewDark : null]}>
      <ContactInterval
        isVisible={isContactVisible}
        toggleContactVisible={toggleContactVisible}
        userSettings={userSettings}
        updateSettings={updateSettings}
        generatePrettyContactInterval={generatePrettyContactInterval}
        generateContactIntervalState={generateContactInterval}
      />
      <NotificationTime
        isVisible={isNotifVisible}
        toggleNotifVisible={toggleNotifVisible}
        updateSettings={updateSettings}
        generatePrettyNotificationTime={generatePrettyNotificationTime}
      />
      <NumContactsToComplete
        isVisible={isNumContactVisible}
        toggleNumContactVisible={toggleNumContactVisible}
        updateSettings={updateSettings}
        numContactsToComplete={userSettings.numContactsToComplete}
      />
      {/* Header */}
      <View style={styles.settingsHeaderView}>
        <Text style={styles.settingsHeader}>Settings</Text>
      </View>
      {/* Contact Interval */}
      <View style={styles.settingsView}>
        <View style={styles.settingsDisplay}>
          <Text style={styles.settingsDisplayText}>Contact Interval</Text>
          <Text
            style={
              styles.settingsDisplayText
            }>{`${prettyContactInterval} ${prettyContactFreq}`}</Text>
        </View>
        <View style={styles.settingsEditView}>
          <TouchableOpacity onPress={toggleContactVisible}>
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
      {/* Number Contacts Before Completed */}
      <View style={styles.settingsView}>
        <View style={styles.settingsDisplay}>
          <Text style={styles.settingsDisplayText}>Contacts to Complete</Text>
          <Text style={styles.settingsDisplayText}>
            <Text style={styles.settingsDisplayText}>
              {userSettings.numContactsToComplete}
            </Text>
          </Text>
        </View>
        <View style={styles.settingsEditView}>
          <TouchableOpacity onPress={toggleNumContactVisible}>
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
      {/* Show Contacted People */}
      <View style={styles.settingsView}>
        <View style={styles.settingsDisplay}>
          <Text style={styles.settingsDisplayText}>Show Contacted People</Text>
          <Switch
            onValueChange={() => {
              togglePrettyShowContactedPeople();
              updateShowContactedPersons(prettyShowContactedPersons);
              updateUserSettings();
              alert('Saved! Restart your app to see changes.');
            }}
            value={prettyShowContactedPersons}
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
                text: 'No',
              },
              {
                text: 'Yes',
                style: 'destructive',
                onPress: () => {
                  resetToDefault(defaultSettings);
                },
              },
            ],
          );
        }}
      />
    </ScrollView>
  );
};

export default SettingsPage;
