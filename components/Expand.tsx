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
    const animate = (value: Animated.Value, toValue: number) =>
      Animated.timing(value, {
        toValue,
        duration: TIME,
        useNativeDriver: false,
      })
    const slide = animate(translateX, newWidth)
    const resize = animate(height, newHeight)
    // Keep the taller pane's height while the panes slide past each other.
    const slideFirst = heightLeft < heightRight === showLeft
    Animated.sequence([
      slideFirst ? slide : resize,
      Animated.delay(DELAY),
      slideFirst ? resize : slide,
    ]).start()
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
