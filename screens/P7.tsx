import React from 'react'
import Content from '../components/Content'
import ScreenHeader from '../components/ScreenHeader'

import { RootStackScreenProps } from '../navigation/types'
import P from '../components/P'
import B from '../components/B'

const P7 = ({ navigation }: RootStackScreenProps<'P7'>) => (
  <>
    <ScreenHeader
      title="Timing of acute symptomatic seizure"
      onBack={() => navigation.navigate('Calculate')}
    />
    <Content>
      <P>
        <B>Day 0</B> refers to seizures occurring on the same day as stroke
        onset.
      </P>
      <P>
        <B>Day 1</B> refers to the next day after stroke onset.
      </P>
    </Content>
  </>
)

export default P7
