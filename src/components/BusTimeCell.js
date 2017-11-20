import React from 'react';
import { Text, View, Image, Button } from 'react-native';

import Assets from '../../assets/';

const BusTimeCell = (props) => {

  const Icon = '../../assets/' + props.name;

  return (
    <View style={styles.viewStyle}>


      <Image source={Icon} style={{ width: '30', height: '30', margin: 3 }}/>

      <Text style={styles.textStyle}>
        {props.times}
      </Text>

    </View>
  );
};

const styles = {
  viewStyle: {
    height: 36,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  textStyle: {
    fontSize: 11,
    margin: 5,
    color: '#14489E',
    fontFamily: 'Arial Rounded MT Bold',
    align: 'center'
  },

};

export { BusTimeCell };
