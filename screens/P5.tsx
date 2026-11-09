import B from '../components/B'
import InfoScreen from '../components/InfoScreen'
import Link from '../components/Link'
import P from '../components/P'
import SectionTitle from '../components/SectionTitle'

const P5 = () => (
  <InfoScreen title="Territory of MCA involvement">
    <P>
      Territory of MCA involvement is defined as{' '}
      <B>
        affection of the middle cerebral artery (MCA) territory by
        irreversible infarction
      </B>{' '}
      due to ischemic stroke. This is determined using brain imaging
      demonstrating the location and extent of irreversible infarction. MRI is
      preferred to CT.
    </P>
    <P>
      Arterial territories are defined according to a published atlas (Tatu et
      al. 1998).
    </P>
    <SectionTitle>Reference</SectionTitle>
    <P>
      <Link href="https://n.neurology.org/content/47/5/1125.short">
        Tatu L, Moulin T, Bogousslavsky J, Duvernoy H. Arterial territories of
        the human brain: cerebral hemispheres. Neurology 1998; 50: 1699-1708.
      </Link>
    </P>
  </InfoScreen>
)

export default P5
