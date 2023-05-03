import { StyleSheet, Text, View,Image, TouchableOpacity } from 'react-native'
import React from 'react'

import MyG from "../../../../assets/images/MyG.png"

const RenderTitle = () => {
  return (
    <View style={styles.root}>
      <Text style={styles.title}>消息</Text>
      <TouchableOpacity style={styles.box}>
        <Image style={styles.icon} source={MyG}/>
        <Text style={styles.txt}>群聊</Text>
        <View style={ styles.dot} />
      </TouchableOpacity>
    </View>
  )
}

export default RenderTitle

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 16,
    color:'#000',
    fontWeight: '500'
  },
  box: {
    position: 'absolute',
    right: 15,
    flexDirection: 'row',
    alignItems:'center'
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain'
  },
  txt: {
    height: 23,
    marginLeft: 5,
    color: '#000',
    fontSize: 15
  },
  dot: {
    width: 10,
    height: 10,
    backgroundColor: '#f00',
    borderRadius: 5,
    position: 'absolute',
    right: -5,
    top: 0
  }
})