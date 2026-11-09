import { StyleSheet, TextProps, useWindowDimensions } from 'react-native'

import Text from './Text'
import { WIDE_SCREEN } from '../theme'

interface HeadingProps extends TextProps {
  size?: 'sm' | 'md' | 'lg'
}

const Heading = ({ size = 'lg', style, ...props }: HeadingProps) => {
  const { width } = useWindowDimensions()
  const sizeStyle =
    size === 'lg' && width >= WIDE_SCREEN ? styles.lgWide : styles[size]
  return <Text {...props} style={[styles.heading, sizeStyle, style]} />
}

const styles = StyleSheet.create({
  heading: {
    fontWeight: '700',
  },
  sm: {
    fontSize: 16,
    lineHeight: 20,
  },
  md: {
    fontSize: 20,
    lineHeight: 25,
  },
  lg: {
    fontSize: 24,
    lineHeight: 30,
  },
  lgWide: {
    fontSize: 30,
    lineHeight: 37.5,
  },
})

export default Heading
