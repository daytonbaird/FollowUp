//Libraries
import React from 'react';
import {View, Text, StatusBar} from 'react-native';

//Styling
import {styles} from '../styles/global';

//Header Component
//Idk why this is a class... should convert to functional component w/ hooks
class Header extends React.Component {
  render() {
    const {title} = this.props;
    return (
      <View style={styles.hdrView}>
        <Text style={styles.hdrText}>{title}</Text>
      </View>
    );
  }
}

Header.defaultProps = {
  title: 'Follow Up',
};

export default Header;
