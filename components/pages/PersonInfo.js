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
  const [isEditVisible, setEditVisible] = useState(false);

  const toggleEditVisible = () => {
    setEditVisible(previousState => !previousState);
  };

  const personInfoActionSheet = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Cancel', 'Edit Person', 'Undo Follow-Up', 'Delete Person'],
        cancelButtonIndex: 0,
        destructiveButtonIndex: 3,
      },
      buttonIndex => {
        if (buttonIndex === 1) {
          toggleEditVisible();
        } else if (buttonIndex === 2) {
          //Undo Follow-Up
        } else if (buttonIndex === 3) {
          //Delete
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

  let neatHireDate = new Date(person.hireDate);
  let neatNextDate = new Date(person.nextCallDate);

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

      {/* Hire Date */}
      <View style={styles.personInfoView}>
        <Text style={styles.personInfoText}>
          Hire Date:{' '}
          <Text style={styles.personInfoDetails}>
            {neatHireDate.toDateString()}
          </Text>{' '}
        </Text>
      </View>

      {/* Store Number */}
      <View style={styles.personInfoView}>
        <Text style={styles.personInfoText}>
          Store Number:{' '}
          <Text style={styles.personInfoDetails}>{person.storeNum}</Text>{' '}
        </Text>
      </View>

      {/* Calls Completed*/}
      <View style={styles.personInfoView}>
        <Text style={styles.personInfoText}>
          Calls Completed:{' '}
          <Text style={styles.personInfoDetails}>{person.callsCompleted}</Text>{' '}
        </Text>
      </View>

      {/* Next Call Date*/}
      <View style={styles.personInfoView}>
        <Text style={styles.personInfoText}>
          Next Call:{' '}
          <Text
            style={
              styles.personInfoDetails
            }>{`${neatNextDate.toLocaleDateString()} @ ${neatNextDateTime}`}</Text>{' '}
        </Text>
      </View>

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
