import { StyleSheet, View } from 'react-native'

import Button from './Button'
import { Option } from './Segment'

interface MultiSelectProps {
  options: Option[]
  selected: number[]
  onChange: (values: number[]) => void
}

const MultiSelect = ({ options, selected, onChange }: MultiSelectProps) => (
  <View style={styles.group}>
    {options.map(({ label, value }) => {
      const active = selected.includes(value)
      return (
        <Button
          key={value}
          variant={active ? 'solid' : 'outline'}
          onPress={() =>
            onChange(
              active
                ? selected.filter((v) => v !== value)
                : [...selected, value]
            )
          }
        >
          {label}
        </Button>
      )
    })}
  </View>
)

const styles = StyleSheet.create({
  group: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
})

export default MultiSelect
