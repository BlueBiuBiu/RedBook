import {StyleSheet, Image, Text, View} from 'react-native';
import React from 'react';

const RenderEmpty = ({icon, tips}: {icon: any; tips: string}) => {
  return (
    <View style={styles.root}>
      <Image style={styles.img} source={icon} />
      <Text style={styles.txt}>{tips}</Text>
    </View>
  );
};

export default RenderEmpty;

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    paddingTop: 120,
  },
  img: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  txt: {
    fontSize: 14,
    color: '#bbb',
    marginTop: 16,
  },
});
