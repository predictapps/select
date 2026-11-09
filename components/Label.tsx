import { StyleSheet, View } from 'react-native'

import Heading from './Heading'
import IconButton from './IconButton'
import Text from './Text'
import { colors } from '../theme'

interface LabelProps {
  title: string
  subTitle?: string
  onPress?: () => void
}

const Label = ({ title, subTitle = '', onPress }: LabelProps) => (
  <View style={styles.label}>
    <View style={styles.text}>
      <Heading size="md" style={styles.title}>
        {title}
      </Heading>
      <Text style={styles.subTitle}>{subTitle}</Text>
    </View>
    {onPress && <IconButton name="information" onPress={onPress} />}
  </View>
)

const styles = StyleSheet.create({
  label: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  text: {
    flex: 1,
  },
  title: {
    fontWeight: '300',
  },
  subTitle: {
    color: colors.gray[500],
  },
})

export default Label
