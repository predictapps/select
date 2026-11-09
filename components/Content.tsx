import { ScrollView, ScrollViewProps, StyleSheet } from 'react-native'

const Content = ({ style, ...props }: ScrollViewProps) => (
  <ScrollView {...props} style={[styles.content, style]} />
)

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
})

export default Content
