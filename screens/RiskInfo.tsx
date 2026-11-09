import { StyleSheet } from 'react-native'

import Heading from '../components/Heading'
import InfoScreen from '../components/InfoScreen'
import Link from '../components/Link'
import P from '../components/P'
import SectionTitle from '../components/SectionTitle'

const RiskInfo = () => (
  <InfoScreen
    title="Risk of late seizures"
    style={styles.content}
    backToPrevious
  >
    <P>
      SeLECT predicts the absolute cumulative risk of late seizures after
      stroke over 10 years. Late seizures are defined as unprovoked seizures
      occurring &gt; 7 days after ischemic stroke. Death before a late seizure
      is taken into account as a competing event. The 95% confidence interval
      for the risk estimates is given in brackets.
    </P>
    <Heading size="sm">Why 10 years</Heading>
    <P>
      The practical clinical definition of epilepsy of the International League
      Against Epilepsy (ILAE) uses a 10-year time frame: epilepsy can be
      diagnosed after one unprovoked seizure if the probability of further
      seizures over the next 10 years is at least 60%. SeLECT gives the risk of
      a first late seizure over the same 10-year time frame. It does not
      estimate the risk of recurrence after a first late seizure.
    </P>
    <Heading size="sm">Prediction time</Heading>
    <P>
      The user can choose a custom prediction time in months using the slider.
      The range is between 0 and 120 months (10 years).
    </P>
    <Heading size="sm">Prediction graph</Heading>
    <P>
      The prediction graph displays the model-based cumulative risk for the
      calculated score. X-axis is time in months, Y-axis is cumulative absolute
      risk in percent. The dotted line is the 95% confidence interval.
    </P>
    <P>
      The curves are based on observed follow-up up to 6 years (SeLECT 2.0,
      SeLECT-EEG) and 4.75 years (SeLECT-ASyS), or earlier for scores with few
      patients. Later values are extrapolated with a parametric survival model;
      a note above the graph shows from which month the values are
      extrapolated.
    </P>
    <SectionTitle>Reference:</SectionTitle>
    <Link href="https://doi.org/10.1111/epi.12550">
      Fisher RS, Acevedo C, Arzimanoglou A, et al. ILAE official report: a
      practical clinical definition of epilepsy. Epilepsia.
      2014;55(4):475-482.
    </Link>
  </InfoScreen>
)

const styles = StyleSheet.create({
  content: {
    paddingVertical: 0,
  },
})

export default RiskInfo
