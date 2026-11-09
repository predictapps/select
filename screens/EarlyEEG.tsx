import B from '../components/B'
import InfoScreen from '../components/InfoScreen'
import P from '../components/P'

const EarlyEEG = () => (
  <InfoScreen title="Early EEG">
    <P>
      An "early EEG" is an EEG recorded within the first 7 days after stroke
      over a minimum of 20 minutes (longer recordings recommended for patients
      with higher <B>NIHSS scores</B> and severe generalized slowing).
    </P>
  </InfoScreen>
)

export default EarlyEEG
