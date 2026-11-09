import { StyleSheet, TextProps, View } from 'react-native'

import Text from './Text'

interface Props extends TextProps {
  number?: number
}

const Li: React.FC<Props> = ({ children, number }) => (
  <View style={styles.item}>
    <Text>
      <Text style={number ? undefined : styles.bullet}>
        {number ? number + '.' : '●'}
      </Text>
    </Text>
    <Text style={styles.body}>{children}</Text>
  </View>
)

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    paddingLeft: 20,
  },
  bullet: {
    fontSize: 10,
  },
  body: {
    paddingLeft: 4,
  },
})

export default Li
