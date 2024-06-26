import {
  Heading,
  HStack,
  Icon,
  IconButton,
  Link,
  ScrollView,
} from 'native-base'

import Li from '../components/Li'
import P from '../components/P'

import { BottomTabScreenProps } from '../navigation/types'
import Hr from '../components/Hr'

const About = ({ navigation }: BottomTabScreenProps<'About'>) => (
  <>
    <HStack bg="primary.500" safeAreaTop pr="50px" alignItems="center">
      <IconButton
        icon={<Icon name="arrow-left" color="white" size="xl" />}
        onPress={() => navigation.navigate('Calculate')}
      />
      <Heading flex={1} textAlign="center" color="white">
        About
      </Heading>
    </HStack>
    <ScrollView px="5" pb={10}>
      <Heading size="md" py="2">
        Eligibility
      </Heading>
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
      <Heading size="md" py="2">
        Limitations
      </Heading>
      <Li>
        SeLECT can aid prognostication of remote symptomatic seizure risk after
        ischemic stroke but its clinical usefulness to influence medical
        decisions has not been tested.
      </Li>
      <Heading size="md" py="2">
        Prediction
      </Heading>
      <Li>
        SeLECT provides time-dependent predictions for the absolute risk of
        remote symptomatic seizures after ischemic stroke according to the total
        SeLECT value. 95% confidence intervals (CI) are also displayed.
      </Li>
      <Heading size="md" py="2">
        Performance
      </Heading>
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
      <Heading size="md" py="2">
        Reference manuscript:
      </Heading>
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
    </ScrollView>
  </>
)

export default About
