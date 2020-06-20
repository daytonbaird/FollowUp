//Libraries
import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

//Styling
import {styles} from '../styles/global';

//Dates
import moment from 'moment';
moment().format();

const LeftActions = ({progress, dragX}) => {
  return (
    <View style={styles.swLeft}>
      <Text style={styles.swLeftText}>Followed up!</Text>
    </View>
  );
};
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
}) => {
  const [due, setDue] = useState(false);
  const [soon, setSoon] = useState(false);

  const prettyCallDate = person => {
    let now = moment();
    let nextCall = moment(person.nextCallDate);
    let complete = person.complete;
    let duration = moment.duration(nextCall.diff(now));
    let days = Math.round(duration.asDays());
    let weeks = Math.round(duration.asWeeks());

    let nextCallPretty = nextCall.format('MMM Do');

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
      return `${nextCallPretty}`;
    }
  };

  const pickCompleteStyle = person => {
    if (person.complete) {
      return styles.pListTextComplete;
    } else {
      return styles.pListText;
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
      renderLeftActions={LeftActions}
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
          })
        }
        style={styles.pListItem}>
        <View style={styles.pListItemView}>
          <Text style={pickCompleteStyle(person)}>{person.name}</Text>
          <Text style={pickStyle()}>{prettyCallDate(person)}</Text>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

export default ListPerson;
