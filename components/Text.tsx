import { StyleSheet, Text as RNText, TextProps } from 'react-native'

import { colors } from '../theme'

const Text = ({ style, ...props }: TextProps) => (
  <RNText {...props} style={[styles.text, style]} />
)

const styles = StyleSheet.create({
  text: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '400',
    // Explicit zero turns off the automatic tracking iOS applies to system fonts.
    letterSpacing: 0,
    lineHeight: 21,
  },
})

export default Text
