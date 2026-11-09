import React from 'react'
import { Image, ScrollView, StyleSheet, View } from 'react-native'
import ScreenHeader from '../components/ScreenHeader'

import B from '../components/B'
import P from '../components/P'

import { RootStackScreenProps } from '../navigation/types'

const P1 = ({ navigation }: RootStackScreenProps<'P1'>) => (
  <>
    <ScreenHeader
      title="Stroke severity"
      onBack={() => navigation.navigate('Calculate')}
    />
    <ScrollView>
      <View style={styles.intro}>
        <P>
          Stroke severity is measured with the <B>NIH Stroke Scale (NIHSS)</B>{' '}
          at admission.
        </P>
      </View>
      <Image
        source={require('../assets/p1.jpeg')}
        resizeMode="contain"
        alt="NIH Stroke Scale"
        style={styles.image}
      />
    </ScrollView>
  </>
)

const styles = StyleSheet.create({
  intro: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  image: {
    aspectRatio: 604 / 794,
    height: undefined,
    width: '100%',
  },
})

export default P1
