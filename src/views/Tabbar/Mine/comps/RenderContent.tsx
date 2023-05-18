import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import RenderEmpty from './RenderEmpty';
import icon_no_note from '../../../../assets/images/icon_no_note.webp';
import icon_no_collection from '../../../../assets/images/icon_no_collection.webp';
import icon_no_favorate from '../../../../assets/images/icon_no_favorate.webp';
import HeartIcon from '../../../../components/HeartIcon';

const EMPTY_CONFIG = [
  {icon: icon_no_note, tips: '快去发布今日的好心情吧～'},
  {icon: icon_no_collection, tips: '快去收藏你喜欢的作品吧～'},
  {icon: icon_no_favorate, tips: '喜欢点赞的人运气不会太差哦～'},
];
const {width: SCREEN_WIDTH} = Dimensions.get('window');

const RenderContent = ({List}: any) => {
  const [currentIndex, setCurrentIndex] = useState(2);
  const tabs = ['笔记', '收藏', '赞过'];
  const tabsList = [List[0], List[1], List[2]];

  const RenderTabs = () => {
    const tabStyles = StyleSheet.create({
      tabs: {
        width: '100%',
        height: 56,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: '30%',
        borderBottomColor: '#dbd6d6',
        borderBottomWidth: 1,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        position: 'relative',
        bottom: 10,
      },
      tab: {
        paddingBottom: 5,
        borderBottomWidth: 3,
        borderBottomColor: 'transparent',
      },
      activeTab: {
        paddingBottom: 5,
        borderBottomWidth: 3,
        borderBottomColor: '#c7002d',
      },
      txt: {
        color: '#828283',
        fontSize: 17,
      },
      activeTxt: {
        color: '#000',
        fontSize: 17,
      },
    });
    return (
      <View style={tabStyles.tabs}>
        {tabs.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setCurrentIndex(index);
              }}
              key={item}
              style={
                currentIndex === index ? tabStyles.activeTab : tabStyles.tab
              }>
              <Text
                style={
                  currentIndex === index ? tabStyles.activeTxt : tabStyles.txt
                }>
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const renderList = () => {
    const listStyles = StyleSheet.create({
      container: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
      },
      item: {
        width: (SCREEN_WIDTH - 18) / 2,
        marginLeft: 6,
        marginBottom: 6,
      },
      img: {
        width: '100%',
        height: 240,
        resizeMode: 'contain',
        borderRadius: 8,
      },
      title: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 10,
      },
      box: {
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
      },
      avatar: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
        borderRadius: 15,
      },
      username: {
        marginLeft: 5,
        flex: 1,
        fontSize: 12,
        color: '#959595',
      },
      count: {
        marginLeft: 5,
        fontSize: 14,
        color: '#959595',
      },
    });

    const currentList = tabsList[currentIndex];

    // 列表为空时
    if (!currentList.length) {
      const config = EMPTY_CONFIG[currentIndex];
      return <RenderEmpty icon={config.icon} tips={config.tips} />;
    }
    return (
      <View style={listStyles.container}>
        {currentList.map((item: IFavorate) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              style={listStyles.item}
              key={item.id}>
              <Image style={listStyles.img} source={{uri: item.image}} />
              <Text style={listStyles.title}>{item.title}</Text>
              <View style={listStyles.box}>
                <Image
                  style={listStyles.avatar}
                  source={{uri: item.avatarUrl}}
                />
                <Text style={listStyles.username}>{item.userName}</Text>
                <HeartIcon size={20} isFavorite={item.isFavorite} />
                <Text style={listStyles.count}>{item.favoriteCount}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.root}>
      {RenderTabs()}
      {renderList()}
    </View>
  );
};

export default RenderContent;

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flex: 1,
    backgroundColor: '#fff',
  },
});
