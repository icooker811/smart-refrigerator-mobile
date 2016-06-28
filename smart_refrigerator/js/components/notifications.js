import React, { Component } from 'react';
var SQLite = require('react-native-sqlite-storage');
import {
  Alert,
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  RecyclerViewBackedScrollView,
  ListView,
  Image
} from 'react-native';

var Header = require('../common/header');
var SGListView = require('react-native-sglistview');
var config = require('../config');

var Item = require('../components/item');
var TimeAgo = require('react-native-timeago');
var moment = require('moment');
require('moment/locale/th');
moment.locale('th');

class NotificationListContainerView extends Component {

  constructor(props) {
    super(props);
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
        fetch(config.development.notification_url, {
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

  changeOwner(data) {
    fetch(config.development.item_url + data.id + '/change_owner/', {
      method: 'POST',
      headers: {
        'Authorization': this.state.token,
      }
    }).then((response) => response.json())
      .then((responseData) => {
        console.log(responseData)
        this.init();
      })
      .catch((error) => {})
      .done();
  }

  onPress(data) {
    if (data) {
      Alert.alert(
        'ต้องการของสิ่งนี้?',
        '',
        [
          {text: 'ไม่'},
          {text: 'ใช่', onPress: () => this.changeOwner(data.item)},
        ]
      );
    }
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

  shareNow(data) {
    fetch(config.development.item_url + data.id + '/share_now/', {
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

  rowSharePressed(data) {
    if (data) {
      Alert.alert(
        'คุณต้องการแชร์ของให้เพื่อน?',
        '',
        [
          {text: 'ไม่'},
          {text: 'ใช่', onPress: () => this.shareNow(data.item)},
        ]
      );
    }
  }


  rowCancelPressed(data) {
    if (data) {
      Alert.alert(
        'กินแล้ว?',
        '',
        [
          {text: 'ไม่'},
          {text: 'ใช่', onPress: () => this.liftOff(data.item)},
        ]
      );
    }
  }

  renderRow(rowData, sectionID, rowID) {
    return (
      <TouchableHighlight underlayColor='#dddddd'>
        <View>
          <View style={styles.rowContainer}>
            <Image
              style={styles.thumbnail}
              source={{uri: rowData.item.image}}
            />

            <View style={styles.rigthWrapper}>
              <Text style={styles.text}>
                {rowData.message} |
              </Text>
              <Text style={styles.text}>
                {rowData.send_user.display_name} |
              </Text>
              {
                rowData.notification_type === 'SHARE_NOW'? (
                  <TouchableHighlight style={styles.button} onPress={this.onPress.bind(this, rowData)} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>ขอนะ</Text>
                  </TouchableHighlight>
                ): (<View></View>)

              }

              {
                rowData.notification_type === 'EXPIRE_NOW'? (
                  <View>
                    <TouchableHighlight style={styles.buttonOrange} onPress={this.rowCancelPressed.bind(this, rowData)} underlayColor='#99d9f4'>
                      <Text style={styles.buttonText}>กินแล้ว</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.buttonGrey} onPress={this.rowSharePressed.bind(this, rowData)} underlayColor='#99d9f4'>
                      <Text style={styles.buttonText}>แชร์เพื่อน</Text>
                    </TouchableHighlight>
                    </View>
                ): (<View></View>)

              }
              <TimeAgo time={rowData.created_at} />
            </View>
            


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
          rightItem={{
            title: 'Refresh',
            onPress: () => this.init(),
          }}
        />
        {this.state.loading? (
          <View style={styles.container}>
            <Text style={styles.title}>รอสักครู่</Text>
          </View>
        ): ( <View style={styles.content}>{ this.state.dataSize === 0?
                    <View style={styles.container}><Text style={styles.title}>ไม่พบรายการ</Text></View>: (
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
  },
  thumbnail: {
    width: 100,
    height: 100,
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
  buttonOrange: {
    
  },
});

module.exports = NotificationListContainerView;
