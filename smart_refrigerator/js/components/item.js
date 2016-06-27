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
      <View>
        <TouchableHighlight onPress={() => this.rowCancelPressed(rowData)}
                            underlayColor='#dddddd'>
          <View>
            <Text style={styles.cancelText}>
              {this.props.cancelText}
            </Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this.rowActionPressed(rowData)}
                            underlayColor='#dddddd' style={styles.item}>
          <View>
            <View style={styles.rowContainer}>
              <Image
                style={styles.thumbnail}
                source={{uri: rowData.image}}
              />
            </View>
            <Text style={styles.text}>
              {rowData.created_by.display_name}
            </Text>
            <TimeAgo time={rowData.expire_at} />
          </View>
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
    padding: 10
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
    width: 120,
    height: 120,
  },
  item: {
    flexDirection: 'row',
    margin: 10,
    width: (window.width / 2) - 30
  },
  cancelText: {
    right: 0
  }
});

module.exports = ItemView;
