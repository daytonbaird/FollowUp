//Libraries
import React from 'react';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  //Add Person Form
  pCreatorView: {
    padding: '7%',
  },
  pCreatorViewDark: {
    padding: '7%',
    backgroundColor: '#060606',
  },
  pCreatorInput: {
    borderWidth: 2,
    borderColor: '#ddd',
    padding: '3.8%',
    fontSize: 20,
    borderRadius: 6,
  },
  pCreatorDateInput: {
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: '3.8%',
    fontSize: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pCreatorDateText: {
    fontSize: 20,
    color: 'darkgray',
  },
  pCreatorDateTextDark: {
    fontSize: 20,
    color: '#5f5f62',
  },
  pCreatorDateContent: {
    fontSize: 20,
  },
  pCreatorDateContentDark: {
    fontSize: 20,
    color: '#fff',
  },
  pCreatorDateBtnSm: {
    color: 'firebrick',
    fontSize: 16,
    paddingBottom: '1%',
    alignContent: 'flex-end',
  },
  pErrorText: {
    color: 'firebrick',
    fontSize: 16,
    paddingLeft: '3.8%',
    paddingTop: '1%',
    paddingBottom: '1%',
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
    width: '65%',
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
  pListItemDark: {
    padding: '3.5%',
    backgroundColor: '#060606',
    borderBottomWidth: 1,
    borderBottomColor: '#111111',
  },
  pListText: {
    fontSize: 20,
    flexDirection: 'row',
  },
  pListTextDark: {
    fontSize: 20,
    flexDirection: 'row',
    color: '#fff',
  },
  pListTextComplete: {
    fontSize: 20,
    flexDirection: 'row',
    color: 'gray',
  },
  pListTextCompleteDark: {
    fontSize: 20,
    flexDirection: 'row',
    color: '#7F7F7F',
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
  appViewContainerDark: {
    flex: 1,
    backgroundColor: '#060606',
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

  //Scroll Views
  scrollViewBox: {
    height: '95%',
  },

  apScrollViewBox: {
    height: '90%',
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
  settingsScrollViewDark: {
    backgroundColor: '#060606',
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
  settingsDisplayTextDark: {
    fontSize: 20,
    color: '#fff',
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
  editDefaultModalView: {
    backgroundColor: 'white',
    padding: '5%',
    justifyContent: 'center',
    borderRadius: 15,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  editText: {
    fontSize: 20,
    color: 'firebrick',
    paddingTop: '2%',
  },
  editDateView: {
    paddingTop: '2%',
  },
  editDateHeaderText: {
    fontSize: 20,
    color: 'firebrick',
  },
  editDateContent: {
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
  numContactsModalView: {
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
  modalHeaderView: {
    alignItems: 'center',
  },
  modalHeader: {
    fontSize: 20,
    color: 'firebrick',
  },
});
