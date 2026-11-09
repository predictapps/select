// sEEG -> cEEG extension. Single source: manuscript Table 2, Table 3 and
// Supplemental Table 4 (revision 03/2026), as listed in section C5 of the
// 2026-10 change request.

export enum SEEGPhenotype {
  ElectrographicStatus,
  ElectrographicSeizure,
  LPD,
  IED,
  LRDA,
  GPD,
  GRDA,
  RegionalSlowing,
  GeneralizedSlowing,
  Normal,
}

// Worst first: the first selected phenotype in this order is the dominant one.
export const phenotypeOrder: SEEGPhenotype[] = [
  SEEGPhenotype.ElectrographicStatus,
  SEEGPhenotype.ElectrographicSeizure,
  SEEGPhenotype.LPD,
  SEEGPhenotype.IED,
  SEEGPhenotype.LRDA,
  SEEGPhenotype.GPD,
  SEEGPhenotype.GRDA,
  SEEGPhenotype.RegionalSlowing,
  SEEGPhenotype.GeneralizedSlowing,
]

// Display order of the input chips (C2); differs from the severity order.
export const phenotypeChips: SEEGPhenotype[] = [
  SEEGPhenotype.ElectrographicStatus,
  SEEGPhenotype.ElectrographicSeizure,
  SEEGPhenotype.LPD,
  SEEGPhenotype.IED,
  SEEGPhenotype.GPD,
  SEEGPhenotype.LRDA,
  SEEGPhenotype.RegionalSlowing,
  SEEGPhenotype.GRDA,
  SEEGPhenotype.GeneralizedSlowing,
]

// Row order of the data matrix (C5).
export const matrixOrder: SEEGPhenotype[] = [
  SEEGPhenotype.Normal,
  SEEGPhenotype.GeneralizedSlowing,
  SEEGPhenotype.GRDA,
  SEEGPhenotype.RegionalSlowing,
  SEEGPhenotype.LRDA,
  SEEGPhenotype.GPD,
  SEEGPhenotype.IED,
  SEEGPhenotype.LPD,
  SEEGPhenotype.ElectrographicSeizure,
  SEEGPhenotype.ElectrographicStatus,
]

export const phenotypeLabel: Record<SEEGPhenotype, string> = {
  [SEEGPhenotype.ElectrographicStatus]: 'Electrographic status',
  [SEEGPhenotype.ElectrographicSeizure]: 'Electrographic seizure',
  [SEEGPhenotype.LPD]: 'LPD',
  [SEEGPhenotype.IED]: 'IED',
  [SEEGPhenotype.LRDA]: 'LRDA',
  [SEEGPhenotype.GPD]: 'GPD',
  [SEEGPhenotype.GRDA]: 'GRDA',
  [SEEGPhenotype.RegionalSlowing]: 'Regional slowing',
  [SEEGPhenotype.GeneralizedSlowing]: 'Generalized slowing',
  [SEEGPhenotype.Normal]: 'Normal',
}

// Patterns that count as epileptiform activity / regional slowing in the score.
export const impliesEpileptiformActivity = new Set<SEEGPhenotype>([
  SEEGPhenotype.ElectrographicStatus,
  SEEGPhenotype.ElectrographicSeizure,
  SEEGPhenotype.LPD,
  SEEGPhenotype.IED,
  SEEGPhenotype.LRDA,
  SEEGPhenotype.GPD,
])
export const impliesRegionalSlowing = new Set<SEEGPhenotype>([
  SEEGPhenotype.RegionalSlowing,
])

export type Grade = '+++' | '++' | '+' | '±' | '—'

// Lowest to highest.
const grades: Grade[] = ['—', '±', '+', '++', '+++']

export const gradeLabel: Record<Grade, string> = {
  '+++': 'Strongly extend cEEG',
  '++': 'Extend/target cEEG',
  '+': 'Consider cEEG',
  '±': 'Usually no cEEG needed',
  '—': 'No cEEG needed',
}

export const gradesHighestFirst = [...grades].reverse()

export interface Recommendation {
  clinical?: string
  prognostic: string
}

// Reads the grade a recommendation starts with; texts without one rank lowest.
const gradeRank = (text = '') =>
  Math.max(0, grades.indexOf((/^(\+{1,3}|±|—)/.exec(text)?.[0] ?? '—') as Grade))

// Headline = the higher of the Clinical and Prognostic grades.
export const headlineGrade = ({ clinical, prognostic }: Recommendation) =>
  grades[Math.max(gradeRank(clinical), gradeRank(prognostic))]

export interface CEEGRow {
  esYield: string
  eaYield: string
  // Absent when there is not enough data (0 PSE cases).
  shr?: { value: string; ci: string }
  or: string
  deltaPoints: string
  // Absent when there is no phenotype-specific estimate (GPD).
  strata?: { low: Recommendation; high: Recommendation }
  combinations: string
  selectEffect: string
}

const NO_ESTIMATE = 'No phenotype-specific estimate'

const seizureRow: Pick<
  CEEGRow,
  'esYield' | 'eaYield' | 'deltaPoints' | 'strata' | 'combinations' | 'selectEffect'
> = {
  esYield: 'already ES+/EA+',
  eaYield: 'already ES+/EA+',
  deltaPoints: 'None (already maxed)',
  strata: {
    low: {
      clinical: '+++ (management/trending)',
      prognostic: 'n/a (gain none)',
    },
    high: {
      clinical: '+++ (management/trending)',
      prognostic: 'n/a (gain none)',
    },
  },
  combinations:
    'Often with generalized/regional slowing; status mandates continuous monitoring',
  selectEffect: 'SeLECT refines prognosis only; not the monitoring decision',
}

export const ceegTable: Record<SEEGPhenotype, CEEGRow> = {
  [SEEGPhenotype.Normal]: {
    esYield: '~0–3%',
    eaYield: '~3%',
    or: '0.66 (0.38–1.14)',
    deltaPoints: '~0.3',
    strata: {
      low: { clinical: '—', prognostic: 'gain minimal' },
      high: { clinical: '± if strong concern', prognostic: 'gain minimal' },
    },
    combinations: '–',
    selectEffect: 'SeLECT <4: stays very low. SeLECT ≥4: only modestly higher.',
  },
  [SEEGPhenotype.GeneralizedSlowing]: {
    esYield: '~2%',
    eaYield: '~17%',
    shr: { value: '1.04', ci: '0.56–1.93' },
    or: '0.41 (0.29–0.57)',
    deltaPoints: '~0.5–0.8 (if new RS/EA found)',
    strata: {
      low: { prognostic: '±' },
      high: { clinical: '+', prognostic: '+++' },
    },
    combinations: 'Often “upgrades” on cEEG to GRDA and/or EA with time',
    selectEffect: 'SeLECT ≥4 enriches both detection and prognostic gain',
  },
  [SEEGPhenotype.GRDA]: {
    esYield: 'Low',
    eaYield: '~8% (≈20% if SeLECT≥4)',
    shr: { value: '1.06', ci: '0.57–1.98' },
    or: '3.93 (2.56–6.04)',
    deltaPoints: '~0.4–0.6',
    strata: {
      low: { prognostic: '±' },
      high: { clinical: '+', prognostic: '+++' },
    },
    combinations: 'Rhythmicity bridges slowing→EA; GRDA+EA raises concern',
    selectEffect: 'SeLECT ≥4 meaningfully enriches yield',
  },
  [SEEGPhenotype.RegionalSlowing]: {
    esYield: '~3%',
    eaYield: '~8% (≈12% if SeLECT≥4)',
    shr: { value: '1.92', ci: '0.95–3.89' },
    or: '2.07 (1.48–2.90)',
    deltaPoints: '~0.3–0.5 (mainly via new EA)',
    strata: {
      low: { prognostic: '±' },
      high: { clinical: '+', prognostic: '++' },
    },
    combinations: 'Watch transition to LRDA – key driver of yield',
    selectEffect:
      'SeLECT ≥4 moves into “higher risk” zone (for PSE); <4 usually lower',
  },
  [SEEGPhenotype.LRDA]: {
    esYield: '~8%',
    eaYield: '~25%',
    shr: { value: '1.96', ci: '0.91–4.23' },
    or: '2.65 (1.36–5.16)',
    deltaPoints: '≤~0.3 (EA-like already present; only RS can add)',
    strata: {
      low: { clinical: '+', prognostic: '±' },
      high: { clinical: '++', prognostic: '++' },
    },
    combinations:
      'EA-like and often coexists with slowing; monitor for electrographic seizures/status',
    selectEffect: 'SeLECT ≥4 further enriches',
  },
  // No row in Suppl. Table 4; handling is an open decision for Marian (option a).
  [SEEGPhenotype.GPD]: {
    esYield: NO_ESTIMATE,
    eaYield: '—',
    shr: { value: '0.74', ci: '0.11–4.97' },
    or: '2.72 (0.71–10.34)',
    deltaPoints: '—',
    combinations: '–',
    selectEffect: '–',
  },
  [SEEGPhenotype.IED]: {
    esYield: '~22% †',
    eaYield: 'already EA+ on sEEG',
    shr: { value: '2.14', ci: '1.00–4.55' },
    or: '3.75 (1.75–8.02)',
    deltaPoints: '0–~0.3 (EA already present; only RS can add)',
    strata: {
      low: {
        clinical: '++ (burden/ES capture)',
        prognostic: '+ only if RS absent, else ±',
      },
      high: {
        clinical: '+++ (burden/ES capture)',
        prognostic: '+ only if RS absent, else ±',
      },
    },
    combinations:
      'Often with slowing; IED + generalized/regional slowing refines risk level',
    selectEffect: 'SeLECT ≥4 increases pre-test probability',
  },
  [SEEGPhenotype.LPD]: {
    esYield: '~33% †',
    eaYield: 'already EA+ on sEEG',
    shr: { value: '4.50', ci: '2.13–9.51' },
    or: '2.04 (0.76–5.52)',
    deltaPoints: '~0–0.2 (EA already present; RS adds little)',
    strata: {
      low: { clinical: '+++', prognostic: '+ only if RS absent, else ±' },
      high: { clinical: '+++', prognostic: '+ only if RS absent, else ±' },
    },
    combinations: 'Mixed EA + slowing common; high vigilance for status',
    selectEffect: 'SeLECT ≥4 concentrates highest yield/gain',
  },
  [SEEGPhenotype.ElectrographicSeizure]: {
    ...seizureRow,
    shr: { value: '3.63', ci: '1.52–8.63' },
    or: '6.22 (1.38–28.06)',
  },
  [SEEGPhenotype.ElectrographicStatus]: {
    ...seizureRow,
    or: '1.00 (0.06–16.07)',
  },
}

export const effectSizeSummary = [
  'Mean expected gain (High ≥4) − (Low <4): +0.10 (p = 2.7×10⁻⁴)',
  'Gain per possible point: +0.072 (p = 9.2×10⁻⁶)',
  'Gain = Σ P(new RS) + P(new EA) from cEEG; 15 excluded with 0 possible points.',
]

export const limitations = [
  'Retrospective, clinically-indicated cEEG cohort; confounding by indication; enriched higher-risk mix.',
  'Two subcohorts with differing monitoring indications/workflows; within-recording comparison isolates duration but may not mirror routine workflows.',
  'Intended for EEG within first 7 days; latency not modelled; timing can be imprecise retrospectively.',
  'Some phenotypes/endpoints small n; interpret gradients not rigid cutoffs.',
  'Treatment response to EEG (ASM/sedation) can confound.',
  'Not intended for ASyS-positive patients; external/prospective validation required.',
]

export const definitions = [
  'sEEG = short EEG (routine, <12 h)',
  'cEEG = continuous EEG monitoring (≥12 h)',
  'EA = epileptiform activity (IED/LPD/GPD/ES composite)',
  'ES = electrographic seizures/status',
  'IED = interictal epileptiform discharges',
  'LPD = lateralized periodic discharges',
  'GPD = generalized periodic discharges',
  'GRDA = generalized rhythmic delta activity',
  'LRDA = lateralized rhythmic delta activity',
  'RS = regional slowing',
  'PSE = post-stroke epilepsy',
  'sHR = subdistribution hazard ratio (competing-risk model)',
  'OR = odds ratio',
  'CI = confidence interval',
]

export const dominantPhenotype = (selected: SEEGPhenotype[]): SEEGPhenotype =>
  phenotypeOrder.find((p) => selected.includes(p)) ?? SEEGPhenotype.Normal
