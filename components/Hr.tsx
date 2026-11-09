import { StyleSheet, View } from 'react-native'

import { colors } from '../theme'

const Hr = () => <View style={styles.rule} />

const styles = StyleSheet.create({
  rule: {
    borderBottomColor: colors.gray[300],
    borderBottomWidth: 0.5,
    height: 10,
  },
})

export default Hr
