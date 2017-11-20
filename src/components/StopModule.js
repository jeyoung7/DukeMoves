import React from 'react';
import { Text, View, Image, Button } from 'react-native';

import BusTimeCell from './StopModule';
import c1Sunday from '../../data/c1Sunday.json';

const times = (hour, minute) => {
    let startCounting = 0;
    let totalCount = 0;
    return (
      c1Sunday.map((item, index) => {

          if (Number(hour) > Number(item.westArrive.split(':')[0])) {
            console.log(item.westArrive.split(':')[0]);

            startCounting = 1;
          } else if

          (Number(hour) === Number(item.westArrive.split(':')[0]) && Number(minute) > Number(item.westArrive().split(':')[1])) {
            startCounting = 1;
          }
          if (startCounting === 1 && totalCount < 3) {
            totalCount = totalCount + 1;
            return (item);
          }
      })
    );
};

const StopModule = (props) => {
  return (
    <View style={styles.viewStyle}>
      <Text style={styles.textStyle}>
        {props.stopName}
      </Text>
      <BusTimeCell name={props.stopIcon} times={times(props.hour, props.minute)} />
    </View>
  );
};

const styles = {
  viewStyle: {
    height: 135,
    width: '100%',
    backgroundColor: "rgba(255,255,255,0.42)",
  },
  textStyle: {
    fontSize: 20,
    color: '#14489E',
    fontFamily: 'Arial Rounded MT Bold',
  },
  buttonStyle: {
    marginTop: 30,
    opacity: .7

  },
  logo: {
    width: 100,
    alignSelf: 'center',
    marginTop: 20,
    height: 40,
    opacity: .9

  },
};

export default StopModule;
