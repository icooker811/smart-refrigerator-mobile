import React, { Component } from 'react';
var SQLite = require('react-native-sqlite-storage');
import {
  AsyncStorage,
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  RecyclerViewBackedScrollView,
  ListView,
  Image
} from 'react-native';

var Header = require('../common/header');
var Item = require('../components/item');
var SGListView = require('react-native-sglistview');
var config = require('../config');

class ItemListContainerView extends Component {


  constructor(props) {
    super(props);
    var self = this;
    this.state = {
      loading: true,
      dataSize: 0,
      dataSource: null
    };
  }

  init() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var value = AsyncStorage.getItem('Authorization', (err, result) => {
      if (result !== null) {
        console.log(result)

        fetch(config.development.item_url, {
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
              token: result,
              loading: false,
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

  liftOff(data) {
    fetch(config.development.friend_url + data.id + '/lift_off/', {
      method: 'POST',
      headers: {
        'Authorization': this.state.token,
      }
    }).then((response) => response.json())
      .then((responseData) => {
        this.init();
      })
      .catch((error) => {})
      .done();
  }

  rowPressed(data) {
    if (data) {
      Alert.alert(
        'คุณได้ทำการเอาออกจากตู้เย็นแล้ว?',
        '',
        [
          {text: 'ไม่'},
          {text: 'ใช่', onPress: () => this.liftOff(data)},
        ]
      );
    }
  }

  renderRow(rowData, sectionID, rowID) {
    return (
      <Item rowData={rowData} rowPressed={this.rowPressed.bind(this)}/>
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
                    <View><Text style={styles.title}>คลิกเพิ่มของ</Text></View>: (
                    <SGListView dataSource={this.state.dataSource}
                       renderRow={this.renderRow.bind(this)}
                       contentContainerStyle={styles.list}
                       automaticallyAdjustContentInsets={true} />)}</View>)
        }</View>);
  }
};

var styles = StyleSheet.create({
  separator: {
    height: 0,
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
    width: 53,
    height: 81,
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
});

module.exports = ItemListContainerView;
