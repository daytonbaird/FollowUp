//Libraries
import React from 'react';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  //Add Person Form
  pCreatorView: {
    padding: 15,
  },
  pCreatorInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    fontSize: 18,
    borderRadius: 6,
  },
  pErrorText: {
    color: 'crimson',
    fontSize: 18,
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
  detailsText: {
    fontSize: 18,
    padding: 15,
    fontWeight: 'bold',
    borderWidth: 0.5,
  },

  detailsTextContents: {
    fontSize: 18,
    padding: 10,
    color: 'firebrick',
  },

  //Add Person Button Component
  apBtn: {
    backgroundColor: '#b22222',
    padding: 20,
    justifyContent: 'flex-end',
    marginBottom: 36, //offset from bottom
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
    height: 65,
    padding: 15,
    backgroundColor: 'firebrick',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  hdrText: {
    color: '#fff',
    fontSize: 27,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  hdrSubText: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
    padding: 5,
  },

  //FlatList Items
  pListItemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pListItem: {
    padding: 15,
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
    padding: 15,
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
    padding: 15,
    fontSize: 16,
  },

  //More Info Button
  moreInfoBtn: {
    color: 'black',
    paddingRight: 10,
    alignContent: 'center',
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

  //Models
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
});
