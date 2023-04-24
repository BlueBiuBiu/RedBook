import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useState, useRef} from 'react';

import icon_daily from '../../../../assets/images/icon_daily.png';
import icon_search from '../../../../assets/images/icon_search.png';

const RenderTitle = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const tabs = ['关注', '发现', '南京'];

  return (
    <View style={styles.root}>
      <TouchableOpacity>
        <Image style={styles.icon} source={icon_daily} />
      </TouchableOpacity>
      <View style={styles.tabs}>
        {tabs.map((item: string, index: number) => {
          return (
            <TouchableOpacity
              style={styles.tab}
              key={item}
              onPress={() => setCurrentIndex(index)}>
              <Text
                style={
                  currentIndex === index ? styles.selectedTabTxt : styles.tabTxt
                }>
                {item}
              </Text>
              {currentIndex === index && <View style={styles.line} />}
            </TouchableOpacity>
          );
        })}
      </View>
      <TouchableOpacity>
        <Image style={styles.icon} source={icon_search} />
      </TouchableOpacity>
    </View>
  );
};

export default RenderTitle;

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderBottomColor: '#ececec',
    borderBottomWidth: 1,
  },
  icon: {
    width: 35,
    height: 35,
    position: 'relative',
    top: 3,
    resizeMode: 'contain',
  },
  tabs: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tab: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabTxt: {
    fontSize: 18,
    fontWeight: '600',
    color: '#949494',
    paddingHorizontal: 10,
  },
  selectedTabTxt: {
    fontSize: 18,
    fontWeight: '600',
    color: '#343434',
    paddingHorizontal: 10,
  },
  line: {
    width: 26,
    height: 2,
    position: 'absolute',
    bottom: -6,
    backgroundColor: '#ff2442',
  },
});
