import {Image, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Cache from '../../utils/Cache';
import icon_main_logo from '../../assets/images/icon_main_logo.png';

const Welcome = () => {
  const navigate = useNavigation<StackNavigationProp<any>>();

  useEffect(() => {
    setTimeout(async () => {
      getUserInfo()
    }, 0);
  });

  // 判断是否登录过
  const getUserInfo = async () => {
    const res = await Cache.getCache('userInfo')
    if (Object.keys(res).length) {
      navigate.push('Tabbar');
    } else {
      navigate.push('Login');
    }
  }

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
