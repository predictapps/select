import { ReactNode, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import Button from '../components/Button'
import Collapsible from '../components/Collapsible'
import Content from '../components/Content'
import Heading from '../components/Heading'
import IconButton from '../components/IconButton'
import Li from '../components/Li'
import Segment from '../components/Segment'
import Text from '../components/Text'
import {
  ceegTable,
  definitions,
  effectSizeSummary,
  Grade,
  gradeLabel,
  gradesHighestFirst,
  headlineGrade,
  limitations,
  matrixOrder,
  phenotypeLabel,
  Recommendation,
  SEEGPhenotype,
} from '../models/cEEG'
import { colors, radius } from '../theme'

interface CEEGProps {
  phenotype: SEEGPhenotype
  select20: number
  regionalSlowing: number
  epileptiformActivity: number
}

const gradeColors: Record<
  Grade,
  { background: string; border: string; text: string }
> = {
  '+++': { background: '#fee2e2', border: '#dc2626', text: '#7f1d1d' },
  '++': { background: '#ffedd5', border: '#ea580c', text: '#7c2d12' },
  '+': { background: '#fef9c3', border: '#ca8a04', text: '#713f12' },
  '±': { background: '#e0f2fe', border: '#0284c7', text: '#0c4a6e' },
  '—': {
    background: colors.muted[50],
    border: colors.muted[300],
    text: colors.gray[700],
  },
}

const stratumName = (high: boolean) => (high ? 'SeLECT ≥4' : 'SeLECT <4')

const yesNo = (value: number) => (value ? 'YES' : 'NO')

const recommendationText = (recommendation?: Recommendation) => {
  if (!recommendation) {
    return 'No phenotype-specific estimate'
  }
  const { clinical, prognostic } = recommendation
  return `${clinical ? `Clinical: ${clinical}; ` : ''}Prognostic: ${prognostic}`
}

const Chip = ({ label, active }: { label: string; active?: boolean }) => (
  <View style={[styles.chip, active && styles.chipActive]}>
    <Text style={active && styles.chipActiveText}>{label}</Text>
  </View>
)

const Card = ({ title, children }: { title: string; children: ReactNode }) => (
  <View style={styles.card}>
    <Heading size="sm" style={styles.cardTitle}>
      {title}
    </Heading>
    {children}
  </View>
)

const Small = ({ children }: { children: ReactNode }) => (
  <Text style={styles.small}>{children}</Text>
)

const Line = ({
  label,
  value,
  color,
}: {
  label: string
  value: string
  color?: string
}) => (
  <Text style={color ? { color } : undefined}>
    <Text style={color ? { color } : styles.muted}>{label}: </Text>
    {value}
  </Text>
)

const RecommendationLines = ({
  recommendation,
  color,
}: {
  recommendation: Recommendation
  color?: string
}) => (
  <>
    {recommendation.clinical && (
      <Line label="Clinical" value={recommendation.clinical} color={color} />
    )}
    <Line label="Prognostic" value={recommendation.prognostic} color={color} />
  </>
)

const MatrixCard = ({
  phenotype,
  highlighted,
}: {
  phenotype: SEEGPhenotype
  highlighted: boolean
}) => {
  const row = ceegTable[phenotype]
  return (
    <View style={[styles.matrixCard, highlighted && styles.matrixHighlight]}>
      <Heading size="sm">{phenotypeLabel[phenotype]}</Heading>
      <Line label="ES yield" value={row.esYield} />
      <Line label="EA yield" value={row.eaYield} />
      <Line
        label="sHR PSE (95% CI)"
        value={row.shr ? `${row.shr.value} (${row.shr.ci})` : '0 PSE cases'}
      />
      <Line label="Δpoints (mean)" value={row.deltaPoints} />
      <Line
        label={stratumName(false)}
        value={recommendationText(row.strata?.low)}
      />
      <Line
        label={stratumName(true)}
        value={recommendationText(row.strata?.high)}
      />
      <Line label="Rhythmicity/combinations" value={row.combinations} />
      <Line label="SeLECT effect" value={row.selectEffect} />
    </View>
  )
}

const EffectSizes = ({ phenotype }: { phenotype: SEEGPhenotype }) => (
  <>
    <Small>
      sHR = Fine–Gray subdistribution hazard ratio for PSE; OR = pattern
      enrichment on cEEG vs sEEG.
    </Small>
    {matrixOrder.map((p) => {
      const { shr, or } = ceegTable[p]
      return (
        <View
          key={p}
          style={[styles.matrixCard, p === phenotype && styles.matrixHighlight]}
        >
          <Heading size="sm">{phenotypeLabel[p]}</Heading>
          <Line
            label="sHR PSE (95% CI)"
            value={shr ? `${shr.value} (${shr.ci})` : '0 PSE cases'}
          />
          <Line label="OR cEEG vs sEEG (95% CI)" value={or} />
        </View>
      )
    })}
  </>
)

const Definitions = () => (
  <>
    <Heading size="sm" style={styles.legendTitle}>
      Recommendation legend
    </Heading>
    {gradesHighestFirst.map((grade) => (
      <View key={grade} style={styles.legendRow}>
        <View
          style={[
            styles.legendGrade,
            {
              backgroundColor: gradeColors[grade].background,
              borderColor: gradeColors[grade].border,
            },
          ]}
        >
          <Text style={{ color: gradeColors[grade].text }}>{grade}</Text>
        </View>
        <Text>{gradeLabel[grade]}</Text>
      </View>
    ))}
    <Heading size="sm" style={styles.legendTitle}>
      Definitions
    </Heading>
    {definitions.map((definition) => (
      <Text key={definition}>{definition}</Text>
    ))}
  </>
)

const detailTabs = ['Data matrix', 'Effect sizes (OR/sHR)', 'Definitions/legend']

const CEEG = ({
  phenotype,
  select20,
  regionalSlowing,
  epileptiformActivity,
}: CEEGProps) => {
  const navigation = useNavigation()
  const [high, setHigh] = useState(select20 >= 4)
  const [detailTab, setDetailTab] = useState(0)
  const row = ceegTable[phenotype]
  const recommendation = row.strata?.[high ? 'high' : 'low']
  const grade = recommendation && headlineGrade(recommendation)
  const palette = gradeColors[grade ?? '—']

  return (
    <Content contentContainerStyle={styles.page}>
      <View style={styles.titleRow}>
        <Heading style={styles.grow}>cEEG extension: expected impact</Heading>
        <IconButton
          name="information"
          onPress={() => navigation.navigate('SEEGPhenotypeInfo')}
        />
      </View>
      <Text style={styles.muted}>
        sEEG phenotype + baseline risk (SeLECT2.0) → expected cEEG detection
        yield, prognostic impact for PSE, and monitoring recommendation.
      </Text>

      <View style={styles.parameters}>
        <Text style={styles.muted}>Selected parameters:</Text>
        <View style={styles.chips}>
          <Chip label="Early EEG: YES" />
          <Chip label={`Regional slowing (sEEG): ${yesNo(regionalSlowing)}`} />
          <Chip
            label={`Epileptiform activity (sEEG): ${yesNo(epileptiformActivity)}`}
          />
          <Chip
            active
            label={`sEEG phenotype: ${phenotypeLabel[phenotype]}`}
          />
        </View>
        <Text style={styles.muted}>
          Baseline prescreen (patient: {select20} SeLECT 2.0 points):
        </Text>
        <View style={styles.segment}>
          <Segment
            options={[
              { label: stratumName(false), value: 0 },
              { label: stratumName(true), value: 1 },
            ]}
            selected={high ? 1 : 0}
            onPress={(value) => setHigh(value === 1)}
          />
        </View>
      </View>

      <View
        style={[
          styles.overall,
          { backgroundColor: palette.background, borderColor: palette.border },
        ]}
      >
        <View style={styles.grow}>
          <Text style={{ color: palette.text }}>
            Overall cEEG recommendation ({stratumName(high)}):
          </Text>
          <Heading size="md" style={{ color: palette.text }}>
            {grade ? gradeLabel[grade] : 'No phenotype-specific estimate'}
          </Heading>
          {recommendation ? (
            <RecommendationLines
              recommendation={recommendation}
              color={palette.text}
            />
          ) : (
            <Text style={{ color: palette.text }}>
              {phenotypeLabel[phenotype]} has no row in Supplemental Table 4.
              Use clinical judgement.
            </Text>
          )}
        </View>
        {grade && (
          <Text style={[styles.overallGrade, { color: palette.text }]}>
            {grade}
          </Text>
        )}
      </View>

      <Card title="Expected cEEG clinical detection yield">
        <Line
          label="ES yield (electrographic seizures/status)"
          value={row.esYield}
        />
        <Line label="EA yield (IED/LPD/GPD/ES composite)" value={row.eaYield} />
        {row.esYield.includes('†') && (
          <Text style={styles.warning}>
            † Small-n for ES yield; interpret directionally.
          </Text>
        )}
        <Small>
          Yields are approximate; uncertainty is summarized via effect sizes
          (see details below).
        </Small>
      </Card>

      <Card title="Prognostic impact for future PSE">
        {row.shr ? (
          <>
            <Heading style={styles.shr}>sHR {row.shr.value}</Heading>
            <Text style={styles.muted}>95% CI: {row.shr.ci}</Text>
          </>
        ) : (
          <>
            <Heading size="md">Not enough data</Heading>
            <Text style={styles.muted}>0 PSE cases</Text>
          </>
        )}
        <Small>Competing-risk model; association ≠ causation.</Small>
      </Card>

      <Card title="Incremental prognostic gain from extending to cEEG">
        <Heading size="md">{row.deltaPoints}</Heading>
        <Text style={styles.muted}>Expected mean ΔSeLECT-EEG points</Text>
        <Small>
          Δpoints = expected average score increase if cEEG newly detects
          regional slowing and/or EA after sEEG (not a probability).
        </Small>
      </Card>

      <Card title="Recommendation (stratified by SeLECT2.0)">
        {[false, true].map((stratumHigh) => {
          const stratum = row.strata?.[stratumHigh ? 'high' : 'low']
          const selected = stratumHigh === high
          return (
            <View
              key={stratumName(stratumHigh)}
              style={[
                styles.stratum,
                selected && {
                  backgroundColor: palette.background,
                  borderColor: palette.border,
                },
              ]}
            >
              <Heading size="sm">{stratumName(stratumHigh)}</Heading>
              {stratum ? (
                <RecommendationLines recommendation={stratum} />
              ) : (
                <Text>No phenotype-specific estimate</Text>
              )}
            </View>
          )
        })}
      </Card>

      <Collapsible title="Effect-size summary (SeLECT-high vs SeLECT-low gain)">
        {effectSizeSummary.map((text) => (
          <Text key={text}>{text}</Text>
        ))}
      </Collapsible>
      <Collapsible title="Limitations (paper)">
        {limitations.map((text) => (
          <Li key={text}>{text}</Li>
        ))}
      </Collapsible>
      <Collapsible title="Show full data details">
        <View style={styles.chips}>
          {detailTabs.map((label, index) => (
            <Button
              key={label}
              variant={index === detailTab ? 'solid' : 'outline'}
              onPress={() => setDetailTab(index)}
            >
              {label}
            </Button>
          ))}
        </View>
        {detailTab === 0 &&
          matrixOrder.map((p) => (
            <MatrixCard key={p} phenotype={p} highlighted={p === phenotype} />
          ))}
        {detailTab === 1 && <EffectSizes phenotype={phenotype} />}
        {detailTab === 2 && <Definitions />}
      </Collapsible>
    </Content>
  )
}

const styles = StyleSheet.create({
  page: {
    paddingBottom: 32,
  },
  titleRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  grow: {
    flex: 1,
  },
  muted: {
    color: colors.gray[500],
  },
  small: {
    color: colors.gray[500],
    fontSize: 12,
    lineHeight: 18,
    marginTop: 8,
  },
  parameters: {
    backgroundColor: colors.muted[50],
    borderColor: colors.muted[200],
    borderRadius: radius.lg,
    borderWidth: 1,
    gap: 8,
    marginTop: 12,
    padding: 12,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  chip: {
    backgroundColor: colors.white,
    borderColor: colors.muted[300],
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  chipActive: {
    backgroundColor: colors.primary[700],
    borderColor: colors.primary[700],
  },
  chipActiveText: {
    color: colors.white,
  },
  segment: {
    flexDirection: 'row',
  },
  overall: {
    alignItems: 'center',
    borderRadius: radius.lg,
    borderWidth: 2,
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
    padding: 12,
  },
  overallGrade: {
    fontSize: 34,
    fontWeight: '700',
    lineHeight: 40,
  },
  card: {
    borderColor: colors.muted[200],
    borderRadius: radius.lg,
    borderWidth: 1,
    gap: 4,
    marginTop: 12,
    padding: 12,
  },
  cardTitle: {
    borderBottomWidth: 0.5,
    borderColor: colors.gray[300],
    marginBottom: 4,
    paddingBottom: 8,
  },
  warning: {
    backgroundColor: '#fef9c3',
    borderRadius: radius.sm,
    color: '#713f12',
    marginTop: 4,
    padding: 8,
  },
  shr: {
    color: colors.primary[700],
  },
  stratum: {
    borderColor: colors.muted[200],
    borderRadius: radius.sm,
    borderWidth: 1,
    marginTop: 4,
    padding: 8,
  },
  matrixCard: {
    borderColor: colors.muted[200],
    borderRadius: radius.sm,
    borderWidth: 1,
    marginTop: 8,
    padding: 8,
  },
  matrixHighlight: {
    backgroundColor: colors.primaryHover,
    borderColor: colors.primary[600],
    borderWidth: 2,
  },
  legendTitle: {
    marginBottom: 4,
    marginTop: 12,
  },
  legendRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  legendGrade: {
    alignItems: 'center',
    borderRadius: radius.sm,
    borderWidth: 1,
    width: 44,
  },
})

export default CEEG
