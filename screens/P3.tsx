import React from 'react'
import Content from '../components/Content'
import Heading from '../components/Heading'
import Link from '../components/Link'
import ScreenHeader from '../components/ScreenHeader'

import B from '../components/B'
import P from '../components/P'

import { RootStackScreenProps } from '../navigation/types'

const P3 = ({ navigation }: RootStackScreenProps<'P3'>) => (
  <>
    <ScreenHeader
      title="Acute symptomatic seizure"
      onBack={() => navigation.navigate('Calculate')}
    />
    <Content>
      <P>
        Acute symptomatic seizures, also known as “early” seizures, are defined
        as <B>seizures occurring within 7 days</B> of the ischemic stroke.
      </P>
      <Heading>Reference</Heading>
      <Link href="https://onlinelibrary.wiley.com/doi/abs/10.1111/j.1528-1167.2009.02285.x">
        Beghi E, Carpio A, Forsgren L, Hesdorffer DC, Malmgren K, Sander JW, et
        al. Recommendation for a definition of acute symptomatic seizure.
        Epilepsia 2010; 51: 671-675.
      </Link>
    </Content>
  </>
)

export default P3
