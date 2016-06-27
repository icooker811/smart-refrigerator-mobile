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
  Image,
  Dimensions
} from 'react-native';

var Header = require('../common/header');
var Item = require('../components/item');
var SGListView = require('react-native-sglistview');
var config = require('../config');

var window = Dimensions.get('window');

class FriendItemListContainerView extends Component {

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

        fetch(config.development.item_url + '?created_by=' + this.props.created_by.id, {
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
          .catch((error) => {
            this.setState({
              loading: false,
            });
          })
          .done();
      }
    });
  }

  componentDidMount() {
    this.init();
  }

  onBackPress() {
    this.props.navigator.pop();
  }

  liftOff(data) {
    fetch(config.development.item_url + data.id + '/lift_off/', {
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


  getFromFriend(data) {
    fetch(config.development.item_url + data.id + '/get_from_friend/', {
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
        'กินแล้ว?',
        '',
        [
          {text: 'ไม่'},
          {text: 'ใช่', onPress: () => this.getFromFriend(data)},
        ]
      );
    }
  }

  renderRow(rowData, sectionID, rowID) {
    return (
      <Item rowData={rowData}
            cancelText='กินแล้ว'
            actionText='กินแล้ว'
            rowActionPressed={this.rowPressed.bind(this)}
            rowCancelPressed={this.rowPressed.bind(this)}/>
    );
  }

  render() {
    return (
      <View style={styles.content}>
        <Header
          title={this.props.created_by.display_name}
          style={styles.header}
          leftItem={{
            title: 'Back',
            onPress: () => this.onBackPress(),
          }}
        />
        {this.state.loading? (
          <View style={styles.container}>
            <Text style={styles.title}>รอสักครู่</Text>
          </View>
        ): ( <View style={styles.container}>{ this.state.dataSize === 0?
                    <Text style={styles.title}>ไม่พบรายการ</Text>: (
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
    flexWrap: 'wrap',
    width: window.width,
  },
});

module.exports = FriendItemListContainerView;
