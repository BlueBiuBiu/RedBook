import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useRef } from 'react';

import RenderSideMenu from './RenderSideMenu';
import icon_avatar from '../../../../assets/images/avatar.png';
import icon_code from '../../../../assets/images/icon_code.png';
import icon_add from '../../../../assets/images/icon_add.png';
import icon_bg from '../../../../assets/images/icon_bg.png';
import icon_eSh from '../../../../assets/images/eSh.png';
import icon_female from '../../../../assets/images/icon_female.png';
import icon_share from '../../../../assets/images/icon_share.png';
import icon_bZ5 from '../../../../assets/images/bZ5.png';
import icon_menu from '../../../../assets/images/icon_menu.png';

const RenderTitle = () => {
  const sideMenuRef = useRef<ISideMenuRef>()

  return (
    <>
      <ImageBackground source={icon_bg} style={styles.root}>
        <View style={styles.top}>
          <TouchableOpacity onPress={() => sideMenuRef.current?.show()}>
            <Image style={styles.IconMenu} source={icon_menu} />
          </TouchableOpacity>
          <View style={styles.topRight}>
            <TouchableOpacity>
              <Image style={styles.IconCar} source={icon_bZ5} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image style={styles.IconShare} source={icon_share} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.center}>
          <View style={styles.centerLeft}>
            <Image style={styles.IconAvatar} source={icon_avatar} />
            <Image style={styles.IconAdd} source={icon_add} />
          </View>
          <View style={styles.centerRight}>
            <Text style={styles.name}>大公爵</Text>
            <View style={styles.descBox}>
              <Text style={styles.desc}>小红书号：12233334444</Text>
              <Image style={styles.IconCode} source={icon_code} />
            </View>
          </View>
        </View>
        <Text style={styles.tip}>点击这里，填写简介</Text>
        <View style={styles.IconFamaleBg}>
          <Image style={styles.IconFamale} source={icon_female} />
        </View>
        <View style={styles.bottom}>
          <View style={styles.bottomLeft}>
            <TouchableOpacity style={styles.operate}>
              <Text style={styles.count}>14</Text>
              <Text style={styles.operateTitle}>关注</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.operate}>
              <Text style={styles.count}>7</Text>
              <Text style={styles.operateTitle}>粉丝</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.operate}>
              <Text style={styles.count}>0</Text>
              <Text style={styles.operateTitle}>获赞与收藏</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bottomRight}>
            <TouchableOpacity>
              <Text style={styles.editTxt}>编辑资料</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.IconSettingBg}>
              <Image style={styles.IconSetting} source={icon_eSh} />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
      <RenderSideMenu ref={sideMenuRef}/>
    </>
  );
};

export default RenderTitle;

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  IconMenu: {
    width: 30,
    resizeMode: 'contain',
  },
  IconCar: {
    width: 30,
    resizeMode: 'contain',
    tintColor: '#fff',
    marginRight: 16,
  },
  IconShare: {
    width: 30,
    resizeMode: 'contain',
  },
  topRight: {
    flexDirection: 'row',
  },
  center: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  centerLeft: {
    width: 100,
    height: 100,
    position: 'relative',
  },
  IconAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    resizeMode: 'cover',
  },
  IconAdd: {
    position: 'absolute',
    right: 0,
    bottom: -15,
    width: 25,
    resizeMode: 'contain',
  },
  centerRight: {
    flexDirection: 'column',
    marginLeft: 16,
    justifyContent: 'center',
  },
  name: {
    fontSize: 22,
    color: '#fff',
  },
  descBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  desc: {
    fontSize: 14,
    color: '#a39fa1',
  },
  IconCode: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    marginLeft: 5,
  },
  tip: {
    marginVertical: 16,
    color: '#fff',
    fontSize: 16,
  },
  IconFamaleBg: {
    width: 36,
    height: 24,
    borderRadius: 20,
    backgroundColor: '#715f6c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  IconFamale: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  bottomLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  operate: {
    marginRight: 25,
  },
  count: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  operateTitle: {
    color: '#fff',
    fontSize: 14,
  },
  bottomRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editTxt: {
    color: '#fff',
    fontSize: 16,
    paddingVertical: 5,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderColor: '#715f6c',
    borderWidth: 1,
  },
  IconSettingBg: {
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginLeft: 16,
    borderColor: '#715f6c',
    borderWidth: 1,
  },
  IconSetting: {
    width: 20,
    height: 20,
    tintColor: '#fff',
  },
});
