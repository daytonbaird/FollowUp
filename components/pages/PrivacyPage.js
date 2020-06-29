import React from 'react';
import {ScrollView, View, Text, Linking} from 'react-native';

import {styles} from '../../styles/global';

const PrivacyPage = () => {
  return (
    <View style={styles.scrollViewBox}>
      <ScrollView style={styles.aboutView}>
        <View style={styles.aboutHeaderView}>
          <Text style={styles.aboutHeader}>Privacy Policy</Text>
        </View>

        <View style={styles.aboutSubHead}>
          <Text style={styles.aboutSubHeadText}>What is this?</Text>
        </View>
        <View>
          <Text style={styles.aboutText}>
            This serves as a mere summary outlining some of the aspects of the
            Privacy Policy agreement set forth by FollowUp and FollowUp's users
            and is in no way a substitution for the full document, accessible{' '}
            <Text
              style={styles.aboutLink}
              onPress={() =>
                Linking.openURL('https://followupapp.io/privacypolicy.html')
              }>
              here
            </Text>
            . By using this app you agree to these terms.
          </Text>
        </View>
        <View style={styles.aboutSubHead}>
          <Text style={styles.aboutSubHeadText}>
            What kind of data does FollowUp store?
          </Text>
        </View>
        <View>
          <Text style={styles.aboutText}>
            You'll be happy to know that FollowUp stores all user-entered data
            locally on the device of the user, with no cloud storage of any
            kind.
          </Text>
        </View>
        <View style={styles.aboutSubHead}>
          <Text style={styles.aboutSubHeadText}>
            What information do you collect?
          </Text>
        </View>
        <View>
          <Text style={styles.aboutText}>
            We do not store any information other than what is provided by Apple
            when users download and install our app. The app connects to no
            remote servers for any purpose and is fully functional offline. The
            app performs no "phoning-home", analytics collecting, or any remote
            network interfacing aside from the reasonable accomodations required
            per Apple's App Store Requirements.
          </Text>
        </View>
        <View style={styles.aboutSubHead}>
          <Text style={styles.aboutSubHeadText}>
            Who Can I Contact for Questions?
          </Text>
        </View>
        <View>
          <Text style={styles.aboutText}>
            You can visit our{' '}
            <Text
              style={styles.aboutLink}
              onPress={() => Linking.openURL('https://followupapp.io/')}>
              website
            </Text>{' '}
            directly, or send an e-mail to support@followupapp.io if you have
            any questions.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default PrivacyPage;
