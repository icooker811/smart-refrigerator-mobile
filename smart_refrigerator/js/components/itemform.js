'use strict';

import React, { Component } from 'react';
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');

import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableHighlight,
} from 'react-native';

class ItemFormView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectingSectionKey: null,
      selectingRow: null,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={{uri: this.props.data.path}}
               style={{width: 400, height: 400}}/>
      </View>
    );
  }
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

module.exports = ItemFormView;
