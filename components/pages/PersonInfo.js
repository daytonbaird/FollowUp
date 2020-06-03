//The page to view information on a Person

//Libraries
import React from 'react';
import {View, Text} from 'react-native';

//Styling
import {styles} from '../../styles/global';

//Modules
const PersonInfo = ({route}) => {
  const {person} = route.params;
  let neatHireDate = new Date(person.hireDate);
  let neatNextDate = new Date(person.nextCallDate);

  return (
    <View style={styles.listItemView}>
      <Text style={styles.detailsText}>
        Name: <Text style={styles.detailsTextContents}>{person.name}</Text>
      </Text>

      <Text style={styles.detailsText}>
        Hire Date:{' '}
        <Text style={styles.detailsTextContents}>
          {neatHireDate.toDateString()}
        </Text>
      </Text>

      <Text style={styles.detailsText}>
        Store Number:{' '}
        <Text style={styles.detailsTextContents}>#{person.storeNum}</Text>
      </Text>

      <Text style={styles.detailsText}>
        Calls Completed:{' '}
        <Text style={styles.detailsTextContents}>{person.callsCompleted}</Text>
      </Text>

      <Text style={styles.detailsText}>
        Next Call:{' '}
        <Text style={styles.detailsTextContents}>
          {`${neatNextDate.toDateString()} @ ${neatNextDate.toLocaleTimeString()}`}
        </Text>
      </Text>

      <Text style={styles.detailsText}>
        Notes: <Text style={styles.detailsTextContents}>{person.notes}</Text>
      </Text>
    </View>
  );
};

export default PersonInfo;
