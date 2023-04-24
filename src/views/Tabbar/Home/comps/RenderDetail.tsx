import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import dayjs from 'dayjs';
import HeartIcon from '../../../../components/HeartIcon';
import {ImageSlider} from '../../../../components/slidePager';
import {StackScreenProps} from '@react-navigation/stack';
import {getDetailById} from '../../../../service/modules/home';
import icon_arrow from '../../../../assets/images/icon_arrow.png';
import icon_share from '../../../../assets/images/icon_share.png';
import icon_gift from '../../../../assets/images/gift.png';
import icon_edit_comment from '../../../../assets/images/icon_edit_comment.png';
import icon_collection from '../../../../assets/images/icon_collection.png';
import icon_collection_selected from '../../../../assets/images/icon_collection_selected.png';
import icon_comment from '../../../../assets/images/icon_comment.png';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const RenderDetail = ({route}: StackScreenProps<any>) => {
  const {id} = route.params!;
  const [detailInfo, setDetailInfo] = useState<Article>();
  const [bannerHeight, setBannerHeight] = useState(0);

  const navigate = useNavigation<StackNavigationProp<any>>();

  useEffect(() => {
    getDetailInfo();
  }, [id]);

  useEffect(() => {
    if (detailInfo?.images[0]) {
      Image.getSize(detailInfo?.images[0], (width: number, height: number) => {
        const showHeight = (SCREEN_WIDTH * height) / width;
        setBannerHeight(showHeight);
      });
    }
  }, [detailInfo?.images]);

  const getDetailInfo = async () => {
    const res = await getDetailById(id);
    setDetailInfo(res);
  };

  const renderTitle = () => {
    const titleStyles = StyleSheet.create({
      root: {
        width: '100%',
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
      },
      IconArrow: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
      },
      avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        resizeMode: 'cover',
        marginLeft: 10,
      },
      title: {
        color: '#000',
        marginLeft: 10,
        fontSize: 16,
        flex: 1,
      },
      attention: {
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderRadius: 15,
        borderColor: '#e2e2e2',
        color: '#d586a2',
      },
      IconShare: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
        marginLeft: 10,
        marginRight: 10,
      },
    });
    return (
      <View style={titleStyles.root}>
        <TouchableOpacity
          onPress={() => {
            navigate.pop();
          }}>
          <Image style={titleStyles.IconArrow} source={icon_arrow} />
        </TouchableOpacity>
        <Image
          style={titleStyles.avatar}
          source={{uri: detailInfo?.avatarUrl}}
        />
        <Text style={titleStyles.title}>{detailInfo?.userName}</Text>
        <Text style={titleStyles.attention}>关注</Text>
        <Image style={titleStyles.IconShare} source={icon_share} />
      </View>
    );
  };

  const renderBanner = () => {
    const banners: any[] = [];
    detailInfo?.images.forEach((url: string) => {
      banners.push({img: url});
    });

    return (
      <View style={[styles.imageSlider, {height: bannerHeight}]}>
        <ImageSlider
          data={banners}
          autoPlay={false}
          closeIconColor="#ffffff"
          caroselImageStyle={{height: bannerHeight}}
          indicatorContainerStyle={{bottom: -40}}
          inActiveIndicatorStyle={styles.defaultDot}
          activeIndicatorStyle={styles.activeDot}
        />
      </View>
    );
  };

  const renderDesc = () => {
    const descStyles = StyleSheet.create({
      root: {
        paddingHorizontal: 15,
      },
      title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
      },
      subTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        borderBottomColor: '#e2dfdf',
        borderBottomWidth: 1,
        paddingBottom: 20,
      },
      date: {
        fontSize: 12,
        color: '#666',
      },
      location: {
        fontSize: 12,
        color: '#666',
        marginLeft: 5,
        position: 'relative',
        bottom: 1,
      },
    });

    return (
      <View style={descStyles.root}>
        <Text style={descStyles.title}>{detailInfo?.title}</Text>
        <View style={descStyles.subTitle}>
          <Text style={descStyles.date}>{detailInfo?.dateTime}</Text>
          <Text style={descStyles.location}>{detailInfo?.location}</Text>
        </View>
      </View>
    );
  };

  const renderComment = () => {
    const commentStyles = StyleSheet.create({
      root: {
        paddingHorizontal: 15,
        marginBottom: 60,
      },
      title: {
        color: '#333',
        fontSize: 14,
        marginTop: 20,
      },
      commentLayout: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
      },
      IconGift: {
        width: 20,
        resizeMode: 'contain',
        position: 'relative',
        top: 2,
      },
      inputWrapper: {
        flex: 1,
        borderRadius: 20,
        marginLeft: 15,
        marginTop: 10,
        backgroundColor: '#f6f6f6',
      },
      input: {
        height: '100%',
        marginLeft: 10,
      },
      commentContent: {
        flexDirection: 'row',
        marginTop: 25,
      },
      avatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
        resizeMode: 'cover',
      },
      content: {
        flex: 1,
        marginLeft: 10,
        justifyContent: 'space-between',
      },
      username: {
        fontSize: 14,
        color: '#666',
        position: 'relative',
        bottom: 5,
      },
      message: {
        fontSize: 15,
        color: '#333',
      },
      desc: {
        fontSize: 12,
        color: '#ccc',
      },
      contentRight: {
        alignItems: 'center',
        width: 35,
      },
      favoriteCount: {
        fontSize: 14,
        color: '#333',
      },
      subCommentLayout: {
        marginLeft: 35,
      },
    });

    const comments = detailInfo?.comments || [];
    return (
      <View style={commentStyles.root}>
        <Text style={commentStyles.title}>
          共{detailInfo?.comments?.length || 0}条评论
        </Text>
        <View style={commentStyles.commentLayout}>
          <Image style={commentStyles.IconGift} source={icon_gift} />
          <View style={commentStyles.inputWrapper}>
            <TextInput
              style={commentStyles.input}
              placeholderTextColor={'#333'}
              placeholder="说点什么吧，万一火了呢~"
            />
          </View>
        </View>
        {comments?.map((item, index) => {
          return (
            <View key={index}>
              <View style={commentStyles.commentContent}>
                <Image
                  style={commentStyles.avatar}
                  source={{uri: item.avatarUrl}}
                />
                <View style={commentStyles.content}>
                  <Text style={commentStyles.username}>{item.userName}</Text>
                  <Text style={commentStyles.message}>
                    {item.message}
                    <Text style={commentStyles.desc}>
                      {'  '}
                      {dayjs(item.dateTime).format('MM-DD')} {item.location}
                    </Text>
                  </Text>
                </View>
                <View style={commentStyles.contentRight}>
                  <HeartIcon isFavorite={item.isFavorite} size={20} />
                  <Text style={commentStyles.favoriteCount}>
                    {item.favoriteCount}
                  </Text>
                </View>
              </View>
              <View style={commentStyles.subCommentLayout}>
                {item.children?.map((subItem, indey) => {
                  return (
                    <View key={indey} style={commentStyles.commentContent}>
                      <Image
                        style={commentStyles.avatar}
                        source={{uri: subItem.avatarUrl}}
                      />
                      <View style={commentStyles.content}>
                        <Text style={commentStyles.username}>
                          {subItem.userName}
                        </Text>
                        <Text style={commentStyles.message}>
                          {subItem.message}
                          <Text style={commentStyles.desc}>
                            {'  '}
                            {dayjs(subItem.dateTime).format('MM-DD')}{' '}
                            {subItem.location}
                          </Text>
                        </Text>
                      </View>
                      <View style={commentStyles.contentRight}>
                        <HeartIcon isFavorite={subItem.isFavorite} size={20} />
                        <Text style={commentStyles.favoriteCount}>
                          {subItem.favoriteCount}
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>
          );
        })}
      </View>
    );
  };

  const renderOperate = () => {
    const operateStyles = StyleSheet.create({
      root: {
        width: '100%',
        height: 56,
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 15,
        borderTopColor: '#d1cbcb',
        borderTopWidth: 1,
        paddingBottom: 5,
      },
      IconEidt: {
        width: 20,
        resizeMode: 'contain',
        marginLeft: 15,
      },
      inputWrapper: {
        flex: 1,
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 20,
        marginLeft: 15,
        marginTop: 10,
        backgroundColor: '#f6f6f6',
      },
      input: {
        height: '100%',
      },
      txt: {
        fontSize: 14,
        color: '#333',
        marginLeft: 5,
      },
      operateLayout: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        paddingTop: 8,
      },
      button: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
      },
    });

    return (
      <View style={operateStyles.root}>
        <View style={operateStyles.inputWrapper}>
          <Image style={operateStyles.IconEidt} source={icon_edit_comment} />
          <TextInput style={operateStyles.input} placeholder="说点什么..." />
        </View>

        <View style={operateStyles.operateLayout}>
          <HeartIcon isFavorite={detailInfo?.isFavorite!} size={25} />
          <Text style={operateStyles.txt}>{detailInfo?.favoriteCount}</Text>
        </View>

        <View style={operateStyles.operateLayout}>
          <Image
            style={operateStyles.button}
            source={
              detailInfo?.isCollection
                ? icon_collection_selected
                : icon_collection
            }
          />
          <Text style={operateStyles.txt}>{detailInfo?.favoriteCount}</Text>
        </View>

        <View style={operateStyles.operateLayout}>
          <Image style={operateStyles.button} source={icon_comment} />
          <Text style={operateStyles.txt}>{detailInfo?.comments?.length}</Text>
        </View>
      </View>
    );
  };

  return detailInfo ? (
    <>
      <ScrollView style={styles.root}>
        {renderTitle()}
        {renderBanner()}
        {renderDesc()}
        {renderComment()}
      </ScrollView>
      {renderOperate()}
    </>
  ) : (
    ''
  );
};

export default RenderDetail;

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
  imageSlider: {
    paddingBottom: 30,
  },
  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ff2442',
  },
  defaultDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#c0c0c0',
  },
});
