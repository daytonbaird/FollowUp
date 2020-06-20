import React, {useState, useEffect} from 'react';
import {View, Text, Button, TouchableOpacity, TextInput} from 'react-native';
import Modal from 'react-native-modal';

import DateTimePicker from '@react-native-community/datetimepicker';

//styles
import {styles} from '../../styles/global';

const EditPerson = ({
  isVisible,
  toggleEditVisible,
  oldPerson,
  updatePerson,
}) => {
  const oneMonthMs = 2592000000;

  let personCopy = JSON.parse(JSON.stringify(oldPerson));

  const [person, setPerson] = useState(personCopy);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(person.hireDate);
  let neatHireDate = new Date(person.hireDate).toLocaleDateString();

  const toggleDatePicker = () => {
    setShowDatePicker(previousState => !previousState);
  };

  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={0.3}
      onBackdropPress={() => toggleEditVisible()}>
      <View style={styles.defaultModalView}>
        <View style={styles.editPersonModalView}>
          <View style={styles.editPersonModalTitleView}>
            <Text style={styles.editText}>Name</Text>
          </View>

          <TextInput
            placeholder="Name"
            style={styles.dualEditTextInput}
            onChangeText={name => setPerson({...person, name: name})}
            value={person.name}
          />

          <View style={styles.editPersonModalTitleView}>
            <Text style={styles.editText}>Location</Text>
          </View>

          <TextInput
            placeholder="Location"
            style={styles.dualEditTextInput}
            onChangeText={location =>
              setPerson({...person, storeNum: location})
            }
            value={person.storeNum}
          />

          <View style={styles.editPersonModalTitleView}>
            <Text style={styles.editText}>Notes</Text>
          </View>

          <TextInput
            placeholder="Notes"
            multiline
            style={styles.dualEditTextInput}
            onChangeText={notes => setPerson({...person, notes: notes})}
            value={person.notes}
          />

          <View style={styles.editPersonRowView}>
            <Text style={styles.editText}>Hire Date</Text>
            <Text style={styles.editDisplayText}>{neatHireDate}</Text>
          </View>
          <View style={styles.personSmEditView}>
            <TouchableOpacity onPress={toggleDatePicker}>
              <Text style={styles.personEditBtnSm}>edit</Text>
            </TouchableOpacity>
          </View>
        </View>
        {showDatePicker && (
          <DateTimePicker
            value={new Date(date)}
            mode="date"
            is24Hour="true"
            maximumDate={Date.now() + oneMonthMs}
            onChange={(e, selectedDate) => {
              setDate(selectedDate);
              setPerson({...person, hireDate: selectedDate});
            }}
          />
        )}
        <Button
          title="Save"
          color="firebrick"
          onPress={() => {
            updatePerson(person);
            toggleEditVisible();
          }}
        />
      </View>
    </Modal>
  );
};

export default EditPerson;
