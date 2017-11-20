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
import Polyline from '@mapbox/polyline';
//relative imports
// import Main from 'src/containers/Main';
// import reducers from './redux/reducers';
import DukeHeader from '/Users/jacobyoung/Desktop/DukeMoves-master/assets/dukeheader.png';
import Routes from '/Users/jacobyoung/Desktop/DukeMoves-master/assets/routes.png';
import Warnings from '/Users/jacobyoung/Desktop/DukeMoves-master/assets/warnings.png';
import BikeRack from '/Users/jacobyoung/Desktop/DukeMoves-master/assets/bikeracknew.png';
import StopIcon from '/Users/jacobyoung/Desktop/DukeMoves-master/assets/Stop.png';

import BikeRackData from '../../data/bikeRack.json';
import Stops from '../../data/stops.json';
import C1 from '../../data/c1.json';
import StopModule from '../components/StopModule.js';

export default class Main extends Component<{}> {

  constructor(props) {
    super(props);
    this.c1 = C1;
    this.stopSelected = false;
    this.c1 = Polyline.decode(this.c1.routes[0].overview_polyline.points);
    this.renderIf = this.renderIf.bind(this);
    this.onRegionChange = this.onRegionChange.bind(this);
    this.setName = this.setName.bind(this);
    this.state = { region: { latitudeDelta: 0.01422,
         longitudeDelta: 0.0421 },
            stopSelected: false,
            hour: null,
            minutes: null,
            stopName: null,
 };
  }
  componentDidMount() {
   setInterval(() => {
     this.setState({
       hour: new Date().getHours(),
       minutes: new Date().getMinutes()
     });
}, 5000);
 }
  onRegionChange(region) {
    this.setState({ region });
  }
  setName(lat, long) {
    const stop = _.filter(Stops, (item) => {
      return item.fields.lat === lat && item.fields.long === long;
    });
    this.setState({
      stopName:  stop.stop_name,
      stopSelected: true,
    });
  }

  c1route() {
    const cord = this.c1.map((point, index) => {
          return {
                latitude: point[0],
                longitude: point[1]
                }
        })
    return (
      <MapView.Polyline
      coordinates={
        cord}
      strokeWidth={3}
      strokeColor='#ff0000'
      >
      </MapView.Polyline>);
  }


  renderIf(jsx, condition) {
    if (condition) {
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
          style={{ width: 12, height: 10 }}
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
          identifier={item.stop_name}
          coordinate={{
            latitude: item.fields.stop_lat,
            longitude: item.fields.stop_lon

          }}
          onPress={ () => this.setName(item.fields.stop_lat, item.fields.stop_long)}
        >
          <Image
          style={{ width: 25, height: 25, paddingTop: 5 }}
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

      {mapMarkers.map(item => {
          return this.renderIf(item, this.state.region.latitudeDelta < 0.03);
        }
      )}
      {stopMarkers}
      {this.c1route()}
      {this.renderIf(<StopModule stopName={this.state.stopName} hours={this.state.hours} minute={this.state.minutes} stopIcon={'C1Icon'} />, this.state.stopSelected)}
      </MapView>
    );
  }
}
//    {this.c1route()}

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
