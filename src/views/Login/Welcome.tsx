import {Image, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import icon_main_logo from '../../assets/images/icon_main_logo.png';

const Welcome = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();

  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Login');
    }, 0);
  });

  return (
    <View style={styles.root}>
      <Image style={styles.img} source={icon_main_logo} />
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  img: {
    width: 200,
    marginTop: 100,
    resizeMode: 'contain',
  },
});
