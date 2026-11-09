import { StyleSheet, View } from 'react-native'

import Button from './Button'
import { radius } from '../theme'

export interface Option {
  label: string
  value: number
}

interface SegmentProps {
  options: Option[]
  selected: number
  onPress: (value: number) => void
}

const Segment = ({ options, selected, onPress }: SegmentProps) => (
  <View style={styles.group}>
    {options.map(({ label, value }, index) => (
      <Button
        key={value}
        variant={value === selected ? 'solid' : 'outline'}
        onPress={() => onPress(value)}
        style={[
          styles.option,
          index === 0 ? styles.first : styles.attached,
          index === options.length - 1 && styles.last,
        ]}
      >
        {label}
      </Button>
    ))}
  </View>
)

const styles = StyleSheet.create({
  group: {
    flex: 1,
    flexDirection: 'row',
  },
  option: {
    borderRadius: 0,
    flexGrow: 1,
    flexShrink: 1,
  },
  first: {
    borderBottomLeftRadius: radius.sm,
    borderTopLeftRadius: radius.sm,
  },
  last: {
    borderBottomRightRadius: radius.sm,
    borderTopRightRadius: radius.sm,
  },
  attached: {
    borderLeftWidth: 0,
  },
})

export default Segment
