import { StyleSheet, View} from 'react-native';
import React from 'react';

import RenderTitle from './comps/RenderTitle';
import RenderList from './comps/RenderList';

const Home = () => {
  return (
    <View style={styles.root}>
      <RenderTitle/>
      <RenderList/>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff'
  },
});
