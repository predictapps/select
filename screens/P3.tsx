import B from '../components/B'
import Heading from '../components/Heading'
import InfoScreen from '../components/InfoScreen'
import Link from '../components/Link'
import P from '../components/P'

const P3 = () => (
  <InfoScreen title="Acute symptomatic seizure">
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
  </InfoScreen>
)

export default P3
