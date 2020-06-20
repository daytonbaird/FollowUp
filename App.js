//Libraries
import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  Platform,
  TouchableOpacity,
  ActionSheetIOS,
  Settings,
  Alert,
} from 'react-native';
import {v4 as uuidv4} from 'uuid';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
const PushNotification = require('react-native-push-notification');

//Realm
const Realm = require('realm');
import {databaseOptions} from './databases/schemas';

//Components
import Header from './components/Header';
import ListPerson from './components/ListPerson';
import AddPersonButton from './components/AddPersonButton';

//Pages
import PersonCreator from './components/pages/PersonCreator';
import PersonInfo from './components/pages/PersonInfo';
import SettingsPage from './components/pages/SettingsPage';
import AboutPage from './components/pages/AboutPage';
import PrivacyPage from './components/pages/PrivacyPage';

//Styling
import {styles} from './styles/global';
import Icon from 'react-native-vector-icons/Entypo';

import {YellowBox} from 'react-native';

YellowBox.ignoreWarnings([
  'Non-serializable values were found in the navigation state',
]);

let realm = new Realm(databaseOptions);

//"Home Screen" for Navigation
const HomeScreen = ({navigation}) => {
  const defaultSettings = {
    contactInterval: 2419200000,
    contactIntervalFreq: 'weeks',
    notificationTimeHrs: 16,
    notificationTimeMins: 0,
    numContactsToComplete: 3,
    createPushNotifications: true,
    showContactedPersons: false,
  };

  const getUserSettings = () => {
    return {
      contactInterval: Settings.get('contactInterval'),
      contactIntervalFreq: Settings.get('contactIntervalFreq'),
      notificaitonTimeHrs: Settings.get('notificationTimeHrs'),
      notificaitonTimeMins: Settings.get('notificationTimeMins'),
      numContactsToComplete: Settings.get('numContactsToComplete'),
      createPushNotifications: Settings.get('createPushNotifications'),
      showContactedPersons: Settings.get('showContactedPersons'),
    };
  };

  const [persons, setPersons] = useState([]);
  const [dataPulled, setDataPulled] = useState(false);
  var userSettings = getUserSettings();
  var longAssTime = 31504464000000;

  const updateUserSettings = () => {
    userSettings = getUserSettings();
  };

  const checkIfFirstLaunch = () => {
    if (Settings.get('firstLaunch') === undefined) {
      Settings.set({firstLaunch: true});
      Settings.set(defaultSettings);
    }
  };

  //Add person to state
  const addPersonToState = person => {
    setPersons(currentPersons => {
      return [person, ...currentPersons];
    });
  };

  //Delete person from state
  const deletePersonFromState = personId => {
    setPersons(prevPersons => {
      return prevPersons.filter(person => person.id !== personId);
    });
  };

  //Delete person from database
  function deleteFromDB(personId) {
    realm.write(() => {
      realm.delete(realm.objectForPrimaryKey('Person', personId));
    });
  }

  //Delete person from database & state
  const deletePerson = (personId, callback) => {
    Alert.alert(
      'Confirm',
      'Are you sure you wish to delete this person?',
      [
        {
          text: 'No',
          onPress: () => null,
        },
        {
          text: 'Yes',
          onPress: () => {
            deletePersonFromState(personId);
            deleteFromDB(personId);
            cancelContactNotification(personId); //Cancels any notifications pending
            if (callback) {
              callback();
            }
          },
          style: 'destructive',
        },
      ],
      {cancelable: false},
    );
  };

  //Assigns first contact on person creation
  const assignFirstContact = (person, interval) => {
    const startDateTime = person.startDate.getTime();
    let nextContactDateWithNotif = new Date(startDateTime + interval);
    person.nextContactDate = nextContactDateWithNotif.setHours(
      userSettings.notificaitonTimeHrs,
      userSettings.notificaitonTimeMins,
      0,
    );
    person.nextContactDate = nextContactDateWithNotif;
    person.previousContactDate = new Date(nextContactDateWithNotif);
    scheduleContactNotification(
      person,
      userSettings.notificaitonTimeHrs,
      userSettings.notificaitonTimeMins,
    );
  };

  //Assigns next contact date for each person
  const assignNextContact = (person, interval) => {
    let now = new Date();
    let nextContactTime = person.nextContactDate.getTime();

    //If the next contact time has already surpassed
    if (nextContactTime < now) {
      nextContactTime = new Date();
      nextContactTime.setHours(
        userSettings.notificaitonTimeHrs,
        userSettings.notificaitonTimeMins,
        0,
      );
      nextContactTime = nextContactTime.getTime();
    }

    let dbEntry = realm.objectForPrimaryKey('Person', person.id);
    realm.write(() => {
      dbEntry.previousContactDate = person.nextContactDate;
      dbEntry.nextContactDate = new Date(nextContactTime + interval);
    });
  };

  //Handler for contacts.
  const assignContacts = person => {
    let now = new Date();
    if (person.contactsCompleted < userSettings.numContactsToComplete) {
      cancelContactNotification(person.id); //Cancels old contact notification
      assignNextContact(person, userSettings.contactInterval);
      if (!person.nextContactDate.getTime() < now) {
        scheduleContactNotification(
          person,
          userSettings.notificaitonTimeHrs,
          userSettings.notificaitonTimeMins,
        );
      }
    } else {
      assignNextContact(person, longAssTime);
      let dbEntry = realm.objectForPrimaryKey('Person', person.id);
      realm.write(() => {
        dbEntry.complete = true;
      });
      console.log(person.complete);
    }
  };

  const undoContact = person => {
    let previousContactDate = person.previousContactDate;
    let nextContactDate = person.nextContactDate;
    let contactInterval = userSettings.contactInterval;

    if (person.contactsCompleted > 0) {
      let dbEntry = realm.objectForPrimaryKey('Person', person.id);
      realm.write(() => {
        if (person.complete) {
          dbEntry.complete = false;
        }
        dbEntry.undoneContact = true;
        dbEntry.nextContactDate = previousContactDate;
        dbEntry.previousContactDate = new Date(
          previousContactDate - contactInterval,
        );
        previousContactDate - dbEntry.contactsCompleted--;
      });
      cancelContactNotification(person.id);
      scheduleContactNotification(
        person,
        userSettings.notificaitonTimeHrs,
        userSettings.notificaitonTimeMins,
      );
      navigation.navigate('Follow Up');
      refreshState();
    } else {
      alert('Error: You have not contacted this person.');
    }
  };

  //Assign metadata to person
  const assignPersonInfo = person => {
    person.id = uuidv4();
    person.contactsCompleted = 0;
    person.complete = false;
    assignFirstContact(person, userSettings.contactInterval);
  };

  //Add person to state & db
  const addPerson = person => {
    assignPersonInfo(person);
    realm.write(() => {
      realm.create('Person', {
        name: person.name,
        id: person.id,
        startDate: person.startDate,
        location: person.location,
        notes: person.notes,
        contactsCompleted: person.contactsCompleted,
        nextContactDate: person.nextContactDate,
        previousContactDate: person.previousContactDate,
        complete: person.complete,
      });
    });
    addPersonToState(person);
    refreshState();
    navigation.navigate('Follow Up');
  };

  const updatePerson = person => {
    let dbEntry = realm.objectForPrimaryKey('Person', person.id);
    realm.write(() => {
      dbEntry.name = person.name;
      dbEntry.startDate = person.startDate;
      dbEntry.location = person.location;
      dbEntry.notes = person.notes;
      dbEntry.contactsCompleted = person.contactsCompleted;
      dbEntry.nextContactDate = person.nextContactDate;
      dbEntry.complete = person.complete;
    });
    refreshState();
  };

  //Update Contact #s in database
  const updateContactNumDb = person => {
    let dbEntry = realm.objectForPrimaryKey('Person', person.id);
    realm.write(() => {
      dbEntry.contactsCompleted++;
    });
  };

  //Updates the contact # for a person in the database and then refreshes the state
  const updateContactNum = person => {
    updateContactNumDb(person);
    assignContacts(person);
    refreshState();
  };

  //Pulls database and adds it to the state
  const dbToState = () => {
    let dbPersons = realm.objects('Person');
    dbPersons = dbPersons.sorted('nextContactDate', true);
    dbPersons.forEach((object, index) => {
      addPersonToState(object);
    });
  };

  //Clears the state and sets it to pull from the database.
  const refreshState = person => {
    setPersons([]); //wipes the state
    dbToState();
  };

  //Update state with persons from database
  const updateStateFromDB = () => {
    if (!dataPulled) {
      dbToState();
    }
  };

  const setupPushNotifications = () => {
    PushNotification.configure({
      onRegister: function(token) {
        console.log('TOKEN:', token);
      },

      onNotification: function(notification) {
        console.log('NOTIFICATION:', notification);
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: Platform.OS === 'ios',
    });
  };

  const scheduleContactNotification = (person, hrs, mins) => {
    let now = new Date();
    if (!userSettings.createPushNotifications) return;
    if (person.nextContactDate.getTime() < now) return;

    let scheduledNotif = new Date(person.nextContactDate.getTime());
    scheduledNotif.setHours(hrs, mins, 0);

    PushNotification.localNotificationSchedule({
      title: 'Due Today',
      playSound: true,
      message: `Follow up with ${person.name} is due today.`, // (required)
      userInfo: {id: person.id},
      date: new Date(scheduledNotif),
    });
  };

  const cancelContactNotification = personId => {
    PushNotification.cancelLocalNotifications({id: personId});
  };

  const cancelAllNotifications = () => {
    PushNotification.cancelAllLocalNotifications();
  };

  const moreInfoActionSheet = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Cancel', 'Settings', 'About', 'Privacy Policy'],
        cancelButtonIndex: 0,
      },
      buttonIndex => {
        if (buttonIndex === 1) {
          navigation.navigate('Settings', {
            getUserSettings: getUserSettings,
            updateUserSettings: updateUserSettings,
            defaultSettings: defaultSettings,
          });
        } else if (buttonIndex === 2) {
          navigation.navigate('About');
        } else if (buttonIndex === 3) {
          navigation.navigate('Privacy Policy');
        }
      },
    );
  };

  const enableMoreInfo = () => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => moreInfoActionSheet()}
          title="Settings"
          color="black"
          style={styles.moreInfoBtn}>
          <Icon name="dots-three-horizontal" size={20} color="black" />
        </TouchableOpacity>
      ),
    });
  };

  //Contacted once upon page load
  useEffect(() => {
    checkIfFirstLaunch();
    updateUserSettings();
    enableMoreInfo(); //Enables the "More Info" button on the right
    updateStateFromDB(); //Pull database and add to state
    setDataPulled(true); //Mark this as completed so it is not looped indefinitely
    setupPushNotifications();
  });

  return (
    <View style={styles.appViewContainer}>
      <Header />
      <FlatList
        data={persons}
        renderItem={({item}) => {
          if (userSettings.showContactedPersons) {
            if (!item.complete) {
              return (
                <ListPerson
                  person={item}
                  updatePerson={updatePerson}
                  deletePerson={deletePerson}
                  undoContact={undoContact}
                  navigation={navigation}
                  onSwipeFromLeft={() => updateContactNum(item)}
                  onRightPress={() => deletePerson(item.id)}
                />
              );
            } else {
              return (
                <ListPerson
                  person={item}
                  deletePerson={deletePerson}
                  updatePerson={updatePerson}
                  undoContact={undoContact}
                  navigation={navigation}
                  onRightPress={() => deletePerson(item.id)}
                />
              );
            }
          } else {
            if (!item.complete) {
              return (
                <ListPerson
                  person={item}
                  navigation={navigation}
                  updatePerson={updatePerson}
                  deletePerson={deletePerson}
                  undoContact={undoContact}
                  onSwipeFromLeft={() => updateContactNum(item)}
                  onRightPress={() => deletePerson(item.id)}
                />
              );
            }
          }
        }}
      />
      <AddPersonButton
        screenName={'Add a Person'}
        navigation={navigation}
        addPerson={addPerson}
      />
    </View>
  );
};

//Creates navigation stack
const Stack = createStackNavigator();

//Navigation here [pages/panes]
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Follow Up" component={HomeScreen} />
        <Stack.Screen name="Add a Person" component={PersonCreator} />
        <Stack.Screen name="Person Info" component={PersonInfo} />
        <Stack.Screen name="Settings" component={SettingsPage} />
        <Stack.Screen name="About" component={AboutPage} />
        <Stack.Screen name="Privacy Policy" component={PrivacyPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
