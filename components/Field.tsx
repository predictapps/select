import { StyleSheet } from 'react-native'

import Hr from './Hr'
import Label from './Label'
import Segment, { Option } from './Segment'
import Text from './Text'
import { colors } from '../theme'

interface FieldProps {
  title: string
  subTitle?: string
  hint?: string
  onInfo?: () => void
  options: Option[]
  selected: number
  onChange: (value: number) => void
}

const Field = ({
  title,
  subTitle,
  hint,
  onInfo,
  options,
  selected,
  onChange,
}: FieldProps) => (
  <>
    <Label title={title} subTitle={subTitle} onPress={onInfo} />
    <Segment options={options} selected={selected} onPress={onChange} />
    {hint && <Text style={styles.hint}>{hint}</Text>}
    <Hr />
  </>
)

const styles = StyleSheet.create({
  hint: {
    color: colors.gray[400],
  },
})

export default Field
