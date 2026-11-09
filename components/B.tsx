import { StyleSheet, TextProps } from 'react-native'

import Text from './Text'

const B = ({ children }: TextProps) => (
  <Text style={styles.bold}>{children}</Text>
)

const styles = StyleSheet.create({
  bold: {
    fontWeight: '700',
  },
})

export default B
