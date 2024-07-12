import React from 'react'
import { Image, StyleSheet } from 'react-native'

export const ImageViewer = ({ source }) => {
  return <Image source={source} style={styles.image} resizeMode='contain' />
}

const styles = StyleSheet.create({
  image: {
    width: 320, // Default width
    height: 440, // Default height
    borderRadius: 18,
  },
})
