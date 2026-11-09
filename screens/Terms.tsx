import React from 'react'
import * as Application from 'expo-application'
import { StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import Content from '../components/Content'
import Heading from '../components/Heading'
import ScreenHeader from '../components/ScreenHeader'
import Text from '../components/Text'
import { colors } from '../theme'

import { BottomTabScreenProps } from '../navigation/types'
import P from '../components/P'
import Constants from 'expo-constants'

const Terms = ({ navigation }: BottomTabScreenProps<'Terms'>) => {
  const { bottom } = useSafeAreaInsets()
  return (
    <>
      <ScreenHeader
        title="Terms"
        onBack={() => navigation.navigate('Calculate')}
      />
      <Content style={styles.content}>
        <View style={{ paddingBottom: bottom }}>
          <Heading size="md">Terms &amp; Conditions</Heading>
          <P>
            The SeLECT score is a prediction tool applicable to people who
            suffered an ischemic stroke. Given some clinical characteristics, it
            provides risk estimates of remote symptomatic seizures occurring &gt;
            7 days after stroke.
          </P>
          <P>
            This tool is meant to be used only by medical professionals to improve
            prognostication of late seizures after stroke. Its clinical usefulness
            to influence medical decisions has not been tested.
          </P>
        </View>
        <Text style={styles.version}>
          {Constants.expoConfig?.version}
        </Text>
        <Text style={styles.version}>
          {Application.nativeBuildVersion}
        </Text>
        <Text style={styles.version}>
          {Application.nativeApplicationVersion}
        </Text>
      </Content>
    </>
  )
}

const styles = StyleSheet.create({
  content: {
    paddingVertical: 20,
  },
  version: {
    color: colors.gray[400],
    textAlign: 'center',
  },
})

export default Terms
