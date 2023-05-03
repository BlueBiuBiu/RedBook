import {
  Modal,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  Dimensions,
  LayoutAnimation,
} from 'react-native';
import React, {
  forwardRef,
  useState,
  useImperativeHandle,
  useEffect,
} from 'react';

import Cache from '../../../../utils/Cache';
import icon_arrow from '../../../../assets/images/icon_arrow.png';
import icon_delete from '../../../../assets/images/icon_delete.png';

export interface RenderCategoryModalRef {
  show: () => void;
  hide: () => void;
}

interface IProps {
  categoryList: Category[];
  refresh: () => void;
}

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const RenderCategoryModal = forwardRef((props: IProps, ref) => {
  const {categoryList, refresh} = props;

  const [myCategory, setMyCategory] = useState<Category[]>([]);
  const [recommendCategory, setRecommendCategory] = useState<Category[]>([]);
  const [visible, setVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const show = () => {
    setVisible(true);
  };

  const hide = () => {
    refresh();
    setVisible(false);
  };

  const removeTab = (tab: Category) => {
    // 默认的不可移除
    if (tab.default) {
      return;
    }

    LayoutAnimation.easeInEaseOut();

    const filterMyCategory = myCategory.filter(item => item.name !== tab.name);
    const newItem = {...tab, isAdd: false};
    const newMyCategory = [...filterMyCategory];
    const newRecommendCategory = [...recommendCategory, newItem];

    setMyCategory(newMyCategory);
    setRecommendCategory(newRecommendCategory);
  };

  const addTab = (tab: Category) => {
    LayoutAnimation.easeInEaseOut();

    const filterMyCategory = recommendCategory.filter(
      item => item.name !== tab.name,
    );
    const newItem = {...tab, isAdd: true};
    const newMyCategory = [...myCategory, newItem];
    const newRecommendCategory = [...filterMyCategory];

    setMyCategory(newMyCategory);
    setRecommendCategory(newRecommendCategory);
  };

  useEffect(() => {
    const myCategoryArr = categoryList.filter(item => item.isAdd);
    const recommendCategoryArr = categoryList.filter(item => !item.isAdd);
    setMyCategory(myCategoryArr);
    setRecommendCategory(recommendCategoryArr);
  }, [categoryList]);

  useImperativeHandle(ref, () => {
    return {
      show,
      hide,
    };
  });

  return (
    <Modal
      style={styles.root}
      visible={visible}
      animationType="fade"
      statusBarTranslucent={true}
      transparent={true}
      onRequestClose={hide}>
      <View style={styles.content}>
        <View style={styles.myCategory}>
          <Text style={styles.title}>我的频道</Text>
          <Text style={styles.subTitle}>点击进入频道</Text>
          <TouchableOpacity
            onPress={() => {
              LayoutAnimation.easeInEaseOut();
              setIsEdit(!isEdit);
              Cache.setCache('categoryList', [
                ...myCategory,
                ...recommendCategory,
              ]);
            }}>
            <Text style={styles.operate}>
              {isEdit ? '完成编辑' : '进入编辑'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={hide}>
            <Image style={styles.IconArrow} source={icon_arrow} />
          </TouchableOpacity>
        </View>
        <View style={styles.tabLayout}>
          {myCategory.map((item: Category) => {
            return (
              <TouchableOpacity
                key={item.name}
                onPress={() => {
                  if (!isEdit) {
                    return;
                  }
                  removeTab(item);
                }}>
                <Text style={item.default ? styles.defaultTab : styles.tab}>
                  {item.name}
                </Text>
                {isEdit && !item.default && (
                  <Image style={styles.IconDelect} source={icon_delete} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.myCategory}>
          <Text style={styles.title}>推荐频道</Text>
          <Text style={styles.subTitle}>点击添加频道</Text>
        </View>
        <View style={styles.tabLayout}>
          {recommendCategory.map((item: Category) => {
            return (
              <TouchableOpacity
                key={item.name}
                onPress={() => {
                  if (!isEdit) {
                    return;
                  }
                  addTab(item);
                }}>
                <Text style={styles.tab}>
                  {isEdit && <Text style={styles.add}>+</Text>}
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      <View style={styles.mask} />
    </Modal>
  );
});

export default RenderCategoryModal;

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
  },
  content: {
    width: '100%',
    marginTop: (StatusBar.currentHeight || 0) + 56,
    backgroundColor: '#fff',
    paddingBottom: 10,
  },
  mask: {
    flex: 1,
    backgroundColor: '#00000060',
  },
  myCategory: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#333',
  },
  subTitle: {
    fontSize: 14,
    flex: 1,
    marginLeft: 10,
  },
  operate: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
    color: '#4776ac',
    backgroundColor: '#ebf0f1',
    marginRight: 10,
  },
  IconArrow: {
    width: 20,
    height: 20,
    tintColor: '#a8a8a8',
    resizeMode: 'contain',
    transform: [{rotate: '90deg'}],
  },
  tabLayout: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  defaultTab: {
    width: (SCREEN_WIDTH - 75) / 4,
    color: '#000',
    backgroundColor: '#f6f6f6',
    paddingHorizontal: 20,
    paddingVertical: 10,
    textAlign: 'center',
    marginLeft: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  tab: {
    width: (SCREEN_WIDTH - 75) / 4,
    color: '#000',
    borderColor: '#f3f3f3',
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    textAlign: 'center',
    marginLeft: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  IconDelect: {
    width: 15,
    height: 15,
    position: 'absolute',
    right: -6,
    top: -3,
    resizeMode: 'contain',
  },
  add: {
    color: '#666',
    position: 'relative',
  },
});
