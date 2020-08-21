import React, {useState} from 'react';
import {
  ScrollView,
  Text,
  View,
  Linking,
  Appearance,
  Settings,
} from 'react-native';

//Styling
import {styles} from '../../styles/global';

import WhatsNewModal from '../modals/WhatsNewModal';

const AboutPage = () => {
  let appearance = Appearance.getColorScheme();
  let version = Settings.get('version');

  const [isWhatsNewModalVisible, setIsWhatsNewModalVisible] = useState(false);
  const toggleWhatsNewModalVisible = () => {
    setIsWhatsNewModalVisible(previousState => !previousState);
  };

  const getTextStyle = () => {
    if (appearance === 'dark') {
      return styles.aboutTextDark;
    } else {
      return styles.aboutText;
    }
  };

  const prettyDisplayType = () => {
    if (appearance === 'dark') {
      return 'Dark Mode';
    } else {
      return 'Light Mode';
    }
  };
  return (
    <ScrollView
      style={[appearance === 'dark' ? styles.aboutViewDark : styles.aboutView]}>
      <View style={styles.aboutHeaderView}>
        <Text style={styles.aboutHeader}>About This App</Text>
      </View>
      <WhatsNewModal
        isVisible={isWhatsNewModalVisible}
        toggleWhatsNewModalVisible={toggleWhatsNewModalVisible}
      />

      <View style={styles.aboutSubHead}>
        <Text style={styles.aboutSubHeadText}>What does it do?</Text>
      </View>
      <View>
        <Text style={getTextStyle()}>
          FollowUp was made to make the hassle of managing follow-up calls,
          texts, or e-mails easier. Created with teachers, trainers, retailers,
          and salespeople in mind, FollowUp allows for a simple way to manage
          and prioritize daily forms of contact for those who need it.{' '}
        </Text>
      </View>
      <View style={styles.aboutSubHead}>
        <Text style={styles.aboutSubHeadText}>How do I use it?</Text>
      </View>
      <View>
        <Text style={getTextStyle()}>
          Using FollowUp is easy and effective. Simply create a person by
          tapping the 'Add a person' button. Fill out the forms applicable to
          your prospective person, and hit submit. FollowUp will automatically
          generate the next date and time for you to contact that person and
          will notify you when that time has come. Once you've called the
          person, simply swipe left on their name and FollowUp will
          automatically schedule the next approprate time to contact that
          person.
        </Text>
      </View>
      <View style={styles.aboutSubHead}>
        <Text style={styles.aboutSubHeadText}>Details</Text>
      </View>
      <View>
        <Text style={getTextStyle()}>
          Version: {version}{' '}
          <Text style={styles.aboutLink} onPress={toggleWhatsNewModalVisible}>
            (What's New?)
          </Text>
        </Text>
        <Text style={getTextStyle()}>
          Currently Displaying: {prettyDisplayType()}{' '}
        </Text>
        <Text style={getTextStyle()}>Created by Dayton Baird</Text>
        <Text
          style={styles.aboutLink}
          onPress={() => Linking.openURL('https://daytonbaird.com/')}>
          http://daytonbaird.com/
        </Text>
        <Text style={getTextStyle()}>Copyright 2020 © Dayton Baird</Text>
      </View>
    </ScrollView>
  );
};

export default AboutPage;
