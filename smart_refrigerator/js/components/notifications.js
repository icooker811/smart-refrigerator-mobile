import React, { Component } from 'react';
var SQLite = require('react-native-sqlite-storage');
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  RecyclerViewBackedScrollView,
  ListView
} from 'react-native';

var Header = require('../common/header');
var SGListView = require('react-native-sglistview');

class NotificationListContainerView extends Component {

  errorCB(err) {
    console.log("SQL Error: " + err);
  }

  successCB() {
    console.log("SQL executed fine");
  }

  openCB() {
    console.log("Database OPENED");
  }

  constructor(props) {
    super(props);
    var self = this;
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      loading: false,
      dataSize: 0,
      dataSource: ds.cloneWithRows([])
    };
  }

  rowPressed(data) {

  }

  renderRow(rowData, sectionID, rowID) {
    return (
      <TouchableHighlight onPress={() => this.rowPressed(rowData)}
                          underlayColor='#dddddd'>
        <View>
          <View style={styles.rowContainer}>
            <Text style={styles.text}>
              {rowData}
            </Text>
          </View>
          <View style={styles.separator}/>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <View style={styles.content}>
        <Header
          title={this.props.title}
          style={styles.header}
        />
        {this.state.loading? (
          <View style={styles.container}>
            <Text style={styles.title}>รอสักครู่</Text>
          </View>
        ): ( <View>{ this.state.dataSize === 0?
                    <View><Text style={styles.title}>ไม่พบรายการ</Text></View>: (
                    <SGListView dataSource={this.state.dataSource}
                       renderRow={this.renderRow.bind(this)}
                       automaticallyAdjustContentInsets={true} />)}</View>)
        }</View>);
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
  }
});

module.exports = NotificationListContainerView;
