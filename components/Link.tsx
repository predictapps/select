import { Linking, Platform, StyleSheet, TextProps } from 'react-native'

import Text from './Text'

interface LinkProps {
  href: string
  children: string
}

const Link = ({ href, children }: LinkProps) => {
  // On web react-native-web renders a Text with href as a real anchor.
  const target: TextProps =
    Platform.OS === 'web'
      ? ({ href } as TextProps)
      : { onPress: () => Linking.openURL(href).catch(console.error) }
  return (
    <Text {...target} role="link" style={styles.link}>
      {children}
    </Text>
  )
}

const styles = StyleSheet.create({
  link: {
    textDecorationLine: 'underline',
  },
})

export default Link
