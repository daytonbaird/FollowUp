//The page to view information on a Person

//Libraries
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  ActionSheetIOS,
  Appearance,
} from 'react-native';

//Styling
import {styles} from '../../styles/global';

//Modals
import EditPerson from '../modals/EditPerson';
import ManuallySchedule from '../modals/ManuallySchedule';

//Modules
const PersonInfo = ({route, navigation}) => {
  //Route Parameters
  const {person} = route.params;
  const {updatePerson} = route.params;
  const {deletePerson} = route.params;
  const {undoContact} = route.params;
  const {updatePushNotification} = route.params;
  const {isLongPress} = route.params;

  let appearance = Appearance.getColorScheme();

  let isComplete = person.complete;

  //Modals
  const [isEditVisible, setEditVisible] = useState(false);
  const toggleEditVisible = () => {
    setEditVisible(previousState => !previousState);
  };

  const [isManuallyScheduleVisible, setIsManuallyScheduleVisible] = useState(
    isLongPress,
  );
  const toggleManuallyScheduleVisible = () => {
    setIsManuallyScheduleVisible(previousState => !previousState);
  };

  const navToFollowUp = () => {
    navigation.navigate('Follow Up');
  };

  const personInfoActionSheet = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [
          'Cancel',
          'Schedule Next Contact',
          'Edit Person',
          'Undo Contact',
          'Delete Person',
        ],
        cancelButtonIndex: 0,
        destructiveButtonIndex: 3,
      },
      buttonIndex => {
        if (buttonIndex === 1) {
          toggleManuallyScheduleVisible();
        }
        if (buttonIndex === 2) {
          toggleEditVisible();
        } else if (buttonIndex === 3) {
          undoContact(person);
        } else if (buttonIndex === 4) {
          deletePerson(person.id, navToFollowUp);
        }
      },
    );
  };

  const enableMoreInfo = () => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => personInfoActionSheet()}
          title="Settings"
          color="black"
          style={styles.moreInfoBtn}>
          {appearance === 'dark' && (
            <Icon name="dots-three-horizontal" size={20} color="white" />
          )}
          {appearance === 'light' && (
            <Icon name="dots-three-horizontal" size={20} color="black" />
          )}
        </TouchableOpacity>
      ),
    });
  };

  let neatStartDate = new Date(person.startDate);
  let neatNextDate = new Date(person.nextContactDate);

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

    return prettyTime;
  };

  let neatNextDateTime = generatePrettyNotificationTime(
    neatNextDate.getHours(),
    neatNextDate.getMinutes(),
  );

  const getTextStyle = () => {
    if (appearance === 'dark') {
      return styles.personInfoTextDark;
    } else {
      return styles.personInfoText;
    }
  };

  const getTextStyleDetails = () => {
    if (appearance === 'dark') {
      return styles.personInfoDetailsDark;
    } else {
      return styles.personInfoDetails;
    }
  };

  useEffect(() => {
    enableMoreInfo(); //Enables the "More Info" button on the right
  });

  return (
    <ScrollView
      style={[appearance === 'dark' ? styles.personInfoListViewDark : null]}>
      <EditPerson
        isVisible={isEditVisible}
        oldPerson={person}
        toggleEditVisible={toggleEditVisible}
        updatePerson={updatePerson}
        updatePushNotification={updatePushNotification}
      />
      <ManuallySchedule
        isVisible={isManuallyScheduleVisible}
        oldPerson={person}
        toggleManuallyScheduleVisible={toggleManuallyScheduleVisible}
        generatePrettyNotificationTime={generatePrettyNotificationTime}
        updatePerson={updatePerson}
        updatePushNotification={updatePushNotification}
      />
      {/* Header */}
      <View style={styles.personInfoHeaderView}>
        <Text style={styles.personInfoHeader}>{person.name}</Text>
      </View>

      {/* Start Date */}
      <View style={styles.personInfoView}>
        <Text style={getTextStyle()}>
          Start Date:{' '}
          <Text style={getTextStyleDetails()}>
            {neatStartDate.toDateString()}
          </Text>{' '}
        </Text>
      </View>

      {/* Location */}
      <View style={styles.personInfoView}>
        <Text style={getTextStyle()}>
          Location: <Text style={getTextStyleDetails()}>{person.location}</Text>{' '}
        </Text>
      </View>

      {/* Follow-Ups Completed*/}
      <View style={styles.personInfoView}>
        <Text style={getTextStyle()}>
          Contacts Completed:{' '}
          <Text style={getTextStyleDetails()}>{person.contactsCompleted}</Text>{' '}
        </Text>
      </View>

      {/* Next Contact Date*/}
      {!isComplete && (
        <View style={styles.personInfoView}>
          <Text style={getTextStyle()}>
            Next Contact:{' '}
            <Text
              style={getTextStyleDetails()}>{`${neatNextDate.toLocaleDateString()} @ ${neatNextDateTime}`}</Text>{' '}
          </Text>
        </View>
      )}

      {isComplete && (
        <View style={styles.personInfoView}>
          <Text style={getTextStyle()}>
            Next Contact: <Text style={getTextStyleDetails()}>{`Done!`}</Text>{' '}
          </Text>
        </View>
      )}

      {/* Notes*/}
      <View style={styles.personInfoView}>
        <Text style={getTextStyle()}>
          Notes: <Text style={getTextStyleDetails()}>{person.notes}</Text>{' '}
        </Text>
      </View>
    </ScrollView>
  );
};

export default PersonInfo;
