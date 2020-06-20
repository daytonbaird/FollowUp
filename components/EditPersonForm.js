import React, {useState} from 'react';
import {
  ScrollView,
  Text,
  Button,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  View,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import DateTimePicker from '@react-native-community/datetimepicker';

//Styling
import {styles} from '../styles/global';

const personSchema = yup.object({
  name: yup
    .string()
    .required()
    .min(2),
  storeNum: yup
    .number()
    .required()
    .min(1),
  hireDate: yup.date().required(),
  notes: yup.string(),
  callsCompleted: yup.number().required(),
});

const EditPersonForm = ({editPerson, updatePerson}) => {
  const person = editPerson;
  const [date, setDate] = useState(person.hireDate);
  const [show, setShow] = useState(false);

  const oneMonthMs = 2592000000;

  const showDatePicker = () => {
    if (!show) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  return (
    <Formik
      initialValues={{
        name: person.name,
        storeNum: person.storeNum,
        hireDate: person.hireDate,
        notes: person.notes,
        callsCompleted: person.callsCompleted + '',
      }}
      validationSchema={personSchema}
      onSubmit={(values, actions) => {
        actions.resetForm();
        updatePerson(values);
      }}>
      {formikProps => (
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          style={styles.pTouchable}>
          <ScrollView style={styles.pCreatorView}>
            {/* Header */}
            <View style={styles.pCreatorHeaderView}>
              <Text style={styles.pCreatorHeader}>Edit Person</Text>
            </View>

            {/* Name */}
            <TextInput
              style={styles.pCreatorInput}
              placeholder="Name*"
              onChangeText={formikProps.handleChange('name')}
              value={formikProps.values.name}
            />
            <Text style={styles.pErrorText}>
              {formikProps.touched.name && formikProps.errors.name}
            </Text>

            {/* Store Number */}
            <TextInput
              style={styles.pCreatorInput}
              placeholder="Store #*"
              onChangeText={formikProps.handleChange('storeNum')}
              value={formikProps.values.storeNum}
              keyboardType="number-pad"
            />
            <Text style={styles.pErrorText}>
              {formikProps.touched.storeNum && formikProps.errors.storeNum}
            </Text>

            {/* Calls Completed */}
            <TextInput
              style={styles.pCreatorInput}
              placeholder="Calls Completed*"
              onChangeText={formikProps.handleChange('callsCompleted')}
              value={formikProps.values.callsCompleted}
              keyboardType="number-pad"
            />
            <Text style={styles.pErrorText}>
              {formikProps.touched.storeNum && formikProps.errors.storeNum}
            </Text>

            {/* Notes */}
            <TextInput
              style={styles.pCreatorInput}
              placeholder="Notes"
              onChangeText={formikProps.handleChange('notes')}
              value={formikProps.values.notes}
            />
            <Text style={styles.pErrorText}>
              {formikProps.touched.notes && formikProps.errors.notes}
            </Text>

            {/* Hire Date Button */}
            <Button
              title="Select Hire Date"
              color="firebrick"
              onPress={showDatePicker}
            />

            {show && (
              <DateTimePicker
                value={date}
                mode="date"
                is24Hour="true"
                maximumDate={Date.now() + oneMonthMs}
                onChange={(e, selectedDate) => {
                  setDate(selectedDate);
                  formikProps.handleChange('hireDate');
                  formikProps.values.hireDate = selectedDate; //passed as an object. Need to convert to .getTime()
                }}
              />
            )}
            <Text style={styles.pErrorText}>
              {formikProps.touched.hireDate && formikProps.errors.hireDate}
            </Text>

            <Button
              title="Submit"
              color="firebrick" /* Will soon turn this into TouchableOpacity Btn */
              onPress={formikProps.handleSubmit}
            />
          </ScrollView>
        </TouchableWithoutFeedback>
      )}
    </Formik>
  );
};

export default EditPersonForm;
