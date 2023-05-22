import {Alert, Linking, Platform} from 'react-native';
import React, {useEffect} from 'react';
import {
  isFirstTime,
  isRolledBack,
  packageVersion,
  currentVersion,
  checkUpdate,
  simpleUpdate,
  downloadUpdate,
  switchVersion,
  switchVersionLater,
  markSuccess,
  downloadAndInstallApk,
} from 'react-native-update';
import _updateConfig from '../../update.json';
const {appKey} = _updateConfig[Platform.OS as 'android'];

const usePushy = (PushyComponent: any) => {
  const judgeSuccess = () => {
    if (isFirstTime) {
      // 必须调用此更新成功标记方法
      // 否则默认更新失败，下一次启动会自动回滚
      markSuccess();
      console.log('更新完成');
    } else if (isRolledBack) {
      console.log('刚刚更新失败了,版本被回滚.');
    }
  };

  const doUpdate = async (info: any) => {
    try {
      const hash = await downloadUpdate(info, {
        onDownloadProgress: ({received, total}) => {},
      });
      if (!hash) {
        return;
      }
      Alert.alert('提示', '下载完毕,是否重启应用?', [
        {
          text: '是',
          onPress: () => {
            switchVersion(hash);
          },
        },
        {text: '否'},
        {
          text: '下次启动时',
          onPress: () => {
            switchVersionLater(hash);
          },
        },
      ]);
    } catch (err: any) {
      Alert.alert('更新失败', err.message);
    }
  };

  // 检查更新
  const _checkUpdate = async () => {
    if (__DEV__) {
      // 开发模式不支持热更新，跳过检查
      return;
    }
    let info: any;
    try {
      info = await checkUpdate(appKey);
    } catch (err: any) {
      Alert.alert('更新检查失败', err.message);
      return;
    }
    if (info.expired) {
      Alert.alert('提示', '您的应用版本已更新，点击确定下载安装新版本', [
        {
          text: '确定',
          onPress: () => {
            if (info.downloadUrl) {
              // apk可直接下载安装
              if (
                Platform.OS === 'android' &&
                info.downloadUrl.endsWith('.apk')
              ) {
                downloadAndInstallApk({
                  url: info.downloadUrl,
                  onDownloadProgress: ({received, total}) => {},
                });
              } else {
                Linking.openURL(info.downloadUrl);
              }
            }
          },
        },
      ]);
    } else if (info.upToDate) {
      Alert.alert('提示', '您的应用版本已是最新.');
    } else {
      Alert.alert(
        '提示',
        '检查到新的版本' + info.name + ',是否下载?\n' + info.description,
        [
          {
            text: '是',
            onPress: () => {
              doUpdate(info);
            },
          },
          {text: '否'},
        ],
      );
    }
  };

  useEffect(() => {
    judgeSuccess();
    _checkUpdate();
  }, []);

  return <PushyComponent />;
};

export default usePushy;
