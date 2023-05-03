import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import icon_comments from '../../../../assets/images/icon_comments.png';
import icon_star from '../../../../assets/images/icon_star.png';
import icon_new_follow from '../../../../assets/images/icon_new_follow.png';
import icon_no_data from '../../../../assets/images/0rm.png';
import {getMessageList} from '../../../../service/modules/message';

const RenderList = () => {
  const [page, setPage] = useState(1);
  const [noData, setNoData] = useState(false);
  const [messageList, setMessageList] = useState<IMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  // 刷新数据
  const loadData = async () => {
    const params = {
      page: 1,
      size: 10,
    };

    setIsLoading(true);
    const res = await getMessageList(params);    
    setIsLoading(false);
    setNoData(false);
    setPage(1);

    setMessageList(res);
  };

  // 加载更多
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
    const res = await getMessageList(params);
    setIsLoading(false);

    if (!res.length) {
      setNoData(true);
      return;
    } else {
      setMessageList([...messageList, ...res]);
    }
  };

  const RenderHeader = () => {
    const headerStyles = StyleSheet.create({
      root: {
        width: '100%',
        height: 100,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
      },
      box: {},
      icon: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
      },
      txt: {
        color: '#000',
        marginTop: 5,
      },
      count: {
        width: 28,
        borderRadius: 10,
        fontSize: 12,
        position: 'absolute',
        top: -5,
        right: -2,
        textAlign: 'center',
        paddingHorizontal: 3,
        backgroundColor: '#d21748',
        color: '#fff',
      },
    });

    return (
      <View style={headerStyles.root}>
        <View style={headerStyles.box}>
          <Image style={headerStyles.icon} source={icon_star} />
          <View>
            <Text style={headerStyles.txt}>赞和收藏</Text>
          </View>
          <Text style={headerStyles.count}>99+</Text>
        </View>
        <View style={headerStyles.box}>
          <Image style={headerStyles.icon} source={icon_new_follow} />
          <View>
            <Text style={headerStyles.txt}>新增关注</Text>
          </View>
          <Text style={headerStyles.count}>99+</Text>
        </View>
        <View style={headerStyles.box}>
          <Image style={headerStyles.icon} source={icon_comments} />
          <View>
            <Text style={headerStyles.txt}>评论和@</Text>
          </View>
          <Text style={headerStyles.count}>99+</Text>
        </View>
      </View>
    );
  };

  const RenderEmpty = () => {
    return (
      <View style={styles.empty}>
        <Image style={styles.IconNoData} source={icon_no_data} />
        <Text style={styles.noDataTxt}>还没有收到任何消息</Text>
      </View>
    );
  };

  const RenderFooter = () => {
    return (
      <View>
        {noData && <Text style={styles.footerTxt}>没有更多数据了~</Text>}
      </View>
    );
  };

  const RenderItem = ({item}: IRenderItem) => {
    const itemStyles = StyleSheet.create({
      root: {
        width: '100%',
        flexDirection: 'row',
        margin: 15
      },
      avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        resizeMode: 'cover',
      },
      content: {
        flex: 1,
        marginLeft: 15,
        justifyContent: 'space-around'
      },
      title: {
        color: '#000',
        fontWeight: '500',
        fontSize: 15
      },
      subTitle: {
        fontSize: 13,
      },
      date: {
        width: 100,
        alignItems: 'center'
      }
    });

    return (
      <TouchableOpacity style={itemStyles.root}>
        <Image style={itemStyles.avatar} source={{uri: item.avatarUrl}} />
        <View style={itemStyles.content}>
          <Text style={itemStyles.title}>{item.name}</Text>
          <Text style={itemStyles.subTitle} numberOfLines={1}>{item.lastMessage}</Text>
        </View>
        <View style={itemStyles.date}>
          <Text>{item.lastMessageTime}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={messageList}
      style={styles.root}
      renderItem={RenderItem}
      refreshing={isLoading}
      onRefresh={loadData}
      onEndReached={loadMore}
      keyExtractor={(item,index) => `${item}-${index}`}
      ListHeaderComponent={RenderHeader}
      ListEmptyComponent={RenderEmpty}
      ListFooterComponent={RenderFooter}
    />
  );
};

export default RenderList;

const styles = StyleSheet.create({
  root: {
    height: '100%',
  },
  empty: {
    alignItems: 'center',
    marginTop: 200,
  },
  IconNoData: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  noDataTxt: {
    fontSize: 14,
    color: '#999',
  },
  footerTxt: {
    textAlign: 'center',
    marginVertical: 10,
    color: '#666',
    fontSize: 12,
  },
});
