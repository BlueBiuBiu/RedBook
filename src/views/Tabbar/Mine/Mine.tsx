import {RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import RenderTitle from './comps/RenderTitle';
import RenderContent from './comps/RenderContent';
import {
  getNoteList,
  getCollectionListList,
  getFavorateListList,
} from '../../../service/modules/mine';

const Mine = () => {
  const [List, setList] = useState<any[]>([[],[],[]]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    getList()
  },[])

  
  const getList = async () => {
    setRefresh(true);
    const res = await Promise.all([
      getNoteList(),
      getCollectionListList(),
      getFavorateListList(),
    ]);

    setList(res);
    setRefresh(false);
  };


  return (
    <View style={styles.root}>
      <ScrollView style={styles.scrollView}
        refreshControl={
        <RefreshControl refreshing={refresh} onRefresh={getList} />
      }>
        <RenderTitle />
        <RenderContent List={List}/>
      </ScrollView>
    </View>
  );
};

export default Mine;

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff'
  },
  scrollView: {
    width: '100%',
    flex: 1,
  },
});
