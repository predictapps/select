import * as Application from 'expo-application'
import Constants from 'expo-constants'
import { StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import Heading from '../components/Heading'
import InfoScreen from '../components/InfoScreen'
import P from '../components/P'
import Text from '../components/Text'
import { colors } from '../theme'

const Terms = () => {
  const { bottom } = useSafeAreaInsets()
  return (
    <InfoScreen title="Terms" style={styles.content}>
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
    </InfoScreen>
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
