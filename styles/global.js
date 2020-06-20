//Libraries
import React from 'react';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  //Add Person Form
  pCreatorView: {
    padding: '3.5%',
  },
  pCreatorInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: '3.8%',
    fontSize: 20,
    borderRadius: 6,
  },
  pErrorText: {
    color: 'crimson',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 5,
    textAlign: 'center',
  },
  pCreatorHeader: {
    paddingTop: '5%',
    paddingBottom: '5%',
    fontWeight: 'bold',
    fontSize: 25,
    color: 'firebrick',
  },
  pCreatorHeaderView: {
    alignItems: 'center',
  },

  //Person Data
  personInfoHeaderView: {
    padding: '5%',
    alignItems: 'center',
  },
  personInfoDisplay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  personInfoHeader: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'firebrick',
  },
  personInfoView: {
    paddingBottom: '5%',
    paddingLeft: '10%',
    paddingRight: '10%',
  },
  personInfoText: {
    fontSize: 20,
  },
  personInfoDetails: {
    color: 'firebrick',
    fontSize: 20,
  },
  personEditBtn: {
    color: 'firebrick',
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  personEditView: {
    alignItems: 'flex-end',
  },
  personEditBtnSm: {
    color: 'firebrick',
    alignContent: 'flex-end',
  },
  personSmEditView: {
    alignItems: 'flex-end',
  },

  //Add Person Button Component
  apBtn: {
    backgroundColor: '#b22222',
    padding: '5%',
    justifyContent: 'flex-end',
    marginBottom: '10%', //offset from bottom
    borderRadius: 50, //rounding for button
    width: 300,
  },
  apText: {
    color: '#fff',
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  apView: {
    alignItems: 'center', //center button
  },
  apList: {
    flex: 1,
    flexDirection: 'column',
  },

  //Header
  hdrView: {
    height: '8%',
    backgroundColor: 'firebrick',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  hdrText: {
    color: '#fff',
    fontSize: 28,
    textAlign: 'center',
    fontWeight: 'bold',
  },

  //FlatList Items
  pListItemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pListItem: {
    padding: '3.5%',
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  pListText: {
    fontSize: 20,
    flexDirection: 'row',
  },
  pListTextComplete: {
    fontSize: 20,
    flexDirection: 'row',
    color: 'gray',
  },
  pListDate: {
    fontSize: 20,
    color: 'gray',
    flexDirection: 'row',
  },
  pListDateSoon: {
    fontSize: 20,
    color: 'firebrick',
    flexDirection: 'row',
  },
  pListDateDue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'firebrick',
    flexDirection: 'row',
  },

  //App View
  appViewContainer: {
    flex: 1,
  },

  //Swipeable
  swLeft: {
    backgroundColor: '#0083F5',
    justifyContent: 'center',
    flex: 1,
  },
  swLeftText: {
    fontWeight: 'bold',
    color: '#fff',
    padding: '3.5%',
    fontSize: 18,
  },
  swRight: {
    backgroundColor: '#dd2c00',
    justifyContent: 'center',
    flex: 1,
    alignItems: 'flex-end',
  },
  swRightText: {
    color: '#fff',
    padding: '3.5%',
    fontSize: 16,
  },

  //More Info Button
  moreInfoBtn: {
    color: 'black',
    paddingRight: 10,
    alignContent: 'center',
  },

  //About Page
  aboutView: {
    paddingBottom: '5%',
    paddingLeft: '10%',
    paddingRight: '10%',
  },
  aboutHeaderView: {
    padding: '5%',
    alignItems: 'center',
  },
  aboutHeader: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'firebrick',
  },
  aboutSubHead: {
    paddingTop: '4%',
    paddingBottom: '2%',
  },
  aboutSubHeadText: {
    fontSize: 24,
    color: 'firebrick',
  },
  aboutText: {
    fontSize: 16,
  },
  aboutLink: {
    fontSize: 16,
    color: 'firebrick',
  },

  //Settings Styling
  settingsView: {
    paddingBottom: '5%',
    paddingLeft: '10%',
    paddingRight: '10%',
  },
  settingsDisplay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  settingsHeaderView: {
    padding: '5%',
    alignItems: 'center',
  },
  settingsHeader: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'firebrick',
  },
  settingsBtn: {
    color: 'firebrick',
  },
  settingsEditView: {
    alignItems: 'flex-end',
  },
  settingsDisplayText: {
    fontSize: 20,
  },

  //Modals
  defaultModalView: {
    backgroundColor: 'white',
    padding: '5%',
    justifyContent: 'center',
    borderRadius: 15,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  defaultModalText: {
    fontSize: 20,
  },
  dualPickerModalView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dualEditModalView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editText: {
    fontSize: 20,
    color: 'firebrick',
  },
  editDisplayText: {
    fontSize: 20,
  },
  dualEditTextInput: {
    padding: '3%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    fontSize: 20,
    width: '100%',
  },
  dualPicker: {
    width: '30%',
  },
  dualModalTextInput: {
    padding: '5%',
    fontSize: 20,
  },
  numCallsModalView: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  editPersonModalView: {
    // alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  editPersonRowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
