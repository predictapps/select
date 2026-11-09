import { StyleSheet } from 'react-native'

import Heading from './Heading'

const SectionTitle = ({ children }: { children: string }) => (
  <Heading size="md" style={styles.title}>
    {children}
  </Heading>
)

const styles = StyleSheet.create({
  title: {
    paddingVertical: 8,
  },
})

export default SectionTitle
