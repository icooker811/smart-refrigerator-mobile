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

var Header = require('../common/header');
import { SegmentedControls } from 'react-native-radio-buttons';

class ItemFormView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectingSectionKey: null,
      selectingRow: null,
    };
  }

  onBackPress() {
    this.props.navigator.popToTop();
    
  }

  onDonePress() {
    this.props.navigator.popToTop();
  }

  onNextPress() {
    this.props.navigator.pop();
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
