import React, { Component } from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  Dimensions
} from 'react-native';


var window = Dimensions.get('window');

var TimeAgo = require('react-native-timeago');
var moment = require('moment');
require('moment/locale/th');
moment.locale('th');

class ItemView extends Component {
  rowCancelPressed(data) {
    this.props.rowCancelPressed(data);
  }

  rowActionPressed(data) {
    this.props.rowActionPressed(data);
  }

  render() {
    var rowData = this.props.rowData;
    return (
      <View style={styles.item}>
        <TouchableHighlight onPress={() => this.rowActionPressed(rowData)}>
          <View>
            <View style={styles.rowContainer}>
              <Image
                style={styles.thumbnail}
                source={{uri: rowData.image}}
              />
            </View>
            <TimeAgo time={rowData.expire_at} style={{ margin: 5, marginBottom: 10, color: '#FB9014'}} />
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this.rowCancelPressed(rowData)} style={{ position: 'absolute', top: 10, right: 10 }} >
          {this.props.cancelText === 'กินแล้ว'?
          <Image source={require('../assets/ic_check.png')} />:
          <Image source={require('../assets/ic_request.png')} />}
        </TouchableHighlight>
      </View>
    );
  }
};

var styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  title: {
    fontSize: 20,
    color: '#656565'
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  content: {
    flex: 1,
  },
  header: {
    backgroundColor: '#47BFBF',
  },
  thumbnail: {
    width: 200,
    height: 200,
  },
  item: {
    width: (window.width / 2),
    position: 'relative',
  },
  cancelText: {
    right: 0,
    position: 'absolute'
  }
});

module.exports = ItemView;
