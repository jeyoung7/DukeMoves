/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {createStore} from 'redux';
import {provider, connect} from 'react-redux';
import MapView from 'react-native-maps';

//relative imports
// import Main from 'src/containers/Main';
// import reducers from './redux/reducers';


export default class Main extends Component<{}> {
  render() {
    // const store = createStore(reducers);
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          intitialRegion={{
            latitude: 36.0019,
            longitude: 78.9403,
            latitudeDelta: .015,
            longitudeDelta: .0121
          }}
          // customStyle={require('../config/mapStyle.json')}
        >
      </MapView>
      </View>
    );
  }
}

const styles = {
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  map: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  }
};
