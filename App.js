//Libraries
import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  Platform,
  TouchableOpacity,
  ActionSheetIOS,
  Settings,
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
import TermsPage from './components/pages/TermsPage';
import EditPage from './components/pages/EditPage';

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
    callInterval: 2419200000,
    callIntervalFreq: 'weeks',
    notificationTimeHrs: 16,
    notificationTimeMins: 0,
    numCallsToComplete: 3,
    createPushNotifications: true,
    showCalledPersons: false,
  };

  const getUserSettings = () => {
    return {
      callInterval: Settings.get('callInterval'),
      callIntervalFreq: Settings.get('callIntervalFreq'),
      notificaitonTimeHrs: Settings.get('notificationTimeHrs'),
      notificaitonTimeMins: Settings.get('notificationTimeMins'),
      numCallsToComplete: Settings.get('numCallsToComplete'),
      createPushNotifications: Settings.get('createPushNotifications'),
      showCalledPersons: Settings.get('showCalledPersons'),
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
  const deletePerson = personId => {
    deletePersonFromState(personId);
    deleteFromDB(personId);
  };

  //Assigns first call on person creation
  const assignFirstCall = (person, interval) => {
    const hireDateTime = person.hireDate.getTime();
    let nextCallDateWithNotif = new Date(hireDateTime + interval);
    person.nextCallDate = nextCallDateWithNotif.setHours(
      userSettings.notificaitonTimeHrs,
      userSettings.notificaitonTimeMins,
      0,
    );
    person.nextCallDate = nextCallDateWithNotif;
    scheduleCallNotification(
      person,
      userSettings.notificaitonTimeHrs,
      userSettings.notificaitonTimeMins,
    );
  };

  //Assigns next call date for each person
  //Maybe assigns push notifications too?
  const assignNextCall = (person, interval) => {
    const nextCallTime = person.nextCallDate.getTime();

    let dbEntry = realm.objectForPrimaryKey('Person', person.id);
    realm.write(() => {
      dbEntry.nextCallDate = new Date(nextCallTime + interval);
    });
  };

  //Handler for calls
  const assignCalls = person => {
    if (person.callsCompleted < userSettings.numCallsToComplete) {
      cancelCallNotification(person.id);
      assignNextCall(person, userSettings.callInterval);
      scheduleCallNotification(
        person,
        userSettings.notificaitonTimeHrs,
        userSettings.notificaitonTimeMins,
      );
    } else {
      assignNextCall(person, longAssTime);
      let dbEntry = realm.objectForPrimaryKey('Person', person.id);
      realm.write(() => {
        dbEntry.complete = true;
      });
      // refreshState();
      console.log(person.complete);
    }
  };

  //Assign metadata to person
  const assignPersonInfo = person => {
    person.id = uuidv4();
    person.callsCompleted = 0;
    person.complete = false;
    assignFirstCall(person, userSettings.callInterval);
  };

  //Add person to state & db
  const addPerson = person => {
    assignPersonInfo(person);
    realm.write(() => {
      realm.create('Person', {
        name: person.name,
        id: person.id,
        hireDate: person.hireDate,
        storeNum: person.storeNum,
        notes: person.notes,
        callsCompleted: person.callsCompleted,
        nextCallDate: person.nextCallDate,
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
      dbEntry.hireDate = person.hireDate;
      dbEntry.storeNum = person.storeNum;
      dbEntry.notes = person.notes;
      dbEntry.callsCompleted = person.callsCompleted;
      dbEntry.nextCallDate = person.nextCallDate;
      dbEntry.complete = person.complete;
    });
    refreshState();
  };

  //Update Call #s in database
  const updateCallNumDb = person => {
    let dbEntry = realm.objectForPrimaryKey('Person', person.id);
    realm.write(() => {
      dbEntry.callsCompleted++;
    });
  };

  //Updates the call # for a person in the database and then refreshes the state
  const updateCallNum = person => {
    updateCallNumDb(person);
    assignCalls(person);
    refreshState();
  };

  //Pulls database and adds it to the state
  const dbToState = () => {
    let dbPersons = realm.objects('Person');
    dbPersons = dbPersons.sorted('nextCallDate', true);
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

  const scheduleCallNotification = (person, hrs, mins) => {
    if (!userSettings.createPushNotifications) return;

    let scheduledNotif = new Date(person.nextCallDate.getTime());
    scheduledNotif.setHours(hrs, mins, 0);

    PushNotification.localNotificationSchedule({
      title: 'Due Today',
      playSound: true,
      message: `Follow up with ${person.name} is due today.`, // (required)
      userInfo: {id: person.id},
      date: new Date(scheduledNotif),
    });
  };

  const cancelCallNotification = personId => {
    PushNotification.cancelLocalNotifications({id: personId});
  };

  const cancelAllNotifications = () => {
    PushNotification.cancelAllLocalNotifications();
  };

  const moreInfoActionSheet = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Cancel', 'Settings', 'About', 'Terms and Conditions'],
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
          navigation.navigate('Terms');
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

  //Called once upon page load
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
          if (userSettings.showCalledPersons) {
            return (
              <ListPerson
                person={item}
                updatePerson={updatePerson}
                navigation={navigation}
                onSwipeFromLeft={() => updateCallNum(item)}
                onRightPress={() => deletePerson(item.id)}
              />
            );
          } else {
            if (!item.complete) {
              return (
                <ListPerson
                  person={item}
                  navigation={navigation}
                  updatePerson={updatePerson}
                  onSwipeFromLeft={() => updateCallNum(item)}
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
        <Stack.Screen name="Terms" component={TermsPage} />
        <Stack.Screen name="Edit Person" component={EditPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
