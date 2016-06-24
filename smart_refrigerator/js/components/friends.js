import React, { Component } from 'react';
var SQLite = require('react-native-sqlite-storage');
import {
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  RecyclerViewBackedScrollView,
  ListView
} from 'react-native';

var Header = require('../common/header');
var SGListView = require('react-native-sglistview');
var config = require('../config');

var Item = require('../components/item');

class FriendListContainerView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      dataSize: 0,
      dataSource: null
    };
  }

  init() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var value = AsyncStorage.getItem('Authorization', (err, result) => {
      if (result !== null) {
        console.log(result)

        fetch(config.development.friend_url, {
          method: 'GET',
          headers: {
            'Authorization': result,
          }
        }).then((response) => response.json())
          .then((responseData) => {
            var items = [];
            responseData.forEach(function(item) {
              items.push(item);
            });

            this.setState({
              dataSize: items.length,
              dataSource: ds.cloneWithRows(items),
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

  rowPressed(data) {

  }

  renderRow(rowData, sectionID, rowID) {
    return (
      <Item rowData={rowData} rowPressed={this.rowPressed()}/>
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

module.exports = FriendListContainerView;
