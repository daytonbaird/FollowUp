import React, {useState} from 'react';
import {
  ScrollView,
  Text,
  Button,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  View,
  KeyboardAvoidingView,
  Platform,
  Appearance,
} from 'react-native';
import {Formik, ErrorMessage} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import * as yup from 'yup';
import DateTimePicker from '@react-native-community/datetimepicker';

//Styling
import {styles} from '../styles/global';

const personSchema = yup.object({
  name: yup
    .string()
    .required('Required')
    .min(2, 'Name is too short'),
  location: yup.string().min(1, 'Too short'),
  startDate: yup.date().required('Required'),
  notes: yup.string(),
});

const PersonForm = ({addPerson}) => {
  const oneMonthMs = 2592000000;
  let appearance = Appearance.getColorScheme();

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const showDatePicker = () => {
    if (!show) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  return (
    <Formik
      initialValues={{name: '', location: '', startDate: date, notes: ''}}
      validationSchema={personSchema}
      onSubmit={(values, actions) => {
        actions.resetForm();
        addPerson(values);
      }}>
      {formikProps => (
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          style={styles.pTouchable}>
          <KeyboardAwareScrollView
            style={[
              styles.apScrollViewBox,
              appearance === 'dark'
                ? styles.pCreatorViewDark
                : styles.pCreatorView,
            ]}>
            <View style={styles.pCreatorHeaderView}>
              <Text style={styles.pCreatorHeader}>Add a Person</Text>
            </View>
            <TextInput
              style={styles.pCreatorInput}
              placeholder="Name*"
              autoCapitalize="words"
              onChangeText={formikProps.handleChange('name')}
              value={formikProps.values.name}
            />
            <Text style={styles.pErrorText}>
              {formikProps.touched.name && formikProps.errors.name}
            </Text>

            <View style={styles.pCreatorDateInput}>
              <Text
                style={[
                  appearance === 'dark'
                    ? styles.pCreatorDateTextDark
                    : styles.pCreatorDateText,
                ]}>
                Start Date
              </Text>
              <Text
                style={[
                  appearance === 'dark'
                    ? styles.pCreatorDateContentDark
                    : styles.pCreatorDateContent,
                ]}>
                {date.toLocaleDateString()}
              </Text>
            </View>
            <View style={styles.personSmEditView}>
              <TouchableOpacity onPress={showDatePicker}>
                <Text style={styles.pCreatorDateBtnSm}>edit</Text>
              </TouchableOpacity>
            </View>

            {show && (
              <DateTimePicker
                value={date}
                mode="date"
                is24Hour="true"
                maximumDate={Date.now() + oneMonthMs}
                onChange={(e, selectedDate) => {
                  setDate(selectedDate);
                  formikProps.handleChange('startDate');
                  formikProps.values.startDate = selectedDate; //passed as an object. Need to convert to .getTime()
                }}
              />
            )}

            <TextInput
              style={styles.pCreatorInput}
              placeholder="Location"
              autoCapitalize="words"
              onChangeText={formikProps.handleChange('location')}
              value={formikProps.values.location}
            />
            <Text style={styles.pErrorText}>
              {formikProps.touched.location && formikProps.errors.location}
            </Text>

            <TextInput
              style={styles.pCreatorInput}
              placeholder="Notes"
              onChangeText={formikProps.handleChange('notes')}
              value={formikProps.values.notes}
            />
            <Text style={styles.pErrorText}>
              {formikProps.touched.notes && formikProps.errors.notes}
            </Text>

            <Button
              title="Submit"
              color="firebrick" /* Will soon turn this into TouchableOpacity Btn */
              onPress={formikProps.handleSubmit}
            />
          </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>
      )}
    </Formik>
  );
};

export default PersonForm;
