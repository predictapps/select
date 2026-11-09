import InfoScreen from '../components/InfoScreen'
import Li from '../components/Li'
import P from '../components/P'

const SEEGPhenotypeInfo = () => (
  <InfoScreen title="sEEG phenotype" backToPrevious>
    <P>
      Tick every pattern seen on the early short EEG (sEEG). The app uses the
      most severe ticked pattern ("worst pattern wins") to estimate what a
      continuous EEG (cEEG) would add. If nothing is ticked, a normal EEG is
      assumed. Order from most to least severe:
    </P>
    <Li>Electrographic status (Salzburg / ACNS criteria)</Li>
    <Li>Electrographic seizure (Salzburg / ACNS criteria)</Li>
    <Li>Lateralized periodic discharges (LPD)</Li>
    <Li>Interictal epileptiform discharges (IED)</Li>
    <Li>Lateralized rhythmic delta activity (LRDA)</Li>
    <Li>Generalized periodic discharges (GPD)</Li>
    <Li>Generalized rhythmic delta activity (GRDA)</Li>
    <Li>Regional slowing</Li>
    <Li>Generalized slowing</Li>
    <P>
      Ticking an epileptiform pattern (status, seizure, LPD, IED, LRDA, GPD)
      sets "Epileptiform activity" to YES; ticking regional slowing sets
      "Regional slowing" to YES, so that the SeLECT-EEG score stays consistent
      with the findings.
    </P>
    <P>
      The cEEG estimates come from the SeLECT-EEG short vs long EEG study
      (Supplemental Table 4 / Figure 6) and are shown only for patients without
      an acute symptomatic seizure who had an early EEG.
    </P>
  </InfoScreen>
)

export default SEEGPhenotypeInfo
