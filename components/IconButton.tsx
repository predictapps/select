import { Pressable, StyleSheet } from 'react-native'

import Icon, { IconProps } from './Icon'
import { colors, radius } from '../theme'
import { PressState } from './Button'

interface IconButtonProps extends IconProps {
  onPress: () => void
}

const IconButton = ({
  name,
  color = colors.primary[600],
  size = 'md',
  onPress,
}: IconButtonProps) => (
  <Pressable
    role="button"
    onPress={onPress}
    style={(state) => {
      const { pressed, hovered } = state as PressState
      return [
        styles.button,
        hovered && styles.hovered,
        pressed && styles.pressed,
      ]
    }}
  >
    <Icon name={name} color={color} size={size} />
  </Pressable>
)

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: radius.sm,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
  },
  hovered: {
    backgroundColor: colors.primaryHover,
  },
  pressed: {
    backgroundColor: colors.primaryPressed,
  },
})

export default IconButton
