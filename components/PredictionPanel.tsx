import { StyleSheet, View } from 'react-native'

import Heading from './Heading'
import IconButton from './IconButton'
import Slider from './Slider'
import Text from './Text'
import { colors } from '../theme'

interface PredictionPanelProps {
  title: string
  onInfo: () => void
  caption: string
  min: string
  max: string
  value: string
  month: number
  maxMonth: number
  onMonthChange: (month: number) => void
}

const PredictionPanel = ({
  title,
  onInfo,
  caption,
  min,
  max,
  value,
  month,
  maxMonth,
  onMonthChange,
}: PredictionPanelProps) => (
  <View style={styles.panel}>
    <View style={styles.row}>
      <Heading style={styles.grow}>{title}</Heading>
      <IconButton name="information" onPress={onInfo} />
    </View>
    <View style={[styles.row, styles.readout]}>
      <View style={styles.grow}>
        <Text>{caption}</Text>
        <Text style={styles.range}>
          ({min}% - {max}%)
        </Text>
      </View>
      <Heading size="md">{value}%</Heading>
    </View>
    <View style={[styles.row, styles.months]}>
      <Heading size="md" style={[styles.bound, styles.boundStart]}>
        0
      </Heading>
      <Slider
        label="Months"
        value={month}
        max={maxMonth}
        onChange={onMonthChange}
      />
      <Heading size="md" style={[styles.bound, styles.boundEnd]}>
        {maxMonth}
      </Heading>
    </View>
  </View>
)

const styles = StyleSheet.create({
  panel: {
    marginHorizontal: 20,
    marginTop: 12,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  grow: {
    flex: 1,
  },
  readout: {
    borderColor: colors.gray[400],
    borderTopWidth: 0.5,
    paddingVertical: 4,
  },
  range: {
    color: colors.muted[400],
  },
  months: {
    borderBottomWidth: 0.5,
    borderColor: colors.gray[400],
    borderTopWidth: 0.5,
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  bound: {
    fontWeight: '300',
  },
  boundStart: {
    paddingLeft: 8,
  },
  boundEnd: {
    paddingRight: 8,
  },
})

export default PredictionPanel
