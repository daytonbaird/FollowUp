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
} from 'react-native';

//Styling
import {styles} from '../../styles/global';

//Modals
import EditPerson from '../modals/EditPerson';

//Modules
const PersonInfo = ({route, navigation}) => {
  const {person} = route.params;
  const {updatePerson} = route.params;
  const {deletePerson} = route.params;
  const {undoContact} = route.params;

  const [isEditVisible, setEditVisible] = useState(false);
  let isComplete = person.complete;

  const toggleEditVisible = () => {
    setEditVisible(previousState => !previousState);
  };

  const navToFollowUp = () => {
    navigation.navigate('Follow Up');
  };

  const personInfoActionSheet = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Cancel', 'Edit Person', 'Undo Contact', 'Delete Person'],
        cancelButtonIndex: 0,
        destructiveButtonIndex: 3,
      },
      buttonIndex => {
        if (buttonIndex === 1) {
          toggleEditVisible();
        } else if (buttonIndex === 2) {
          undoContact(person);
        } else if (buttonIndex === 3) {
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
          <Icon name="dots-three-horizontal" size={20} color="black" />
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

  useEffect(() => {
    enableMoreInfo(); //Enables the "More Info" button on the right
  });

  return (
    <ScrollView style={styles.listItemView}>
      <EditPerson
        isVisible={isEditVisible}
        oldPerson={person}
        toggleEditVisible={toggleEditVisible}
        updatePerson={updatePerson}
      />
      {/* Header */}
      <View style={styles.personInfoHeaderView}>
        <Text style={styles.personInfoHeader}>{person.name}</Text>
      </View>

      {/* Start Date */}
      <View style={styles.personInfoView}>
        <Text style={styles.personInfoText}>
          Start Date:{' '}
          <Text style={styles.personInfoDetails}>
            {neatStartDate.toDateString()}
          </Text>{' '}
        </Text>
      </View>

      {/* Location */}
      <View style={styles.personInfoView}>
        <Text style={styles.personInfoText}>
          Location:{' '}
          <Text style={styles.personInfoDetails}>{person.location}</Text>{' '}
        </Text>
      </View>

      {/* Follow-Ups Completed*/}
      <View style={styles.personInfoView}>
        <Text style={styles.personInfoText}>
          Contacts Completed:{' '}
          <Text style={styles.personInfoDetails}>
            {person.contactsCompleted}
          </Text>{' '}
        </Text>
      </View>

      {/* Next Contact Date*/}
      {!isComplete && (
        <View style={styles.personInfoView}>
          <Text style={styles.personInfoText}>
            Next Contact:{' '}
            <Text
              style={
                styles.personInfoDetails
              }>{`${neatNextDate.toLocaleDateString()} @ ${neatNextDateTime}`}</Text>{' '}
          </Text>
        </View>
      )}

      {isComplete && (
        <View style={styles.personInfoView}>
          <Text style={styles.personInfoText}>
            Next Contact:{' '}
            <Text style={styles.personInfoDetails}>{`Done!`}</Text>{' '}
          </Text>
        </View>
      )}

      {/* Notes*/}
      <View style={styles.personInfoView}>
        <Text style={styles.personInfoText}>
          Notes: <Text style={styles.personInfoDetails}>{person.notes}</Text>{' '}
        </Text>
      </View>
    </ScrollView>
  );
};

export default PersonInfo;
