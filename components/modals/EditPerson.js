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
  const [date, setDate] = useState(person.startDate);
  let neatStartDate = new Date(person.startDate).toLocaleDateString();

  const toggleDatePicker = () => {
    setShowDatePicker(previousState => !previousState);
  };

  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={0.3}
      onBackdropPress={() => toggleEditVisible()}>
      <View style={styles.editDefaultModalView}>
        <View style={styles.modalHeaderView}>
          <Text style={styles.modalHeader}>Edit Person</Text>
        </View>
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

          <View style={styles.editDateView}>
            <View style={styles.editPersonRowView}>
              <Text style={styles.editDateHeaderText}>Start Date</Text>
              <Text style={styles.editDateContent}>{neatStartDate}</Text>
            </View>
            <View style={styles.personSmEditView}>
              <TouchableOpacity onPress={toggleDatePicker}>
                <Text style={styles.personEditBtnSm}>edit</Text>
              </TouchableOpacity>
            </View>
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
              setPerson({...person, startDate: selectedDate});
            }}
          />
        )}

        <View style={styles.editPersonModalTitleView}>
          <Text style={styles.editText}>Location</Text>
        </View>

        <TextInput
          placeholder="Location"
          style={styles.dualEditTextInput}
          onChangeText={location => setPerson({...person, location: location})}
          value={person.location}
        />

        <View style={styles.editPersonModalTitleView}>
          <Text style={styles.editText}>Notes</Text>
        </View>

        <TextInput
          placeholder="Notes"
          // multiline
          style={styles.dualEditTextInput}
          onChangeText={notes => setPerson({...person, notes: notes})}
          value={person.notes}
        />

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
