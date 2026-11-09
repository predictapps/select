import React from 'react'
import Content from '../components/Content'
import ScreenHeader from '../components/ScreenHeader'

import { RootStackScreenProps } from '../navigation/types'
import P from '../components/P'
import B from '../components/B'

const EarlyEEG = ({ navigation }: RootStackScreenProps<'EarlyEEG'>) => (
  <>
    <ScreenHeader
      title="Early EEG"
      onBack={() => navigation.navigate('Calculate')}
    />
    <Content>
      <P>
        An "early EEG" is an EEG recorded within the first 7 days after stroke
        over a minimum of 20 minutes (longer recordings recommended for patients
        with higher <B>NIHSS scores</B> and severe generalized slowing).
      </P>
    </Content>
  </>
)

export default EarlyEEG
