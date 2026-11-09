import { useEffect, useRef, useState } from 'react'
import { Animated, StyleSheet, useWindowDimensions, View } from 'react-native'

interface ExpandProps {
  showLeft: boolean
  left: React.ReactNode
  right: React.ReactNode
}

const TIME = 400
const DELAY = 100

const Expand = ({ showLeft, left, right }: ExpandProps) => {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions()
  const [width, setWidth] = useState<number>(0)
  const [heightLeft, setHeightLeft] = useState<number>(0)
  const [heightRight, setHeightRight] = useState<number>(0)

  const newHeight = showLeft ? heightLeft : heightRight
  const newWidth = showLeft ? 0 : -width
  const height = useRef(new Animated.Value(newHeight)).current
  const translateX = useRef(new Animated.Value(newWidth)).current

  useEffect(() => {
    height.setValue(newHeight)
    translateX.setValue(newWidth)
  }, [heightLeft, heightRight, screenWidth, screenHeight])

  useEffect(() => {
    if (heightLeft < heightRight) {
      if (showLeft) {
        Animated.sequence([
          Animated.timing(translateX, {
            toValue: newWidth,
            duration: TIME,
            useNativeDriver: false,
          }),
          Animated.delay(DELAY),
          Animated.timing(height, {
            toValue: newHeight,
            duration: TIME,
            useNativeDriver: false,
          }),
        ]).start()
      } else {
        Animated.sequence([
          Animated.timing(height, {
            toValue: newHeight,
            duration: TIME,
            useNativeDriver: false,
          }),
          Animated.delay(DELAY),
          Animated.timing(translateX, {
            toValue: newWidth,
            duration: TIME,
            useNativeDriver: false,
          }),
        ]).start()
      }
    } else {
      if (showLeft) {
        Animated.sequence([
          Animated.timing(height, {
            toValue: newHeight,
            duration: TIME,
            useNativeDriver: false,
          }),
          Animated.delay(DELAY),
          Animated.timing(translateX, {
            toValue: newWidth,
            duration: TIME,
            useNativeDriver: false,
          }),
        ]).start()
      } else {
        Animated.sequence([
          Animated.timing(translateX, {
            toValue: newWidth,
            duration: TIME,
            useNativeDriver: false,
          }),
          Animated.delay(DELAY),
          Animated.timing(height, {
            toValue: newHeight,
            duration: TIME,
            useNativeDriver: false,
          }),
        ]).start()
      }
    }
  }, [showLeft])

  return (
    <View style={styles.clip}>
      <Animated.View
        style={{
          height,
          transform: [
            {
              translateX: translateX,
            },
          ],
        }}
      >
        <View
          style={styles.pane}
          onLayout={(e) => {
            setWidth(e.nativeEvent.layout.width)
            setHeightLeft(e.nativeEvent.layout.height)
          }}
        >
          {left}
        </View>
        <View
          style={[styles.pane, { left: width }]}
          onLayout={(e) => setHeightRight(e.nativeEvent.layout.height)}
        >
          {right}
        </View>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  clip: {
    overflow: 'hidden',
  },
  pane: {
    position: 'absolute',
    width: '100%',
  },
})

export default Expand
