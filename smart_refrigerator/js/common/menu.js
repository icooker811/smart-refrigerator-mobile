import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  Dimensions
} from 'react-native';

var window = Dimensions.get('window');

class Menu extends Component {
  render() {
    return (
        <ScrollView scrollsToTop={false} style={styles.menu}>
          <View style={styles.avatarContainer}>
            <Image
              style={styles.avatar}/>
            <Text style={styles.name}>Your name</Text>
          </View>

          <Text
            onPress={() => this.props.onItemSelected('About')}
            style={styles.item}>
            About
          </Text>

          <Text
            onPress={() => this.props.onItemSelected('Contacts')}
            style={styles.item}>
            Contacts
          </Text>
        </ScrollView>
    );
  }
};

var styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    padding: 20,
  },
  avatarContainer: {
    marginBottom: 20,
    marginTop: 20,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    flex: 1,
  },
  name: {
    position: 'absolute',
    left: 70,
    top: 20,
  },
  item: {
    fontSize: 14,
    fontWeight: '300',
    paddingTop: 5,
  },
});

module.exports = Menu;
