import React from 'react'
import { Image, View } from 'react-native'

export const EmojiSticker = ({ stickerSource, imageSize }) => {
  return (
    <View style={{ top: -350 }}>
      <Image
        source={stickerSource}
        resizeMode='contain'
        style={{ width: imageSize, height: imageSize }}
      />
    </View>
  )
}
