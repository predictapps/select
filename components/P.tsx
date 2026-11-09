import { StyleSheet, TextProps } from 'react-native'

import Text from './Text'

const P = ({ children }: TextProps) => (
  <Text style={styles.paragraph}>{children}</Text>
)

const styles = StyleSheet.create({
  paragraph: {
    paddingVertical: 4,
  },
})

export default P
