import { ReactNode, useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'

import Heading from './Heading'
import Icon from './Icon'
import { colors } from '../theme'

interface CollapsibleProps {
  title: string
  children: ReactNode
}

const Collapsible = ({ title, children }: CollapsibleProps) => {
  const [open, setOpen] = useState(false)
  return (
    <View style={styles.section}>
      <Pressable
        role="button"
        aria-expanded={open}
        style={styles.header}
        onPress={() => setOpen(!open)}
      >
        <Heading size="sm" style={styles.title}>
          {title}
        </Heading>
        <Icon name={open ? 'chevron-up' : 'chevron-down'} size="md" />
      </Pressable>
      {open && <View style={styles.body}>{children}</View>}
    </View>
  )
}

const styles = StyleSheet.create({
  section: {
    borderBottomWidth: 0.5,
    borderColor: colors.gray[300],
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 12,
  },
  title: {
    flex: 1,
  },
  body: {
    paddingBottom: 12,
  },
})

export default Collapsible
