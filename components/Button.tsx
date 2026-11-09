import {
  Pressable,
  PressableStateCallbackType,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native'

import Icon, { IconName } from './Icon'
import Text from './Text'
import { colors, radius } from '../theme'

// react-native-web also reports hover, which the React Native types leave out.
export type PressState = PressableStateCallbackType & { hovered?: boolean }

interface ButtonProps {
  children: string
  variant?: 'solid' | 'outline'
  size?: 'md' | 'lg'
  icon?: IconName
  onPress: () => void
  style?: StyleProp<ViewStyle>
}

const Button = ({
  children,
  variant = 'solid',
  size = 'md',
  icon,
  onPress,
  style,
}: ButtonProps) => {
  const solid = variant === 'solid'
  const large = size === 'lg'
  return (
    <Pressable
      role="button"
      onPress={onPress}
      style={(state) => {
        const { pressed, hovered } = state as PressState
        return [
          styles.button,
          large ? styles.large : styles.medium,
          solid ? styles.solid : styles.outline,
          hovered && (solid ? styles.solidHovered : styles.outlineHovered),
          pressed && (solid ? styles.solidPressed : styles.outlinePressed),
          style,
        ]
      }}
    >
      <View style={styles.content}>
        {icon && (
          <Icon
            name={icon}
            color={solid ? colors.textInverse : colors.primary[600]}
            size={large ? 'md' : 'sm'}
          />
        )}
        <View>
          <Text
            style={[
              solid ? styles.solidText : styles.outlineText,
              large && styles.largeText,
            ]}
          >
            {children}
          </Text>
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: radius.sm,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  medium: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  large: {
    padding: 12,
  },
  content: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  solid: {
    backgroundColor: colors.primary[600],
  },
  solidHovered: {
    backgroundColor: colors.primary[700],
  },
  solidPressed: {
    backgroundColor: colors.primary[800],
  },
  outline: {
    borderColor: colors.muted[300],
    borderWidth: 1,
  },
  outlineHovered: {
    backgroundColor: colors.primaryHover,
  },
  outlinePressed: {
    backgroundColor: colors.primaryPressed,
  },
  solidText: {
    color: colors.textInverse,
  },
  outlineText: {
    color: colors.primary[600],
  },
  largeText: {
    fontSize: 16,
    lineHeight: 24,
  },
})

export default Button
