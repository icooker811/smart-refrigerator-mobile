'use strict';

var React = require('react');
var ReactNative = require('react-native');
var Platform = require('Platform');
var SideMenu = require('react-native-side-menu');

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
var Menu = require('../common/menu');

var TabBarExample = React.createClass({
  getInitialState: function() {
    return {
      selectedTab: 'nearByTab'
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

  render: function() {
    var navigator = this.props.navigator;
    var menu = <Menu navigator={navigator}/>;
    return (
      Platform.OS === 'ios'? (
      <TabBarIOS
        unselectedTintColor="#555555"
        tintColor="white"
        barTintColor="#47BFBF">
        <TabBarIOS.Item
          title="Near by"
          icon={{uri: base64Icon, scale: 3}}
          selected={this.state.selectedTab === 'nearByTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'nearByTab',
            });
          }}>
          <ItemsContainerView title='Item List' navigator={navigator} />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          systemIcon="bookmarks"
          selected={this.state.selectedTab === 'bookmarkTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'bookmarkTab',
            });
          }}>
          <Text>bb</Text>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          systemIcon="recents"
          selected={this.state.selectedTab === 'clockTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'clockTab',
            });
          }}>
          <Text>cc</Text>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          systemIcon="more"
          selected={this.state.selectedTab === 'infoTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'infoTab',
            });
          }}>
          <Text>dd</Text>
        </TabBarIOS.Item>
      </TabBarIOS>) : (
        <View style={styles.container}>
          <SideMenu menu={menu}>
            <BusListContainerView title='Bus List' navigator={navigator} />
          </SideMenu>
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
  welcome: {
    fontSize: 28,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    fontSize: 19,
    marginBottom: 5,
  },
  toolbar: {
   	height: 56,
    backgroundColor: '#e9eaed',
  }
});

module.exports = TabBarExample;
