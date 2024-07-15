import React from 'react'
import { Dimensions } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
const { width, height } = Dimensions.get('screen')

export const EmojiSticker = ({ stickerSource, imageSize }) => {
  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)
  const scale = useSharedValue(1)
  const startScale = useSharedValue(0)

  const pinch = Gesture.Pinch()
    .onStart(() => {
      startScale.value = scale.value
    })
    .onUpdate((event) => {
      scale.value = clamp(
        startScale.value * event.scale,
        0.5,
        Math.min(width / 100, height / 100)
      )
    })
    .runOnJS(true)

  const boxAnimatedStyles = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

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
    <GestureDetector gesture={pinch}>
      <GestureDetector gesture={drag}>
        <Animated.View style={[viewStyle, { top: -350 }]}>
          <GestureDetector gesture={doubleTap}>
            <Animated.Image
              source={stickerSource}
              resizeMode='contain'
              style={[
                imageStyle,
                { width: imageSize, height: imageSize },
                boxAnimatedStyles,
              ]}
            />
          </GestureDetector>
        </Animated.View>
      </GestureDetector>
    </GestureDetector>
  )
}

function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max)
}
