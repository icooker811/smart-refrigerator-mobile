'use strict';

import React, { Component } from 'react';
import {
  AsyncStorage,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

var Header = require('../common/header');
var StyleSheet = require('StyleSheet');

class ProfileView extends Component {
  onPress() {
    var keys = ['Authorization'];
    AsyncStorage.multiRemove(keys, (err) => {});
    this.props.navigator.popToTop();
    this.props.navigator.resetTo({});
  }

  render() {
    return (
      <View>
          <Header
            title={this.props.title}
            style={styles.header}
          />
          <Text style={styles.title}>Who am I</Text>

          <TouchableHighlight style={styles.button} onPress={this.onPress.bind(this)} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>ออกจากระบบ</Text>
          </TouchableHighlight>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  header: {
    backgroundColor: '#47BFBF',
  }
});

module.exports = ProfileView;
