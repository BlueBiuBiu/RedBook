import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';

import RenderCategoryModal, {
  RenderCategoryModalRef,
} from './RenderCategoryModal';
import {getCategoryList} from '../../../../service/modules/home';
import icon_arrow from '../../../../assets/images/icon_arrow.png';


const RenderCategory = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const modalRef = useRef<RenderCategoryModalRef>();

  useEffect(() => {
    getCategoryListM();
  }, []);

  const getCategoryListM = async () => {
    const res = await getCategoryList();
    const categoryArr: Category[] = res
    setCategoryList(categoryArr);
  };

  const myCategory = categoryList.filter(
    (item: Category) => item.isAdd,
  );

  return (
    <View style={styles.root}>
      <ScrollView
        contentContainerStyle={styles.scrollLayout}
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        {myCategory.map((item: Category, index: number) => {
          return (
            <TouchableOpacity
              style={styles.item}
              key={item.name}
              onPress={() => {
                setCurrentIndex(index);
              }}>
              <Text
                style={
                  currentIndex === index
                    ? styles.selectedItemTxt
                    : styles.itemTxt
                }>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          modalRef.current?.show();
        }}>
        <Image style={styles.IconArrow} source={icon_arrow} />
      </TouchableOpacity>
      <RenderCategoryModal
        ref={modalRef}
        categoryList={categoryList}
        refresh={getCategoryListM}
      />
    </View>
  );
};

export default RenderCategory;

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: 36,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  scrollLayout: {
    height: '100%',
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemTxt: {
    fontSize: 17,
    marginRight: 28,
  },
  selectedItemTxt: {
    color: '#333',
    fontSize: 17,
    marginRight: 28,
  },
  IconArrow: {
    width: 20,
    height: 20,
    tintColor: '#2f2f2f',
    position: 'relative',
    top: 2,
    transform: [{rotate: '-90deg'}],
  },
});
