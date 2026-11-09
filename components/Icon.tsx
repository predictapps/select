import { ComponentProps } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { colors } from '../theme'

export type IconName = ComponentProps<typeof MaterialCommunityIcons>['name']

const sizes = {
  sm: 16,
  md: 20,
  xl: 28,
}

export interface IconProps {
  name: IconName
  color?: string
  size?: keyof typeof sizes
}

const Icon = ({ name, color = colors.muted[500], size = 'sm' }: IconProps) => (
  <MaterialCommunityIcons
    name={name}
    color={color}
    size={sizes[size]}
    style={{ lineHeight: sizes[size] }}
  />
)

export default Icon
