'use strict';

import React, { Component } from 'react';
import {
  AsyncStorage,
  Text,
  View,
  Image,
  TouchableHighlight,
} from 'react-native';

var Header = require('../common/header');
var StyleSheet = require('StyleSheet');
var config = require('../config');

class ProfileView extends Component {

  constructor(props) {
    super(props);;
    this.state = {
      display_name: '',
      avatar_url: '',
    };
  }

  init() {
    var value = AsyncStorage.getItem('Authorization', (err, result) => {
      if (result !== null) {
        console.log(result)

        fetch(config.development.profile_url, {
          method: 'GET',
          headers: {
            'Authorization': result,
          }
        }).then((response) => response.json())
          .then((responseData) => {
            console.log(responseData)
            this.setState({
              display_name: responseData.display_name,
              avatar_url: responseData.avatar_url
            });
          })
          .catch((error) => {})
          .done();
      }
    });
  }

  componentDidMount() {
    this.init();
  }

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
          {this.state.avatar_url?
            <Image
              style={styles.thumbnail}
              source={{uri: this.state.avatar_url}}
            />
          : <View></View>}
          <Text style={styles.title}>{this.state.display_name}</Text>
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
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
});

module.exports = ProfileView;
