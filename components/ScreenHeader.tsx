import { StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import Heading from './Heading'
import IconButton from './IconButton'
import { colors } from '../theme'

interface ScreenHeaderProps {
  title: string
  onBack?: () => void
  onHelp?: () => void
  // Offsets the title so it stays centred despite the button on one side.
  centerTitle?: boolean
}

const ScreenHeader = ({
  title,
  onBack,
  onHelp,
  centerTitle = true,
}: ScreenHeaderProps) => {
  const { top } = useSafeAreaInsets()
  return (
    <View
      style={[
        styles.header,
        { paddingTop: top },
        centerTitle && onBack && styles.rightGutter,
        centerTitle && onHelp && styles.leftGutter,
      ]}
    >
      {onBack && (
        <IconButton
          name="arrow-left"
          color={colors.white}
          size="xl"
          onPress={onBack}
        />
      )}
      <Heading style={styles.title}>{title}</Heading>
      {onHelp && (
        <IconButton
          name="help-circle"
          color={colors.white}
          size="xl"
          onPress={onHelp}
        />
      )}
    </View>
  )
}

const GUTTER = 50

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    backgroundColor: colors.primary[500],
    flexDirection: 'row',
  },
  leftGutter: {
    paddingLeft: GUTTER,
  },
  rightGutter: {
    paddingRight: GUTTER,
  },
  title: {
    color: colors.white,
    flex: 1,
    textAlign: 'center',
  },
})

export default ScreenHeader
