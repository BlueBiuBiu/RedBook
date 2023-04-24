import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import FlowList from '../../../../components/flowlist/FlowList';
import RenderCategory from './RenderCategory';
import {getHomeList} from '../../../../service/modules/home';
import ResizeImage from '../../../../components/ResizeImage';
import HeartIcon from '../../../../components/HeartIcon';


const {width: SCREEN_WIDTH} = Dimensions.get('window');

const RenderList = () => {
  const [page, setPage] = useState(1);
  const [noData, setNoData] = useState(false);
  const [homeList, setHomeList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const params = {
      page: 1,
      size: 10,
    };

    setIsLoading(true);
    const res = await getHomeList(params);
    setIsLoading(false);
    setNoData(false);
    setPage(1);

    setHomeList(res);
  };

  const loadMore = async () => {
    if (noData) {
      return;
    }

    const currentPage = page + 1;
    setPage(currentPage);

    const params = {
      page: currentPage,
      size: 10,
    };

    setIsLoading(true);
    const res = await getHomeList(params);
    setIsLoading(false);

    if (!res.length) {
      setNoData(true);
      return;
    } else {
      setHomeList([...homeList, ...res]);
    }
  };

  const renderItem = ({item}: any) => {
    const itemStyles = StyleSheet.create({
      item: {
        width: (SCREEN_WIDTH - 18) / 2,
        marginLeft: 6,
      },
      title: {
        color: '#000',
        marginTop: 10,
        paddingHorizontal: 5,
      },
      box: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        paddingHorizontal: 5,
      },
      avatar: {
        width: 26,
        height: 26,
        borderRadius: 13,
      },
      userName: {
        fontSize: 14,
        flex: 1,
        marginLeft: 5,
        color: '#7a7a7a',
      },
      fav: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
      },
      unit: {
        marginHorizontal: 5,
      },
    });

    return (
      <View style={itemStyles.item}>
        <ResizeImage width={(SCREEN_WIDTH - 18) / 2} url={item.image} />
        <Text style={itemStyles.title}>{item.title}</Text>
        <View style={itemStyles.box}>
          <Image style={itemStyles.avatar} source={{uri: item.avatarUrl}} />
          <Text style={itemStyles.userName}>{item.userName}</Text>
          <HeartIcon
            style={itemStyles.fav}
            isFavorite={item.isFavorite}
          />
          <Text style={itemStyles.unit}>{item.favoriteCount}</Text>
        </View>
      </View>
    );
  };

  const renderFooter = () => {
    return (
      <View>
        {noData && <Text style={styles.footerTxt}>没有更多数据了~</Text>}
      </View>
    );
  };

  return (
    <View style={styles.root}>
      <FlowList
        style={styles.flatList}
        data={homeList}
        horizontal={false}
        numColumns={2}
        keyExtractor={(item: any) => item.id}
        renderItem={renderItem}
        refreshing={isLoading}
        onRefresh={loadData}
        onEndReached={loadMore}
        ListHeaderComponent={<RenderCategory />}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

export default RenderList;

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
  },
  flatList: {
    marginBottom: 56,
  },
  footerTxt: {
    textAlign: 'center',
    marginVertical: 10,
    color: '#666',
    fontSize: 12,
  },
});
