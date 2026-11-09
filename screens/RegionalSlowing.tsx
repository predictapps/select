import React from 'react'
import Content from '../components/Content'
import ScreenHeader from '../components/ScreenHeader'

import { RootStackScreenProps } from '../navigation/types'
import P from '../components/P'

const RegionalSlowing = ({
  navigation,
}: RootStackScreenProps<'RegionalSlowing'>) => (
  <>
    <ScreenHeader
      title="Regional Slowing"
      onBack={() => navigation.navigate('Calculate')}
    />
    <Content>
      <P>
        Regional slowing is defined as focal polymorphic slow activity. This
        activity can be either continuous or intermittent and consist of
        polymorphic theta or delta waves at frequencies slower than the
        background rhythm.
      </P>
    </Content>
  </>
)

export default RegionalSlowing
