import {
  StyleSheet,
  Text,
  Image,
  View,
  Linking,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {useAppDispatch, useAppSelector, shallowEqualApp} from '../../store';
import {fetchUserInfo} from '../../store/modules/userInfo';
import {formatPhone, replaceBlank} from '../../utils/format';
import icon_main_logo from '../../assets/images/icon_main_logo.png';
import icon_unselected from '../../assets/images/icon_unselected.png';
import icon_selected from '../../assets/images/icon_selected.png';
import icon_arrow from '../../assets/images/icon_arrow.png';
import icon_wx_small from '../../assets/images/icon_wx_small.png';
import icon_triangle from '../../assets/images/icon_triangle.png';
import icon_eye_open from '../../assets/images/icon_eye_open.png';
import icon_eye_close from '../../assets/images/icon_eye_close.png';
import icon_exchange from '../../assets/images/icon_exchange.png';
import icon_wx from '../../assets/images/icon_wx.png';
import icon_qq from '../../assets/images/icon_qq.webp';
import icon_close_modal from '../../assets/images/icon_close_modal.png';

const Login = () => {
  const [selected, setSelected] = useState(false);
  const [openEye, setOpenEye] = useState(true);
  const [loginWay, setLoginWay] = useState<'quick' | 'other'>('quick');

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const isPass = Boolean(phone && password && selected);

  const navigate = useNavigation<StackNavigationProp<any>>();
  const dispatch = useAppDispatch();

  const {userInfo} = useAppSelector(
    state => ({
      userInfo: state.userInfo.userInfo,
    }),
    shallowEqualApp,
  );

  // 协议链接
  const toLink = () => {
    Linking.openURL('https://www.baidu.com');
  };

  // 协议组件
  const renderProtocol = () => {
    const protocolStyles = StyleSheet.create({
      checkedLayout: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
      },
      checked: {
        width: 20,
        height: 20,
        marginTop: 1,
        resizeMode: 'contain',
      },
      checkedTxt: {
        fontSize: 14,
        color: '#ababab',
        marginLeft: 5,
      },
      protocolLayout: {
        marginLeft: 20,
        marginTop: 5,
      },
      protocolTxt: {
        fontSize: 14,
        color: '#262a2d',
      },
    });

    return (
      <View style={protocolStyles.checkedLayout}>
        <TouchableOpacity onPress={() => setSelected(!selected)}>
          <Image
            style={protocolStyles.checked}
            source={selected ? icon_selected : icon_unselected}
          />
        </TouchableOpacity>
        <Text style={protocolStyles.checkedTxt}>我已阅读同意</Text>
        <TouchableOpacity onPress={toLink}>
          <Text style={protocolStyles.protocolTxt}>《用户协议》</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toLink}>
          <Text style={protocolStyles.protocolTxt}>《隐私协议》</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={toLink}
          style={protocolStyles.protocolLayout}>
          <Text style={protocolStyles.protocolTxt}>
            《儿童/青少年个人信息保护规则》
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  // 快速登录
  const renderQuickLogin = () => {
    const quickLoginStyle = StyleSheet.create({
      root: {
        width: '100%',
        height: '100%',
        padding: 50,
        flexDirection: 'column-reverse',
        alignItems: 'center',
      },
      otherWay: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 100,
      },
      otherWayTxt: {
        lineHeight: 18,
        color: '#333',
      },
      arrow: {
        width: 16,
        resizeMode: 'contain',
        tintColor: '#333',
        transform: [{rotate: '180deg'}],
      },
      wechatLayout: {
        width: '100%',
        height: 56,
        lineHeight: 56,
        borderRadius: 28,
        backgroundColor: '#05c160',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      wechat: {
        width: 35,
        height: 35,
        resizeMode: 'contain',
      },
      wechatTxt: {
        height: 30,
        color: '#fff',
        fontSize: 18,
      },
      oneKeyLayout: {
        backgroundColor: '#ff2442',
        marginBottom: 20,
      },
      logo: {
        width: 150,
        resizeMode: 'contain',
        marginBottom: 100,
      },
    });

    return (
      <View style={quickLoginStyle.root}>
        {renderProtocol()}

        <TouchableOpacity
          style={quickLoginStyle.otherWay}
          onPress={() => {
            setSelected(false);
            setLoginWay('other');
          }}>
          <Text style={quickLoginStyle.otherWayTxt}>其他登录方式</Text>
          <Image style={quickLoginStyle.arrow} source={icon_arrow} />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          style={quickLoginStyle.wechatLayout}>
          <Image style={quickLoginStyle.wechat} source={icon_wx_small} />
          <Text style={quickLoginStyle.wechatTxt}>微信登录</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          style={[quickLoginStyle.wechatLayout, quickLoginStyle.oneKeyLayout]}>
          <Text style={quickLoginStyle.wechatTxt}>一键登录</Text>
        </TouchableOpacity>

        <Image style={quickLoginStyle.logo} source={icon_main_logo} />
      </View>
    );
  };

  // 其他方式登录
  const renderOtherLogin = () => {
    const otherLoginStyles = StyleSheet.create({
      root: {
        width: '100%',
        height: '100%',
        paddingVertical: 20,
        paddingHorizontal: 30,
        alignItems: 'center',
      },
      closeButton: {
        position: 'absolute',
        left: 10,
        top: 10,
      },
      IconClose: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
      },
      title: {
        marginTop: 30,
        fontSize: 26,
        color: '#000',
        fontWeight: '700',
      },
      subTitle: {
        fontSize: 15,
        color: '#9e9e9e',
        marginTop: 5,
      },
      phone: {
        width: '100%',
        flexDirection: 'row',
        height: 45,
        marginTop: 20,
        alignItems: 'center',
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1,
      },
      prefix: {
        fontSize: 18,
      },
      triangle: {
        width: 15,
        tintColor: '#a1a1a1',
        resizeMode: 'contain',
        marginLeft: 5,
      },
      phoneInput: {
        fontSize: 18,
        marginLeft: 10,
        color: '#9e9e9e',
      },
      password: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      IconEye: {
        width: 30,
        resizeMode: 'contain',
        tintColor: '#565656',
      },
      codeLogin: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      rowLayout: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      IconExchange: {
        width: 22,
        resizeMode: 'contain',
        marginRight: 2,
      },
      codeTxt: {
        color: '#22406e',
      },
      loginLayout: {
        width: '100%',
        height: 40,
        borderRadius: 28,
        backgroundColor: '#3aabf4',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
      },
      login: {
        color: '#fff',
        fontSize: 16,
      },
      otherLayout: {
        width: '100%',
        paddingHorizontal: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      IconWechat: {
        width: 40,
        resizeMode: 'contain',
      },
    });

    return (
      <View style={otherLoginStyles.root}>
        <TouchableOpacity
          style={otherLoginStyles.closeButton}
          onPress={() => {
            setSelected(false);
            setLoginWay('quick');
          }}>
          <Image style={otherLoginStyles.IconClose} source={icon_close_modal} />
        </TouchableOpacity>

        <Text style={otherLoginStyles.title}>密码登录</Text>
        <Text style={otherLoginStyles.subTitle}>
          未注册的手机号登录成功后将自动注册
        </Text>
        <View style={otherLoginStyles.phone}>
          <Text style={otherLoginStyles.prefix}>+86</Text>
          <Image style={otherLoginStyles.triangle} source={icon_triangle} />
          <TextInput
            style={otherLoginStyles.phoneInput}
            value={phone}
            maxLength={13}
            keyboardType="number-pad"
            onChangeText={(text: string) => {
              setPhone(formatPhone(text));
            }}
            placeholder="请输入手机号码"
            placeholderTextColor={'#9e9e9e'}
          />
        </View>

        <View style={[otherLoginStyles.phone, otherLoginStyles.password]}>
          <TextInput
            secureTextEntry={!openEye}
            style={otherLoginStyles.phoneInput}
            value={password}
            maxLength={6}
            onChangeText={(text: string) => {
              setPassword(text);
            }}
            placeholder="输入密码"
            placeholderTextColor={'#9e9e9e'}
          />
          <TouchableOpacity onPress={() => setOpenEye(!openEye)}>
            <Image
              style={otherLoginStyles.IconEye}
              source={openEye ? icon_eye_open : icon_eye_close}
            />
          </TouchableOpacity>
        </View>

        <View style={otherLoginStyles.codeLogin}>
          <TouchableOpacity style={otherLoginStyles.rowLayout}>
            <Image
              style={otherLoginStyles.IconExchange}
              source={icon_exchange}
            />
            <Text style={otherLoginStyles.codeTxt}>验证码登录</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={otherLoginStyles.codeTxt}>忘记密码？</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          style={[
            otherLoginStyles.loginLayout,
            {backgroundColor: isPass ? '#3aabf4' : '#dddddd'},
          ]}
          onPress={async () => {
            if (!isPass) {
              return;
            }

            dispatch(
              fetchUserInfo({
                phone: replaceBlank(phone),
                password,
                cb: (res: any) => {                  
                  if (Object.keys(res).length) {
                    navigate.push('Tabbar');
                  }
                },
              }),
            );
            
          }}>
          <Text style={otherLoginStyles.login}>登录</Text>
        </TouchableOpacity>

        {renderProtocol()}

        <View style={otherLoginStyles.otherLayout}>
          <TouchableOpacity>
            <Image style={otherLoginStyles.IconWechat} source={icon_wx} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image style={otherLoginStyles.IconWechat} source={icon_qq} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.root}>
      {loginWay === 'quick' ? renderQuickLogin() : renderOtherLogin()}
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  root: {},
});
