import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';

import {useNavigation} from '@react-navigation/native';
import {
  createBottomTabNavigator,
  BottomTabBarProps,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs';
import {
  launchImageLibrary,
  ImagePickerResponse,
} from 'react-native-image-picker';
import Home from './Home/Home';
import Shop from './Shop/Shop';
import Message from './Message/Message';
import Mine from './Mine/Mine';
import Publish from './Publish/Publish';
import icon_tab_publish from '../../assets/images/icon_tab_publish.png';

const Tab = createBottomTabNavigator();

const MyTabBar = ({state, descriptors, navigation}: BottomTabBarProps) => {
  const useNavigate = useNavigation<BottomTabNavigationProp<any>>();

  const publishClick = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 1,
        includeBase64: true,
      },
      (res: ImagePickerResponse) => {
        const {assets} = res;
        console.log(assets);
        if(!assets) return
        const {uri, width, height, fileName, fileSize, type} = assets[0];
        
        console.log(`uri=${uri}, width=${width}, height=${height}`);
        console.log(`fileName=${fileName}, fileSize=${fileSize}, type=${type}`);
      },
    );
  };

  return (
    <View style={styles.tabBarLayout}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const isFocused = state.index === index;

        if (index === 2) {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={route.key}
              onPress={publishClick}>
              <Image style={styles.IconPublish} source={icon_tab_publish} />
            </TouchableOpacity>
          );
        }

        return (
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.item}
            key={route.key}
            onPress={() => {
              useNavigate.navigate(route.name);
            }}>
            <Text style={isFocused ? styles.txtFocus : styles.normal}>
              {options.title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const Tabbar = () => {
  return (
    <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen name="Home" component={Home} options={{title: '首页'}} />
      <Tab.Screen name="Shop" component={Shop} options={{title: '购物'}} />
      <Tab.Screen
        name="Publish"
        component={Publish}
        options={{title: '发布'}}
      />

      <Tab.Screen
        name="Message"
        component={Message}
        options={{title: '消息'}}
      />
      <Tab.Screen name="Mine" component={Mine} options={{title: '我'}} />
    </Tab.Navigator>
  );
};

export default Tabbar;

const styles = StyleSheet.create({
  tabBarLayout: {
    width: '100%',
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
  },
  item: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  IconPublish: {
    width: 52,
    resizeMode: 'contain',
  },
  txtFocus: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  normal: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#333',
  },
});
