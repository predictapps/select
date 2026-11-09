import { StyleSheet } from 'react-native'

import Heading from '../components/Heading'
import InfoScreen from '../components/InfoScreen'
import P from '../components/P'

const RiskInfo = () => (
  <InfoScreen
    title="Risk of late seizures"
    style={styles.content}
    backToPrevious
  >
    <P>
      SeLECT predicts the absolute cumulative risk of late seizures after
      stroke. Late seizures are defined as spontaneous seizures occurring &gt;
      7 days after ischemic stroke. The 95% confidence interval for the risk
      estimates is given in brackets.
    </P>
    <Heading size="sm">Prediction time</Heading>
    <P>
      The user can choose a custom prediction time in months using the slider.
      The range is between 0 and 60 months.
    </P>
    <Heading size="sm">Prediction graph</Heading>
    <P>
      The prediction graph displays Kaplan Meier risk estimates for the
      calculated SeLECT value. X-axis is time in months, Y-axis is cumulative
      absolute risk in percent. The dotted line is the 95% confidence
      interval.
    </P>
  </InfoScreen>
)

const styles = StyleSheet.create({
  content: {
    paddingVertical: 0,
  },
})

export default RiskInfo
