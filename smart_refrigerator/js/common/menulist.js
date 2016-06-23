'use strict';

var React = require('react');
var ReactNative = require('react-native');
var Platform = require('Platform');

var {
  StyleSheet,
  TabBarIOS,
  ToolbarAndroid,
  TouchableHighlight,
  Text,
  View
} = ReactNative;

var base64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAQAAACSR7JhAAADtUlEQVR4Ac3YA2Bj6QLH0XPT1Fzbtm29tW3btm3bfLZtv7e2ObZnms7d8Uw098tuetPzrxv8wiISrtVudrG2JXQZ4VOv+qUfmqCGGl1mqLhoA52oZlb0mrjsnhKpgeUNEs91Z0pd1kvihA3ULGVHiQO2narKSHKkEMulm9VgUyE60s1aWoMQUbpZOWE+kaqs4eLEjdIlZTcFZB0ndc1+lhB1lZrIuk5P2aib1NBpZaL+JaOGIt0ls47SKzLC7CqrlGF6RZ09HGoNy1lYl2aRSWL5GuzqWU1KafRdoRp0iOQEiDzgZPnG6DbldcomadViflnl/cL93tOoVbsOLVM2jylvdWjXolWX1hmfZbGR/wjypDjFLSZIRov09BgYmtUqPQPlQrPapecLgTIy0jMgPKtTeob2zWtrGH3xvjUkPCtNg/tm1rjwrMa+mdUkPd3hWbH0jArPGiU9ufCsNNWFZ40wpwn+62/66R2RUtoso1OB34tnLOcy7YB1fUdc9e0q3yru8PGM773vXsuZ5YIZX+5xmHwHGVvlrGPN6ZSiP1smOsMMde40wKv2VmwPPVXNut4sVpUreZiLBHi0qln/VQeI/LTMYXpsJtFiclUN+5HVZazim+Ky+7sAvxWnvjXrJFneVtLWLyPJu9K3cXLWeOlbMTlrIelbMDlrLenrjEQOtIF+fuI9xRp9ZBFp6+b6WT8RrxEpdK64BuvHgDk+vUy+b5hYk6zfyfs051gRoNO1usU12WWRWL73/MMEy9pMi9qIrR4ZpV16Rrvduxazmy1FSvuFXRkqTnE7m2kdb5U8xGjLw/spRr1uTov4uOgQE+0N/DvFrG/Jt7i/FzwxbA9kDanhf2w+t4V97G8lrT7wc08aA2QNUkuTfW/KimT01wdlfK4yEw030VfT0RtZbzjeMprNq8m8tnSTASrTLti64oBNdpmMQm0eEwvfPwRbUBywG5TzjPCsdwk3IeAXjQblLCoXnDVeoAz6SfJNk5TTzytCNZk/POtTSV40NwOFWzw86wNJRpubpXsn60NJFlHeqlYRbslqZm2jnEZ3qcSKgm0kTli3zZVS7y/iivZTweYXJ26Y+RTbV1zh3hYkgyFGSTKPfRVbRqWWVReaxYeSLarYv1Qqsmh1s95S7G+eEWK0f3jYKTbV6bOwepjfhtafsvUsqrQvrGC8YhmnO9cSCk3yuY984F1vesdHYhWJ5FvASlacshUsajFt2mUM9pqzvKGcyNJW0arTKN1GGGzQlH0tXwLDgQTurS8eIQAAAABJRU5ErkJggg==';
var ItemsContainerView = require('../components/items');
var FriendListContainerView = require('../components/friends');
var NotificationListContainerView = require('../components/notifications');
var ProfileView = require('../components/profile');

var CameraView = require('../components/camera');
var Header = require('../common/header');

var TabBarExample = React.createClass({
  getInitialState: function() {
    return {
      selectedTab: 'itemTab'
    };
  },

  _renderContent: function() {
    return null;
  },

  onActionSelected: function(position) {
    if (position === 0) {
      // showSettings();
    }
  },

  onPress: function(page) {
    if (page === 'item-list') {
      this.props.navigator.push({
        items: true,
      });
    } else if (page === 'friend-list') {
      this.props.navigator.push({
        friends: true,
      });
    } else if (page === 'add-item') {
      this.props.navigator.push({
        camera: true,
      });
    } else if (page === 'notification-list') {
      this.props.navigator.push({
        notifications: true,
      });
    } else if (page === 'profile') {
      this.props.navigator.push({
        profile: true,
      });
    }
  },

  render: function() {
    var navigator = this.props.navigator;
    return (
         Platform.OS === 'ios'? (
          <TabBarIOS
            unselectedTintColor="#555555"
            tintColor="white"
            barTintColor="#47BFBF">
            <TabBarIOS.Item
              title="Item"
              icon={{uri: base64Icon, scale: 3}}
              selected={this.state.selectedTab === 'itemTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'itemTab',
                });
              }}>
              <ItemsContainerView title='Item List' navigator={navigator} />
            </TabBarIOS.Item>
            <TabBarIOS.Item
              systemIcon="search"
              selected={this.state.selectedTab === 'friendTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'friendTab',
                });
              }}>
              <FriendListContainerView title='Friend List' navigator={navigator} />
            </TabBarIOS.Item>
            <TabBarIOS.Item
              title="Camera"
              icon={require('../assets/ic_camera_front_white.png')}
              selectedIcon={require('../assets/ic_camera_rear_white.png')}
              selected={this.state.selectedTab === 'cameraTab'}
              onPress={() => {
                this.props.navigator.push({
                  camera: true,
                });
              }}>
              <Text></Text>
            </TabBarIOS.Item>
            <TabBarIOS.Item
              systemIcon="favorites"
              selected={this.state.selectedTab === 'notificationTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'notificationTab',
                });
              }}>
              <NotificationListContainerView title='Notification List' navigator={navigator} />
            </TabBarIOS.Item>
            <TabBarIOS.Item
              systemIcon="more"
              selected={this.state.selectedTab === 'infoTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'infoTab',
                });
              }}>
              <ProfileView title='Profile' navigator={navigator} />
            </TabBarIOS.Item>
          </TabBarIOS>) : (
            <View style={styles.container}>
                <View style={styles.content}>
                  <TouchableHighlight style={styles.button} onPress={this.onPress.bind(this, 'item-list')} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>รายการของ</Text>
                  </TouchableHighlight>
                  <TouchableHighlight style={styles.button} onPress={this.onPress.bind(this, 'friend-list')} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>รายการเพื่อน</Text>
                  </TouchableHighlight>
                  <TouchableHighlight style={styles.button} onPress={this.onPress.bind(this, 'add-item')} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>เพิ่มของ</Text>
                  </TouchableHighlight>
                  <TouchableHighlight style={styles.button} onPress={this.onPress.bind(this, 'notification-list')} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>รายการแจ้งเตือน</Text>
                  </TouchableHighlight>
                  <TouchableHighlight style={styles.button} onPress={this.onPress.bind(this, 'profile')} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>ข้อมูลส่วนตัว</Text>
                  </TouchableHighlight>
                </View>
            </View>
          )
    );
  },

});

var styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    alignItems: 'center',
  },
  container: {
    flex: 1
  },
  content: {
    margin: 10,
  },
  instructions: {
    color: '#333333',
    marginBottom: 5,
  },
  toolbar: {
   	height: 56,
    backgroundColor: '#e9eaed',
  },
  buttonText: {
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
  }
});

module.exports = TabBarExample;
