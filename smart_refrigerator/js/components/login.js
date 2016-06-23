'use strict';

import React, { Component } from 'react';
var t = require('tcomb-form-native');
import {
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

var Header = require('../common/header');
var dismissKeyboard = require('react-native-dismiss-keyboard');

var StyleSheet = require('StyleSheet');
var Form = t.form.Form;

var User = t.struct({
  username: t.String,
  password: t.String
});

var options = {
  fields: {
    password: {
      secureTextEntry: true
    }
  }
}; // optional rendering options (see documentation)

class LoginFormView extends Component {

  componentDidMount() {
      this.refs.form.getComponent('username').refs.input.focus();
  }

  onPress() {
    dismissKeyboard()
    var value = this.refs.form.getValue();
    if (value !== null && value.username !== null && value.username !== '' &&
        value.password !== null && value.password !== '') {

      // this.props.navigator.pop();
      this.props.navigator.resetTo({
        home: true,
        user: value
      });

    }
  }

  render() {
    return (
      <View>
        <View style={styles.container}>
          <Form
            ref="form"
            type={User}
            options={options}
          />
          <TouchableHighlight style={styles.button} onPress={this.onPress.bind(this)} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableHighlight>
        </View>
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
    backgroundColor: '#999999',
    height: 60
  }
});

module.exports = LoginFormView;
