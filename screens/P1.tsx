import { Image, StyleSheet, View } from 'react-native'

import B from '../components/B'
import InfoScreen from '../components/InfoScreen'
import P from '../components/P'

const P1 = () => (
  <InfoScreen title="Stroke severity" style={styles.page}>
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
  </InfoScreen>
)

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
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
