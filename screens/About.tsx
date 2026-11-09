import { StyleSheet } from 'react-native'

import Hr from '../components/Hr'
import InfoScreen from '../components/InfoScreen'
import Li from '../components/Li'
import Link from '../components/Link'
import P from '../components/P'
import SectionTitle from '../components/SectionTitle'

const About = () => (
  <InfoScreen title="About" style={styles.content}>
    <SectionTitle>Eligibility</SectionTitle>
    <P>SeLECT should only be used in people</P>
    <Li>who have suffered an ischemic stroke AND</Li>
    <Li>who are adults aged above 18 years.</Li>
    <P>SeLECT should NOT be used in people with</P>
    <Li>history of seizures or epilepsy OR</Li>
    <Li>hemorrhagic stroke OR</Li>
    <Li>transient ischemic attack OR</Li>
    <Li>
      potentially epileptogenic comorbidities (i.e. intracranial tumour,
      cerebral venous thrombosis, history of severe traumatic brain injury,
      history of brain surgery, etc.)
    </Li>
    <SectionTitle>Limitations</SectionTitle>
    <Li>
      SeLECT can aid prognostication of remote symptomatic seizure risk after
      ischemic stroke but its clinical usefulness to influence medical
      decisions has not been tested.
    </Li>
    <SectionTitle>Prediction</SectionTitle>
    <Li>
      SeLECT provides time-dependent predictions for the absolute risk of
      remote symptomatic seizures after ischemic stroke according to the total
      SeLECT value. 95% confidence intervals (CI) are also displayed.
    </Li>
    <SectionTitle>Performance</SectionTitle>
    <Li>
      SeLECT was developed and validated in a multicentre registry
      (SeLECT-registry) of patients with ischemic stroke. The prediction
      estimates are continuously updated when new data is added to the
      international SeLECT-registry.
    </Li>
    <Li>
      The initial SeLECT 1.0 model had a discrimination (c statistic) of 0.77
      (95% CI 0.71 – 0.82).
    </Li>
    <Li>
      Overall calibration: calibration plots indicated good fit of predicted
      and observed data.
    </Li>
    <Hr />
    <SectionTitle>Reference manuscript:</SectionTitle>
    <Link href="https://www.sciencedirect.com/science/article/pii/S1474442217304040">
      Galovic, M. et al. Prediction of late seizures after ischaemic stroke
      with a novel prognostic model (the SeLECT score): a multivariable
      prediction model development and validation study. The Lancet Neurology
      17, 143–152 (2018).
    </Link>
    <P></P>
    <Link href="https://jamanetwork.com/journals/jamaneurology/fullarticle/2802972">
      Sinka, L. et al. Association of Mortality and Risk of Epilepsy With Type
      of Acute Symptomatic Seizure After Ischemic Stroke and an Updated
      Prognostic Model. JAMA Neurol 80, 605-613 (2023).
    </Link>
    <P></P>
    <P>
      Schubert, KM et al. Implications for driving based on the risk of
      seizures after ischemic stroke. JNNP (2024, in press).
    </P>
  </InfoScreen>
)

const styles = StyleSheet.create({
  content: {
    paddingBottom: 40,
    paddingTop: 0,
  },
})

export default About
