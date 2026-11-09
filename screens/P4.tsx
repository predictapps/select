import React from 'react'
import Content from '../components/Content'
import ScreenHeader from '../components/ScreenHeader'

import B from '../components/B'
import P from '../components/P'

import { RootStackScreenProps } from '../navigation/types'

const P4 = ({ navigation }: RootStackScreenProps<'P4'>) => (
  <>
    <ScreenHeader
      title="Cortical involvement"
      onBack={() => navigation.navigate('Calculate')}
    />
    <Content>
      <P>
        Cortical involvement is defined as{' '}
        <B>affection of the cerebral cortex by irreversible infarction</B> due
        to ischemic stroke. This is determined using brain imaging demonstrating
        the location and extent of irreversible infarction. MRI is preferred to
        CT.
      </P>
    </Content>
  </>
)

export default P4
