import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image
} from 'react-native';


class ItemView extends Component {
  rowPressed(data) {

  }

  render() {
    var rowData = this.props.rowData;
    return (
      <TouchableHighlight onPress={() => this.rowPressed(rowData)}
                          underlayColor='#dddddd'>
        <View>
          <View style={styles.rowContainer}>
            <Image
              style={styles.thumbnail}
              source={{uri: rowData.image}}
            />
            <Text style={styles.text}>
              {rowData.created_by.display_name} | {rowData.expire_at}
            </Text>
          </View>
          <View style={styles.separator}/>
        </View>
      </TouchableHighlight>
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
    width: 53,
    height: 81,
  },
});

module.exports = ItemView;
