import React from 'react'
import {
  ImageBackground,
  Platform,
  StyleSheet,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native'

import { colors, WIDE_SCREEN } from '../theme'

const Phone = ({ children }: { children: React.ReactNode }) => {
  const { width } = useWindowDimensions()
  if (Platform.OS !== 'web') {
    return <>{children}</>
  }

  const wide = width >= WIDE_SCREEN
  return (
    <View style={styles.page}>
      <ImageBackground
        source={require('../assets/images/table.jpg')}
        resizeMode="cover"
        style={styles.background}
      >
        <View style={[styles.outer, wide && styles.outerWide]}>
          <View style={[styles.inner, wide && styles.innerWide]}>
            {children}
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}

// `clip` is web-only and missing from the React Native types.
const clip = 'clip' as ViewStyle['overflow']

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.muted[300],
    flex: 1,
  },
  background: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  outer: {
    alignSelf: 'center',
    borderColor: colors.red[300],
    boxShadow: '0px 5px 6.27px rgba(0, 0, 0, 0.34)',
    flex: 1,
    overflow: clip,
    width: '100%',
  },
  outerWide: {
    borderRadius: 30,
    borderWidth: 1,
    marginTop: 50,
    maxHeight: 760,
    maxWidth: 448,
  },
  inner: {
    backgroundColor: colors.white,
    borderColor: colors.gray[700],
    flex: 1,
    overflow: clip,
    width: '100%',
  },
  innerWide: {
    borderRadius: 30,
    borderWidth: 10,
  },
})

export default Phone
