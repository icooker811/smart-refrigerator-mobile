import React, { Component } from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image
} from 'react-native';


class ItemView extends Component {
  rowPressed(data) {
    this.props.rowPressed(data);
  }

  render() {
    var rowData = this.props.rowData;
    return (
      <TouchableHighlight onPress={() => this.rowPressed(rowData)}
                          underlayColor='#dddddd' style={styles.item}>
        <View>
          <View style={styles.rowContainer}>
            <Image
              style={styles.thumbnail}
              source={{uri: rowData.image}}
            />
          </View>
          <Text style={styles.text}>
            {rowData.created_by.display_name} | {rowData.expire_at}
          </Text>
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
    width: 120,
    height: 120,
  },
  item: {
    margin: 10,
    width: 150,
    height: 150
  }
});

module.exports = ItemView;
