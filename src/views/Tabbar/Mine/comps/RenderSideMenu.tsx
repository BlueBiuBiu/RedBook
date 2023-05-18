import {
  Dimensions,
  Image,
  LayoutAnimation,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {forwardRef, useImperativeHandle, useState} from 'react';

import icon_setting from '../../../../assets/images/icon_setting.png';
import icon_service from '../../../../assets/images/icon_service.png';
import icon_scan from '../../../../assets/images/icon_scan.png';

import icon_fid_user from '../../../../assets/images/icon_find_user.png';
import icon_draft from '../../../../assets/images/icon_draft.png';
import icon_create_center from '../../../../assets/images/icon_create_center.png';
import icon_browse_histroy from '../../../../assets/images/icon_browse_history.png';
import icon_packet from '../../../../assets/images/icon_packet.png';
import icon_free_net from '../../../../assets/images/icon_free_net.png';
import icon_nice_goods from '../../../../assets/images/icon_nice_goods.png';
import icon_orders from '../../../../assets/images/icon_orders.png';
import icon_shop_car from '../../../../assets/images/icon_shop_car.png';
import icon_coupon from '../../../../assets/images/icon_coupon.png';
import icon_wish from '../../../../assets/images/icon_wish.png';
import icon_red_vip from '../../../../assets/images/icon_red_vip.png';
import icon_community from '../../../../assets/images/icon_community.png';
import icon_exit from '../../../../assets/images/icon_exit.png';

const MENUS = [
  [{icon: icon_fid_user, name: '发现好友'}],
  [
    {icon: icon_draft, name: '我的草稿'},
    {icon: icon_create_center, name: '创作中心'},
    {icon: icon_browse_histroy, name: '浏览记录'},
    {icon: icon_packet, name: '钱包'},
    {icon: icon_free_net, name: '免流量'},
    {icon: icon_nice_goods, name: '好物体验'},
  ],
  [
    {icon: icon_orders, name: '订单'},
    {icon: icon_shop_car, name: '购物车'},
    {icon: icon_coupon, name: '卡券'},
    {icon: icon_wish, name: '心愿单'},
    {icon: icon_red_vip, name: '小红书会员'},
  ],
  [
    {icon: icon_community, name: '社区公约'},
    {icon: icon_exit, name: '退出登陆'},
  ],
];

const BOTTOM_MENUS = [
  {icon: icon_setting, txt: '设置'},
  {icon: icon_service, txt: '帮助与客服'},
  {icon: icon_scan, txt: '扫一扫'},
];

const {width: SCREEN_WIDTH} = Dimensions.get('screen');
const contentWidth = SCREEN_WIDTH * 0.75;

const RenderSideMenu = forwardRef((props: any, ref) => {
  const [visible, setVisible] = useState(true);
  const [open, setOpen] = useState(false);

  const show = () => {
    setVisible(true);
    setTimeout(() => {
      LayoutAnimation.easeInEaseOut();
      setOpen(true);
    }, 100);
  };

  const hide = () => {
    LayoutAnimation.easeInEaseOut();
    setOpen(false);
    setTimeout(() => {
      setVisible(false);
    }, 300);
  };

  useImperativeHandle(ref, () => {
    return {
      show,
      hide,
    };
  });

  const RenderContent = () => {
    const contentStyle = StyleSheet.create({
      root: {
        width: contentWidth,
        height: '100%',
        backgroundColor: '#fff',
        paddingHorizontal: 25,
        justifyContent: 'flex-end',
      },
      item: {},
      box: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
      },
      img: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
      },
      txt: {
        color: '#000',
        fontWeight: 'bold',
        marginLeft: 15,
      },
      bottomLayout: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10,
      },
      bottomBox: {
        alignItems: 'center',
      },
      btn: {
        borderRadius: 19,
        padding: 6,
        backgroundColor: '#e6e6e6',
      },
      btnImg: {
        width: 26,
        height: 26,
        resizeMode: 'contain',
      },
      bottomTxt: {
        color: '#413e3e',
        fontSize: 13,
      },
    });

    return (
      <View style={[contentStyle.root, {marginLeft: open ? 0 : -contentWidth}]}>
        {MENUS.map((item, index) => {
          return (
            <View style={contentStyle.item}>
              {item.map((iten: ISideMenuItem) => {
                return (
                  <TouchableOpacity style={contentStyle.box}>
                    <Image style={contentStyle.img} source={iten.icon} />
                    <Text style={contentStyle.txt}>{iten.name}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          );
        })}
        <View style={contentStyle.bottomLayout}>
          {BOTTOM_MENUS.map(item => {
            return (
              <TouchableOpacity style={contentStyle.bottomBox}>
                <View style={contentStyle.btn}>
                  <Image style={contentStyle.btnImg} source={item.icon} />
                </View>
                <Text style={contentStyle.bottomTxt}>{item.txt}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <Modal
      transparent={true}
      statusBarTranslucent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={hide}>
      <TouchableOpacity activeOpacity={1} style={styles.root} onPress={hide}>
        {RenderContent()}
      </TouchableOpacity>
    </Modal>
  );
});

export default RenderSideMenu;

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: '#00000060',
  },
});
