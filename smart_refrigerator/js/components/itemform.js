'use strict';

import React, { Component } from 'react';
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');

import {
  AsyncStorage,
  Alert,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableHighlight,
} from 'react-native';

var Header = require('../common/header');
var config = require('../config');

import { SegmentedControls } from 'react-native-radio-buttons';

class ItemFormView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectingSectionKey: null,
      selectingRow: null,
    };
  }

  postData (goTo) {
    var value = AsyncStorage.getItem('Authorization', (err, result) => {
      if (result !== null) {
        let data = new FormData()
        data.append('refrigerator', 1)
        data.append('expire_next', this.state.selectedOption.replace('วัน', ''))
        data.append('image', {uri: this.props.data.path, name: 'image.jpg', type: 'image/jpg'})
        const params = {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data; boundary=6ff46e0b6b5148d984f148b6542e5a5d',
            'Authorization': result,
          },
          body: data,
        }
        return fetch(config.development.item_url, params)
          .then((response) => response.json())
          .then((responseData) => {
            if (goTo === 'Done') {
              this.props.navigator.popToTop();
              this.props.navigator.resetTo({
                home: true,
                user: null
              });
            } else {
              this.props.navigator.pop();
            }
          })
          .catch((error) => {})
          .done();
        }
    });
  }

  onBackPress() {
    this.props.navigator.pop();
  }

  onDonePress() {
    if (typeof(this.state.selectedOption) === 'undefined') {
      Alert.alert('จำเป็น', 'คุณยังไม่ได้กรอกเวลาหมดอายุ', [{text: 'OK'}]);
    } else {
      this.postData('Done');
    }
  }

  onNextPress() {
    if (typeof(this.state.selectedOption) === 'undefined') {
      Alert.alert('จำเป็น', 'คุณยังไม่ได้กรอกเวลาหมดอายุ', [{text: 'OK'}]);
    } else {
      this.postData('Next');
    }
  }

  setSelectedOption(selectedOption){
    this.setState({
      selectedOption
    });
  }

  renderOption(option, selected, onSelect, index){
    var style = selected ? { fontWeight: 'bold'} : {};

    return (
      <TouchableHighlight onPress={onSelect} key={index}>
        <Text style={style}>{option}</Text>
      </TouchableHighlight>
    );
  }

  renderContainer(optionNodes){
    return <View>{optionNodes}</View>;
  }

  render() {
    var options = [
      "1 วัน",
      "3 วัน",
      "5 วัน"
    ];
    return (
      <View style={styles.container}>
        <Header
          title={this.props.title}
          style={styles.header}
          leftItem={{
            title: 'Back',
            onPress: () => this.onBackPress(),
          }}
          rightItem={{
            title: 'Done',
            onPress: () => this.onDonePress(),
          }}
        />
        <Image source={{ uri: this.props.data.path }}
               style={styles.image}/>

         <SegmentedControls
           options={ options }
           onSelection={ this.setSelectedOption.bind(this) }
           selectedOption={this.state.selectedOption }
         />

        { this.state.selectedOption?
          <Text>แจ้งเตือนอีก: {this.state.selectedOption}ข้างหน้า</Text>: <Text></Text>
        }

        <TouchableHighlight style={styles.footer} onPress={this.onNextPress.bind(this)} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>เพิ่มของ</Text>
        </TouchableHighlight>

      </View>
    );
  }
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: 400,
    height: 400
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
  footer: {
    bottom: 0,
    backgroundColor: '#47BFBF',
  }
});

module.exports = ItemFormView;
