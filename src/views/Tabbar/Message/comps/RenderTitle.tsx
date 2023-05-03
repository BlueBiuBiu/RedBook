import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, {useState} from 'react';

import MyG from '../../../../assets/images/MyG.png';
import icon_add from '../../../../assets/images/X2S.png';

const RenderTitle = () => {
  const [showModal, setShowModal] = useState(false);

  const show = () => {
    setShowModal(true);
  };

  const hide = () => {
    console.log('-r');

    setShowModal(false);
  };

  return (
    <View style={styles.root}>
      <Text style={styles.title}>消息</Text>
      <TouchableOpacity style={styles.box} onPress={show}>
        <Image style={styles.icon} source={MyG} />
        <Text style={styles.txt}>群聊</Text>
        <View style={styles.dot} />
      </TouchableOpacity>
      <Modal
        animationType="fade"
        statusBarTranslucent={true}
        transparent={true}
        visible={showModal}>
        <TouchableOpacity style={styles.modal} onPress={hide}>
          <View style={styles.container}>
            <TouchableOpacity style={styles.modalItem}>
              <Image style={styles.IconAdd} source={MyG} />
              <Text style={styles.modalTxt}>群聊广场</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalItem}>
              <Image style={styles.IconAdd} source={icon_add} />
              <Text style={styles.modalTxt}>创建群聊</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
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
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  box: {
    position: 'absolute',
    right: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  txt: {
    height: 23,
    marginLeft: 5,
    color: '#000',
    fontSize: 15,
  },
  dot: {
    width: 10,
    height: 10,
    backgroundColor: '#f00',
    borderRadius: 5,
    position: 'absolute',
    right: -5,
    top: 0,
  },
  modal: {
    width: '100%',
    height: '100%',
    backgroundColor: '#33333360',
  },
  container: {
    width: 120,
    backgroundColor: '#fff',
    position: 'absolute',
    right: 20,
    top: 85,
    borderRadius: 10,
  },
  modalItem: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  IconAdd: {
    width: 20,
    height: 20,
  },
  modalTxt: {
    fontSize: 14,
    color: '#000',
    marginLeft: 10,
  },
});
