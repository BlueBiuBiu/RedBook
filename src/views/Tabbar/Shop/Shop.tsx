import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import usePushy from '../../../hooks/usePushy'


const Shop = () => {
  return (
    usePushy(() => {
      return (
        <View style={styles.root}>
          <Text style={styles.txt}>pushy-Shop-1</Text>
        </View>
      )
    })
  )
}

export default Shop

const styles = StyleSheet.create({
  root: {},
  txt: {
    color: '#0004ff'
  }
})