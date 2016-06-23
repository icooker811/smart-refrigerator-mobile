/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS
} from 'react-native';

var Dashboard = require('../smart_refrigerator/js/dashboard');
var SplashScreen = require('@remobile/react-native-splashscreen');

class smartRefrigerator extends Component {
  componentDidMount() {
        SplashScreen.hide();
  }

  render() {
    return (
      <Dashboard />
    );
  }
}

AppRegistry.registerComponent('smart_refrigerator', () => smartRefrigerator);
