import React from 'react';
import {TouchableOpacity, Text, StyleSheet, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen-hooks';

export const MediaComponent = props => {
  const {value} = props;
  return (
    <TouchableOpacity style={styles.button} {...props}>
      <Image style={styles.image} {...props} />
      <Text style={styles.text}>{value}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
  },
  text: {
    color: 'black',
    fontSize: hp('2.5%'),
    marginLeft: 8,
  },
  image: {
    width: wp('25%'),
    height: wp('25%'),
  },
});
export default MediaComponent