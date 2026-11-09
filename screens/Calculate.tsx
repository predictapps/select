import { StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useStatePersist } from 'use-state-persist'

import { RootStackScreenProps } from '../navigation/types'
import Field from '../components/Field'
import P from '../components/P'
import { Model } from '../types'
import Expand from '../components/Expand'
import Hr from '../components/Hr'
import Label from '../components/Label'
import MultiSelect from '../components/MultiSelect'
import Button from '../components/Button'
import Content from '../components/Content'
import Modal from '../components/Modal'
import ScreenHeader from '../components/ScreenHeader'
import Text from '../components/Text'
import { colors } from '../theme'
import {
  dominantPhenotype,
  impliesEpileptiformActivity,
  impliesRegionalSlowing,
  phenotypeChips,
  phenotypeLabel,
  SEEGPhenotype,
} from '../models/cEEG'

const yesNo = (no = 0, yes = 1) => [
  { label: 'NO', value: no },
  { label: 'YES', value: yes },
]

const Calculate = ({ navigation }: RootStackScreenProps<'Calculate'>) => {
  const { bottom } = useSafeAreaInsets()
  const [termsVisible, setTermsVisible] = useStatePersist('terms', true)

  const [p1, setP1] = useStatePersist('p1', 0) // Severity of stroke
  const [p2, setP2] = useStatePersist('p2', 0) // Large-artery atherosclerosis
  const [p3, setP3] = useStatePersist<Model>('p3', Model.SeLECT2) // Does have early seizure
  const [p4, setP4] = useStatePersist('p4', 0) // Cortical involvement
  const [p5, setP5] = useStatePersist('p5', 0) // Territory of MCA involvement
  const [p6, setP6] = useStatePersist('p6', 0) // Type of acute symptomatic seizure
  const [p7, setP7] = useStatePersist('p7', 0) // Timing of acute symptomatic seizure
  const [p8, setP8] = useStatePersist('p8', 1) // Sex
  const [earlyEEG, setEarlyEEG] = useStatePersist<Model>(
    'earlyEEG',
    Model.SeLECT2
  )
  const [regionalSlowing, setRegionalSlowing] = useStatePersist(
    'regionalSlowing',
    0
  )
  const [epileptiformActivity, setEpileptiformActivity] = useStatePersist(
    'epileptiformActivity',
    0
  )
  const [seegPhenotypes, setSeegPhenotypes] = useStatePersist<SEEGPhenotype[]>(
    'seegPhenotypes',
    []
  )
  const onPhenotypes = (values: SEEGPhenotype[]) => {
    setSeegPhenotypes(values)
    if (values.some((v) => impliesEpileptiformActivity.has(v))) {
      setEpileptiformActivity(1)
    }
    if (values.some((v) => impliesRegionalSlowing.has(v))) {
      setRegionalSlowing(1)
    }
  }
  const phenotype = dominantPhenotype(seegPhenotypes)
  const select20 = p1 + p2 + p4 + p5

  let score = 0
  let model: Model
  if (p3 === Model.SeLECT_ASyS) {
    model = Model.SeLECT_ASyS
    if (p2 === 1) {
      score += p8
    }
    if (p6 === 4) {
      score += 4
    } else if (p6 === 1) {
      score += p7 + 1
    } else {
      score += p7
    }
    if (p4 === 2) {
      score += 1
    }
  } else if (earlyEEG === Model.SeLECT_EEG) {
    model = Model.SeLECT_EEG
    score = select20 + regionalSlowing + epileptiformActivity
  } else {
    model = Model.SeLECT2
    score = select20
  }
  return (
    <>
      <Modal
        isOpen={termsVisible}
        onClose={() => setTermsVisible(false)}
        title="Terms &amp; Conditions"
        footer={
          <Button icon="check" onPress={() => setTermsVisible(false)}>
            Accept Terms &amp; Conditions
          </Button>
        }
      >
        <P>
          The SeLECT score is a prediction tool applicable to people who
          suffered an ischemic stroke. Given some clinical characteristics,
          it provides risk estimates of remote symptomatic seizures
          occurring &gt; 7 days after stroke.
        </P>
        <P>
          This tool is meant to be used only by medical professionals to
          improve prognostication of late seizures after stroke. Its
          clinical usefulness to influence medical decisions has not been
          tested.
        </P>
        <P>
          By accepting these terms, the user agrees on the nature and
          purpose of this prediction tool.
        </P>
      </Modal>

      <ScreenHeader
        title="Calculate"
        onHelp={() => navigation.navigate('BottomTab', { screen: 'About' })}
      />
      <Content style={styles.content}>
        <View style={{ paddingBottom: bottom }}>
          <Field
            title="Acute symptomatic seizure"
            subTitle="≤ 7 days after stroke"
            hint={'If "Yes" using SeLECT-ASyS model.'}
            onInfo={() => navigation.navigate('P3')}
            options={yesNo(Model.SeLECT2, Model.SeLECT_ASyS)}
            selected={p3}
            onChange={setP3}
          />
          <Expand
            showLeft={p3 === Model.SeLECT2}
            left={
              <>
                <Field
                  title="Early EEG"
                  hint={
                    'If "No" using SeLECT2.0 model, if "Yes" using SeLECT-EEG model.'
                  }
                  onInfo={() => navigation.navigate('EarlyEEG')}
                  options={yesNo(Model.SeLECT2, Model.SeLECT_EEG)}
                  selected={earlyEEG}
                  onChange={setEarlyEEG}
                />
                <Expand
                  showLeft={earlyEEG === Model.SeLECT2}
                  left={<View />}
                  right={
                    <>
                      <Field
                        title="Regional slowing"
                        onInfo={() => navigation.navigate('RegionalSlowing')}
                        options={yesNo()}
                        selected={regionalSlowing}
                        onChange={setRegionalSlowing}
                      />
                      <Field
                        title="Epileptiform Activity"
                        onInfo={() =>
                          navigation.navigate('EpileptiformActivity')
                        }
                        options={yesNo()}
                        selected={epileptiformActivity}
                        onChange={setEpileptiformActivity}
                      />
                      <Label
                        title="sEEG phenotype"
                        subTitle="Based on early short EEG (ACNS terminology). Multiple selections allowed."
                        onPress={() => navigation.navigate('SEEGPhenotypeInfo')}
                      />
                      <MultiSelect
                        options={phenotypeChips.map((value) => ({
                          value,
                          label: phenotypeLabel[value],
                        }))}
                        selected={seegPhenotypes}
                        onChange={onPhenotypes}
                      />
                      <Text style={styles.dominant}>
                        Dominant finding: {phenotypeLabel[phenotype]}
                      </Text>
                      <Hr />
                    </>
                  }
                />
                <Field
                  title="Severity of stroke"
                  subTitle="NIHSS at admission"
                  onInfo={() => navigation.navigate('P1')}
                  options={[
                    { label: '≤3', value: 0 },
                    { label: '4-10', value: 1 },
                    { label: '≥11', value: 2 },
                  ]}
                  selected={p1}
                  onChange={setP1}
                />
              </>
            }
            right={
              <>
                <Field
                  title="Type of acute symptomatic seizure"
                  onInfo={() => navigation.navigate('P6')}
                  options={[
                    { label: 'Other/Unknown', value: 0 },
                    { label: 'Bilateral tonic-clonic', value: 1 },
                    { label: 'Status epilepticus', value: 4 },
                  ]}
                  selected={p6}
                  onChange={setP6}
                />
                <Field
                  title="Timing of acute symptomatic seizure"
                  onInfo={() => navigation.navigate('P7')}
                  options={[
                    { label: 'Day 0', value: 1 },
                    { label: 'Day ≥ 1 or Unknown', value: 0 },
                  ]}
                  selected={p7}
                  onChange={setP7}
                />
              </>
            }
          />
          <Field
            title="Large-artery atherosclerosis"
            onInfo={() => navigation.navigate('P2')}
            options={yesNo()}
            selected={p2}
            onChange={setP2}
          />
          <Expand
            showLeft={p3 == Model.SeLECT2 || p2 === 0}
            left={<View />}
            right={
              <Field
                title="Sex"
                options={[
                  { label: 'FEMALE', value: 1 },
                  { label: 'MALE', value: 2 },
                ]}
                selected={p8}
                onChange={setP8}
              />
            }
          />
          <Field
            title="Cortical involvement"
            onInfo={() => navigation.navigate('P4')}
            options={yesNo(0, 2)}
            selected={p4}
            onChange={setP4}
          />
          <Expand
            showLeft={p3 === Model.SeLECT2}
            left={
              <Field
                title="Territory of MCA involvement"
                onInfo={() => navigation.navigate('P5')}
                options={yesNo()}
                selected={p5}
                onChange={setP5}
              />
            }
            right={<View />}
          />
          <Button
            size="lg"
            icon="calculator"
            style={styles.calculate}
            onPress={() => {
              navigation.navigate('Prediction', {
                model,
                score,
                screen: 'Risk',
                phenotype,
                select20,
                regionalSlowing,
                epileptiformActivity,
              })
            }}
          >
            Calculate
          </Button>
          <Text style={styles.total}>Total points: {score}</Text>
        </View>
      </Content>
    </>
  )
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: 20,
    paddingTop: 0,
  },
  dominant: {
    color: colors.gray[500],
    marginTop: 8,
  },
  calculate: {
    marginTop: 20,
  },
  total: {
    color: colors.gray[300],
    marginVertical: 8,
    textAlign: 'center',
  },
})

export default Calculate
