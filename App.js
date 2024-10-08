import * as ImagePicker from 'expo-image-picker'
import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Button } from './components/button'
import { CircleButton } from './components/circle-button'
import { EmojiList } from './components/emoji-list'
import { EmojiPicker, useDisclosure } from './components/emoji-picker'
import { EmojiSticker } from './components/emoji-sticker'
import { IconButton } from './components/icon-button'
import { ImageViewer } from './components/image-viewer'
const PlaceholderImage = require('./assets/images/background-image.png')

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [pickedEmoji, setPickedEmoji] = useState(null)
  const { isOpen, open, close } = useDisclosure()
  const [showAppOptions, setShowAppOptions] = useState(false)
  const onReset = () => {
    setShowAppOptions(false)
    setSelectedImage(null)
    setPickedEmoji(null)
  }

  const onAddSticker = () => {
    open()
  }

  const onSaveImageAsync = async () => {
    // we will implement this later
  }
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    })

    if (!result.canceled) {
      setSelectedImage({ uri: result.assets[0].uri })
      setShowAppOptions(true)
    } else {
      alert('You did not select any image.')
    }
  }
  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer source={selectedImage ?? PlaceholderImage} />
        {pickedEmoji && (
          <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />
        )}
      </View>
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon='refresh' label='Reset' onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton
              icon='save-alt'
              label='Save'
              onPress={onSaveImageAsync}
            />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button
            theme='primary'
            label='Choose a photo'
            onPress={pickImageAsync}
          />
          <Button
            label='Use this photo'
            onPress={() => setShowAppOptions(true)}
          />
        </View>
      )}
      <EmojiPicker isVisible={isOpen} onClose={close}>
        <EmojiList
          onSelect={(emoji) => {
            setPickedEmoji(emoji)
            close()
          }}
        />
      </EmojiPicker>
      <StatusBar style='auto' />
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
})
