import { useRef, useState } from 'react'
import {
  AccessibilityActionEvent,
  DimensionValue,
  PanResponder,
  Platform,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native'

import { colors } from '../theme'

interface SliderProps {
  value: number
  max: number
  label: string
  onChange: (value: number) => void
}

const THUMB = 16

const Slider = ({ value, max, label, onChange }: SliderProps) => {
  const [dragging, setDragging] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const width = useRef(0)
  const startX = useRef(0)

  // The responder lives across renders, so it reads the current props from here.
  const latest = useRef({ value, max, onChange })
  latest.current = { value, max, onChange }

  const setValue = (next: number) => {
    const clamped = Math.min(Math.max(next, 0), latest.current.max)
    if (clamped !== latest.current.value) {
      latest.current.value = clamped
      latest.current.onChange(clamped)
    }
  }

  const setPosition = (x: number) => {
    if (width.current > 0) {
      setValue(Math.round((x / width.current) * latest.current.max))
    }
  }

  const { panHandlers } = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderTerminationRequest: () => false,
      onPanResponderGrant: ({ nativeEvent }) => {
        startX.current = nativeEvent.locationX
        setDragging(true)
        setPosition(startX.current)
      },
      onPanResponderMove: (_, { dx }) => setPosition(startX.current + dx),
      onPanResponderRelease: () => setDragging(false),
      onPanResponderTerminate: () => setDragging(false),
    })
  ).current

  const onAccessibilityAction = ({ nativeEvent }: AccessibilityActionEvent) => {
    if (nativeEvent.actionName === 'increment') setValue(value + 1)
    if (nativeEvent.actionName === 'decrement') setValue(value - 1)
  }

  const onKeyDown = (event: KeyboardEvent) => {
    const steps: Record<string, number> = {
      ArrowRight: value + 1,
      ArrowUp: value + 1,
      ArrowLeft: value - 1,
      ArrowDown: value - 1,
      Home: 0,
      End: max,
    }
    if (event.key in steps) {
      event.preventDefault()
      setValue(steps[event.key])
    }
  }

  const webProps =
    Platform.OS === 'web'
      ? ({
          tabIndex: 0,
          onKeyDown,
          onMouseEnter: () => setHovered(true),
          onMouseLeave: () => setHovered(false),
          onFocus: () => setFocused(true),
          onBlur: () => setFocused(false),
        } as unknown as ViewProps)
      : undefined

  const position: DimensionValue = `${(value / max) * 100}%`

  return (
    <View
      {...panHandlers}
      {...webProps}
      accessible
      role="slider"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
      accessibilityActions={[{ name: 'increment' }, { name: 'decrement' }]}
      onAccessibilityAction={onAccessibilityAction}
      hitSlop={{ top: 12, bottom: 12 }}
      style={[styles.slider, webStyle]}
    >
      <View
        style={styles.track}
        onLayout={(e) => {
          width.current = e.nativeEvent.layout.width
        }}
      >
        <View style={styles.rail}>
          <View style={[styles.filled, { width: position }]} />
        </View>
      </View>
      <View
        style={[
          styles.thumb,
          { left: position },
          focused && styles.thumbFocused,
          hovered && styles.thumbHovered,
        ]}
      >
        {dragging && <View style={styles.halo} />}
      </View>
    </View>
  )
}

const webStyle = Platform.select<ViewStyle>({
  web: {
    cursor: 'pointer',
    outlineStyle: 'none',
    touchAction: 'none',
    userSelect: 'none',
  } as unknown as ViewStyle,
})

const styles = StyleSheet.create({
  slider: {
    pointerEvents: 'box-only',
    width: '75%',
  },
  track: {
    height: THUMB,
    justifyContent: 'center',
    width: '100%',
  },
  rail: {
    backgroundColor: colors.muted[200],
    borderRadius: 8,
    height: 4,
    overflow: 'hidden',
    width: '100%',
  },
  filled: {
    backgroundColor: colors.primary[600],
    height: '100%',
  },
  thumb: {
    backgroundColor: colors.primary[600],
    borderRadius: THUMB / 2,
    height: THUMB,
    position: 'absolute',
    top: 0,
    transform: [{ translateX: -THUMB / 2 }],
    width: THUMB,
  },
  thumbFocused: {
    outlineColor: colors.primary[400],
    outlineStyle: 'solid',
    outlineWidth: 2,
  },
  thumbHovered: {
    outlineColor: colors.primary[300],
    outlineStyle: 'solid',
    outlineWidth: 4,
  },
  halo: {
    borderColor: colors.primary[300],
    borderRadius: THUMB,
    borderWidth: 8,
    height: THUMB * 2,
    left: -THUMB / 2,
    position: 'absolute',
    top: -THUMB / 2,
    width: THUMB * 2,
  },
})

export default Slider
