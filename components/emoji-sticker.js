import React from 'react'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'

export const EmojiSticker = ({ stickerSource, imageSize }) => {
  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)

  const viewStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: withSpring(translateX.value) },
        { translateY: withSpring(translateY.value) },
      ],
    }
  })

  const scaleImage = useSharedValue(imageSize)

  const imageStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(scaleImage.value),
      height: withSpring(scaleImage.value),
    }
  })

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      if (scaleImage.value !== imageSize * 2) {
        scaleImage.value = scaleImage.value * 2
      }
    })

  const drag = Gesture.Pan().onChange(({ changeX, changeY }) => {
    translateX.value += changeX
    translateY.value += changeY
  })

  return (
    <GestureDetector gesture={drag}>
      <Animated.View style={[viewStyle, { top: -350 }]}>
        <GestureDetector gesture={doubleTap}>
          <Animated.Image
            source={stickerSource}
            resizeMode='contain'
            style={[imageStyle, { width: imageSize, height: imageSize }]}
          />
        </GestureDetector>
      </Animated.View>
    </GestureDetector>
  )
}
