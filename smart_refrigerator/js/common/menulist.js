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
  Image,
  View
} = ReactNative;
import TabNavigator from 'react-native-tab-navigator';

var base64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAQAAACSR7JhAAADtUlEQVR4Ac3YA2Bj6QLH0XPT1Fzbtm29tW3btm3bfLZtv7e2ObZnms7d8Uw098tuetPzrxv8wiISrtVudrG2JXQZ4VOv+qUfmqCGGl1mqLhoA52oZlb0mrjsnhKpgeUNEs91Z0pd1kvihA3ULGVHiQO2narKSHKkEMulm9VgUyE60s1aWoMQUbpZOWE+kaqs4eLEjdIlZTcFZB0ndc1+lhB1lZrIuk5P2aib1NBpZaL+JaOGIt0ls47SKzLC7CqrlGF6RZ09HGoNy1lYl2aRSWL5GuzqWU1KafRdoRp0iOQEiDzgZPnG6DbldcomadViflnl/cL93tOoVbsOLVM2jylvdWjXolWX1hmfZbGR/wjypDjFLSZIRov09BgYmtUqPQPlQrPapecLgTIy0jMgPKtTeob2zWtrGH3xvjUkPCtNg/tm1rjwrMa+mdUkPd3hWbH0jArPGiU9ufCsNNWFZ40wpwn+62/66R2RUtoso1OB34tnLOcy7YB1fUdc9e0q3yru8PGM773vXsuZ5YIZX+5xmHwHGVvlrGPN6ZSiP1smOsMMde40wKv2VmwPPVXNut4sVpUreZiLBHi0qln/VQeI/LTMYXpsJtFiclUN+5HVZazim+Ky+7sAvxWnvjXrJFneVtLWLyPJu9K3cXLWeOlbMTlrIelbMDlrLenrjEQOtIF+fuI9xRp9ZBFp6+b6WT8RrxEpdK64BuvHgDk+vUy+b5hYk6zfyfs051gRoNO1usU12WWRWL73/MMEy9pMi9qIrR4ZpV16Rrvduxazmy1FSvuFXRkqTnE7m2kdb5U8xGjLw/spRr1uTov4uOgQE+0N/DvFrG/Jt7i/FzwxbA9kDanhf2w+t4V97G8lrT7wc08aA2QNUkuTfW/KimT01wdlfK4yEw030VfT0RtZbzjeMprNq8m8tnSTASrTLti64oBNdpmMQm0eEwvfPwRbUBywG5TzjPCsdwk3IeAXjQblLCoXnDVeoAz6SfJNk5TTzytCNZk/POtTSV40NwOFWzw86wNJRpubpXsn60NJFlHeqlYRbslqZm2jnEZ3qcSKgm0kTli3zZVS7y/iivZTweYXJ26Y+RTbV1zh3hYkgyFGSTKPfRVbRqWWVReaxYeSLarYv1Qqsmh1s95S7G+eEWK0f3jYKTbV6bOwepjfhtafsvUsqrQvrGC8YhmnO9cSCk3yuY984F1vesdHYhWJ5FvASlacshUsajFt2mUM9pqzvKGcyNJW0arTKN1GGGzQlH0tXwLDgQTurS8eIQAAAABJRU5ErkJggg==';
var ItemsContainerView = require('../components/items');
var FriendListContainerView = require('../components/friends');
var NotificationListContainerView = require('../components/notifications');
var ProfileView = require('../components/profile');

var CameraView = require('../components/camera');
var Header = require('../common/header');

var PushNotification = require('react-native-push-notification');
// PushNotification.configure({

//     // (optional) Called when Token is generated (iOS and Android)
//     onRegister: function(token) {
//         console.log( 'TOKEN:', token );
//     },

//     // (required) Called when a remote or local notification is opened or received
//     onNotification: function(notification) {
//         console.log( 'NOTIFICATION:', notification );
//     },

//     // ANDROID ONLY: (optional) GCM Sender ID.
//     senderID: "432550044797",

//     // IOS ONLY (optional): default: all - Permissions to register.
//     permissions: {
//         alert: true,
//         badge: true,
//         sound: true
//     },

//     // Should the initial notification be popped automatically
//     // default: true
//     popInitialNotification: false,

//     /**
//       * IOS ONLY: (optional) default: true
//       * - Specified if permissions will requested or not,
//       * - if not, you must call PushNotificationsHandler.requestPermissions() later
//       */
//     requestPermissions: true,
// });

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
           <TabNavigator>
            <TabNavigator.Item
              renderIcon={() => <Image source={require('../assets/ic_home.png')} />}
              selected={this.state.selectedTab === 'itemTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'itemTab',
                });
              }}>
              <ItemsContainerView title='' navigator={navigator} />
            </TabNavigator.Item>
            <TabNavigator.Item
              renderIcon={() => <Image source={require('../assets/ic_friends.png')} />}
              selected={this.state.selectedTab === 'friendTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'friendTab',
                });
              }}>
              <FriendListContainerView title='Friend List' navigator={navigator} />
            </TabNavigator.Item>
            <TabNavigator.Item
              renderIcon={() => <Image source={require('../assets/ic_camera.png')} />}
              selected={this.state.selectedTab === 'cameraTab'}
              onPress={() => {
                this.props.navigator.push({
                  camera: true,
                });
              }}>
              <Text></Text>
            </TabNavigator.Item>
            <TabNavigator.Item
              renderIcon={() => <Image source={require('../assets/ic_noti.png')} />}
              selected={this.state.selectedTab === 'notificationTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'notificationTab',
                });
              }}>
              <NotificationListContainerView title='Notification List' navigator={navigator} />
            </TabNavigator.Item>
            <TabNavigator.Item
              renderIcon={() => <Image source={require('../assets/ic_profile.png')} />}
              selected={this.state.selectedTab === 'infoTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'infoTab',
                });
              }}>
              <ProfileView title='Profile' navigator={navigator} />
            </TabNavigator.Item>
          </TabNavigator>
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
