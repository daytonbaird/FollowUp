//The page to create a person.

//Libraries
import React from 'react';
import {ScrollView, View, Text} from 'react-native';

//Styling
import {styles} from '../../styles/global';

//Modules

const EditPage = ({route}) => {
  const {person} = route.params;
  const {updatePerson} = route.params;

  return <ScrollView />;
};

//You were working on fixing the error: 'on SubmitForm() error: invalid null value for non-nullable primary key'
//I think this may be because the person in the scope of the form does not have a value for the id property or something like that.
// Might be best to ensure that all values get accounted for and that the form is only updating the forms.

export default EditPage;
