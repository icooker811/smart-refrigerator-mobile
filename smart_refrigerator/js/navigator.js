'use strict';

var React = require('React');
var Platform = require('Platform');
var BackAndroid = require('BackAndroid');

var Menulist = require('../js/common/menulist');
var LoginFormView = require('../js/components/login');

var ItemsContainerView = require('../js/components/items');
var ItemFormView = require('../js/components/itemform');

var FriendListContainerView = require('../js/components/friends');
var FriendItemListContainerView = require('../js/components/frienditems');

var CameraView = require('../js/components/camera');
var NotificationListContainerView = require('../js/components/notifications');
var ProfileView = require('../js/components/profile');

var Navigator = require('Navigator');
var StyleSheet = require('StyleSheet');

var _Navigator = React.createClass({
  _handlers: ([]: Array<() => boolean>),

  componentDidMount: function() {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBackButton);
  },

  componentWillUnmount: function() {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBackButton);
  },

  getChildContext() {
    return {
      addBackButtonListener: this.addBackButtonListener,
      removeBackButtonListener: this.removeBackButtonListener,
    };
  },

  addBackButtonListener: function(listener) {
    this._handlers.push(listener);
  },

  removeBackButtonListener: function(listener) {
    this._handlers = this._handlers.filter((handler) => handler !== listener);
  },

  handleBackButton: function() {
    for (let i = this._handlers.length - 1; i >= 0; i--) {
      if (this._handlers[i]()) {
        return true;
      }
    }

    const {navigator} = this.refs;
    if (navigator && navigator.getCurrentRoutes().length > 1) {
      navigator.pop();
      return true;
    }

    return false;
  },

  render: function() {
    return (
      <Navigator
        ref="navigator"
        style={styles.container}
        configureScene={(route) => {
          if (Platform.OS === 'android') {
            return Navigator.SceneConfigs.FloatFromBottomAndroid;
          }
          // TODO: Proper scene support
          if (route.shareSettings || route.friend) {
            return Navigator.SceneConfigs.FloatFromRight;
          } else {
            return Navigator.SceneConfigs.FloatFromBottom;
          }
        }}
        initialRoute={{}}
        renderScene={this.renderScene}
      />
    );
  },

  renderScene: function(route, navigator) {
    console.log(route)
    if (route.home) {
      return (
        <Menulist
          title='Smart refrigerator'
          user={route.user}
          navigator={navigator}
        />
      );
    }

    if (route.camera) {
      return (
        <CameraView title='camera'
            navigator={navigator} />
      );
    }

    if (route.items) {
      return (
        <ItemsContainerView
          title='Tooshare'
          navigator={navigator}
        />
      );
    }

    if (route.friends) {
      return (
        <FriendListContainerView
          title='Friend List'
          navigator={navigator}
        />
      );
    }

    if (route.notifications) {
      return (
        <NotificationListContainerView
          title='Notification List'
          navigator={navigator}
        />
      );
    }

    if (route.profile) {
      return (
        <ProfileView
          title='Profile'
          navigator={navigator}
        />
      );
    }

    if (route.friend_items) {
      return (
        <FriendItemListContainerView
          title='Friend Items'
          created_by={route.created_by}
          navigator={navigator}
        />
      );
    }

    if (route.itemform) {
      return (
        <ItemFormView
          title='Item'
          data={route.data}
          navigator={navigator}
        />
      );
    }

    return <LoginFormView navigator={navigator}/>;
  },
});

_Navigator.childContextTypes = {
  addBackButtonListener: React.PropTypes.func,
  removeBackButtonListener: React.PropTypes.func,
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

module.exports = _Navigator;
