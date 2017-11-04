/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import _ from 'lodash';
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
import BikeRack from '/Users/jacobyoung/Desktop/DukeMoves-master/assets/bikerack.png';
import StopIcon from '/Users/jacobyoung/Desktop/DukeMoves-master/assets/Stop.png';

import BikeRackData from '../../data/bikeRack.json';
import Stops from '../../data/stops.json';

export default class Main extends Component<{}> {

  constructor(props) {
    super(props)

    this.renderIf = this.renderIf.bind(this);
    this.onRegionChange = this.onRegionChange.bind(this);
    this.state = { region: { latitudeDelta: 0.01422,
         longitudeDelta: 0.0421 } }
  }
  onRegionChange(region) {
    this.setState({ region });
  }

  renderIf(jsx, condition)
  {
    if (condition)
     {
       return jsx;
     }
  }

  render() {
    const mapMarkers = BikeRackData.map((item) => { //creates bikeracks
      return (
        <MapView.Marker
          coordinate={{
            latitude: item.fields.lat,
            longitude: item.fields.long

          }}
        >
          <Image
          style={{ width: 15, height: 15 }}
          source={BikeRack}
          />

          </MapView.Marker>
      );
    });
    const nStops = _.filter(Stops, (item)  => {
      return item.fields.municipality === "duke";
    });
    const stopMarkers = nStops.map((item) => { //creates bikeracks
      return (
        <MapView.Marker
        style={{ borderWidth: 1}}
          coordinate={{
            latitude: item.fields.stop_lat,
            longitude: item.fields.stop_lon

          }}
        >
          <Image
          style={{ width: 25, height: 25, paddingLeft: 10 }}
          source={StopIcon}
          />

          </MapView.Marker>
      );
    });

    return (
      <MapView
      provider={PROVIDER_GOOGLE}
      customMapStyle={require('../config/mapStyle.json')}
      style={styles.map}
      onRegionChange={this.onRegionChange}
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

      {mapMarkers.map(item =>
        {
          console.log(this.state);
          return this.renderIf(item, this.state.region.latitudeDelta < 11)
        }
      )}
      {stopMarkers}
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
