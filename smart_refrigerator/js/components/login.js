'use strict';

import React, { Component } from 'react';
var t = require('tcomb-form-native');
var config = require('../config');

import {
  Alert,
  AsyncStorage,
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

  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  init() {
    var value = AsyncStorage.getItem('Authorization', (err, result) => {
      console.log(result);
      if (result !== null) {
        this.props.navigator.resetTo({
          home: true,
          user: value
        });
      }
    });
  }

  componentDidMount() {
    this.init();
    this.refs.form.getComponent('username').refs.input.focus();
  }

  login(username, password) {
    // console.log(username, password);
    console.log(this.state);

    var state = this.state;
    state.loading = true;
    this.setState(state);

    fetch(config.development.login_url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      })
    }).then((response) => response.json())
      .then((responseData) => {
        if (typeof(responseData.token) === 'undefined') {
          Alert.alert('ผิดพลาด', 'คุณกรอกชื่อผู้ใช้หรือรหัสผ่านผิดพลาด กรุณาลองใหม่อีกครั้ง', [{text: 'OK'}]);
          state.loading = false;
          this.setState(state);
          return;
        }

        AsyncStorage.setItem('Authorization', 'token ' + responseData.token, () => {
          this.props.navigator.resetTo({
            home: true,
            user: null
          });
        });

        state.loading = false;
        this.setState(state);
      })
      .catch((error) => {
        Alert.alert('ผิดพลาด', 'ไม่สามารถเข้าสู่ระบบได้ กรุณาลองใหม่อีกครั้ง', [{text: 'OK'}]);
        state.loading = false;
        this.setState(state);
      })
      .done();
  }

  onChange(value) {
      this.setState({value});
  }

  onPress() {
    dismissKeyboard();
    var value = this.refs.form.getValue();
    if (value !== null && value.username !== null && value.username !== '' &&
        value.password !== null && value.password !== '') {
          this.login(value.username, value.password);
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
            value={this.state.value}
            onChange={this.onChange.bind(this)}
          />
            { this.state.loading? (
                <View><Text style={styles.title}>รอสักครู่...</Text></View>) : (
                <TouchableHighlight style={styles.button} onPress={this.onPress.bind(this)} underlayColor='#99d9f4'>
                  <Text style={styles.buttonText}>เข้าสู่ระบบ</Text>
                </TouchableHighlight>)
            }
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
