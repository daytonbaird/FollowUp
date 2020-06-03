//The page to create a person.

//Libraries
import React from 'react';
import {View, TouchableWithoutFeedback, Keyboard} from 'react-native';
import {Formik} from 'formik';
import PersonForm from '../PersonForm';

//Styling
import {styles} from '../../styles/global';

//Modules
const PersonCreator = ({route}) => {
  const {addPerson} = route.params;
  return <PersonForm addPerson={addPerson} />;
};

export default PersonCreator;
