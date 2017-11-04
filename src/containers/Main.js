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
  Image,
  View
} from 'react-native';
import { createStore } from 'redux';
import { provider, connect } from 'react-redux';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
//relative imports
// import Main from 'src/containers/Main';
// import reducers from './redux/reducers';
import DukeHeader from '/Users/jacobyoung/Desktop/DukeMoves-master/assets/dukeheader.png';
import Routes from '/Users/jacobyoung/Desktop/DukeMoves-master/assets/routes.png';
import Warnings from '/Users/jacobyoung/Desktop/DukeMoves-master/assets/warnings.png';

export default class Main extends Component<{}> {

  render() {
    return (
      <MapView
      provider={PROVIDER_GOOGLE}
      customMapStyle={require('../config/mapStyle.json')}
      style={styles.map}
     initialRegion={{
      latitude: 36.0019,
       longitude: -78.9401,
       latitudeDelta: 0.01422,
       longitudeDelta: 0.0421,
     }}

      >
      <Image
      style={{ width: 34, height: 34, left: 25, top: 28, position: 'absolute' }}
      source={Warnings}
      />
      <Image
      style={{ width: 48, height: 48, left: 164, top: 24, position: 'absolute' }}
      source={DukeHeader}
      />
      <Image
      style={{ width: 54, height: 27, left: 307, top: 35, position: 'absolute' }}
      source={Routes}
      />


      </MapView>
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
    flexDirection: 'row',
    justifyContent: 'flex-start',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  }
};
