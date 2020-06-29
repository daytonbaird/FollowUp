//Libraries
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Appearance} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

//Styling
import {styles} from '../styles/global';

//Dates
import moment from 'moment';
moment().format();

//Actions performed on the leftward swipe of a person.
const LeftActions = ({progress, dragX, complete}) => {
  if (!complete) {
    //If the person is done being contacted
    return (
      <View style={styles.swLeft}>
        <Text style={styles.swLeftText}>Followed-Up!</Text>
      </View>
    );
  } else {
    return <View />;
  }
};

//Actions performed on the rightward swipe of a person.
const RightActions = ({progress, dragX, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.swRight}>
        <Text style={styles.swRightText}>Delete</Text>
      </View>
    </TouchableOpacity>
  );
};

const ListPerson = ({
  person,
  navigation,
  onSwipeFromLeft,
  onRightPress,
  updatePerson,
  deletePerson,
  undoContact,
}) => {
  const [due, setDue] = useState(false);
  const [soon, setSoon] = useState(false);
  let appearance = Appearance.getColorScheme();

  const prettyContactDate = person => {
    let now = moment();
    let nextContact = moment(person.nextContactDate);
    let complete = person.complete;
    let duration = moment.duration(nextContact.diff(now));
    let days = Math.round(duration.asDays());
    let weeks = Math.round(duration.asWeeks());

    let nextContactPretty = nextContact.format('MMM Do');

    if (complete) {
      if (due) {
        setDue(false);
      }
      return `Done!`;
    }
    if (days < 0) {
      if (!due) {
        setDue(true);
      }
      return `${days}d`;
    }
    if (days < 1) {
      if (!due) {
        setDue(true);
      }
      return 'Today';
    }
    if (days < 2) {
      if (!soon) {
        setSoon(true);
      }
      return 'Tomorrow';
    }
    if (days <= 7) {
      if (!soon) {
        setSoon(true);
      }
      return `${days}d`;
    }
    if (weeks < 4) {
      if (soon) {
        setSoon(false);
      }
      if (due) {
        setDue(false);
      }
      return `${weeks}w`;
    } else {
      return `${nextContactPretty}`;
    }
  };

  const pickCompleteStyle = person => {
    if (appearance === 'dark') {
      if (person.complete) {
        return styles.pListTextCompleteDark;
      } else {
        return styles.pListTextDark;
      }
    } else {
      if (person.complete) {
        return styles.pListTextComplete;
      } else {
        return styles.pListText;
      }
    }
  };

  const pickStyle = () => {
    if (due) {
      return styles.pListDateDue;
    }
    if (soon) {
      return styles.pListDateSoon;
    } else {
      return styles.pListDate;
    }
  };

  return (
    <Swipeable
      renderLeftActions={(progress, dragX) => (
        <LeftActions
          progress={progress}
          dragX={dragX}
          complete={person.complete}
        />
      )}
      onSwipeableLeftOpen={onSwipeFromLeft}
      person={person}
      renderRightActions={(progress, dragX) => (
        <RightActions
          progress={progress}
          dragX={dragX}
          onPress={onRightPress}
        />
      )}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Person Info', {
            person: person,
            updatePerson: updatePerson,
            deletePerson: deletePerson,
            undoContact: undoContact,
          })
        }
        style={[
          appearance === 'dark' ? styles.pListItemDark : styles.pListItem,
        ]}>
        <View style={styles.pListItemView}>
          <Text style={pickCompleteStyle(person)}>{person.name}</Text>
          <Text style={pickStyle()}>{prettyContactDate(person)}</Text>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

export default ListPerson;
