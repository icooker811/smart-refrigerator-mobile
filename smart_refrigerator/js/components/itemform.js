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
  Dimension,
} from 'react-native';

var Header = require('../common/header');
var config = require('../config');
var window = Dimensions.get('window');

import { SegmentedControls } from 'react-native-radio-buttons';

var PushNotification = require('react-native-push-notification');

class ItemFormView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectingSectionKey: null,
      selectingRow: null,
      loading: false,
    };
  }

  postData (goTo) {
    this.setState({loading: true});
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
            this.setState({loading: false});
          })
          .catch((error) => {
            this.setState({loading: false});
          })
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

        <View style={{marginTop: 10, backgroundColor: '#EBEBEB'}}>
         <SegmentedControls
           options={ options }
           onSelection={ this.setSelectedOption.bind(this) }
           selectedOption={this.state.selectedOption }
         />
        </View>


        { this.state.selectedOption?
          <Text style={styles.textNoti}>แจ้งเตือนอีก: {this.state.selectedOption}ข้างหน้า</Text>: <Text></Text>
        }

        { !this.state.loading? (
          <View style={styles.btnWrapper} >
            <TouchableHighlight style={styles.footer} onPress={this.onNextPress.bind(this)} underlayColor='#99d9f4'>
              <Image source={require('../assets/ic_capture.png')} />
            </TouchableHighlight>
          </View>
          ): <Text>รอสักครู่</Text>
        }

      </View>
    );
  }
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  image: {
    width: window.width,
    height: 410,
  },
  btnWrapper: {
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
  },
  textNoti: {
    marginTop: 30,
  },
  button: { 
    backgroundColor: '#fff',
    borderRadius: 8,
    alignSelf: 'center'
  },
  header: {
    backgroundColor: '#fff',
    width: window.width,
  },
  footer: {
    bottom: 0,
    borderColor: '#ccc',
    borderTopWidth: 1,
    paddingVertical: 10,
    width: window.width,
    alignItems: 'center'
  }
});

module.exports = ItemFormView;
