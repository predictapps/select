import { useMemo } from 'react'

import PredictionView, {
  extrapolationNote,
  toPoints,
} from '../components/PredictionView'
import { ModelData } from '../types'

interface RiskProps {
  model: ModelData
  score: number
}

const Risk = ({ score, model }: RiskProps) => {
  const [values, mins, maxs] = useMemo(
    () => [
      toPoints(model.value[score], 100),
      toPoints(model.min[score], 100),
      toPoints(model.max[score], 100),
    ],
    [score]
  )
  return (
    <PredictionView
      values={values}
      mins={mins}
      maxs={maxs}
      maxMonth={120}
      monthTicks={11}
      title="Risk of late seizures"
      infoScreen="RiskInfo"
      caption="months after stroke"
      note={extrapolationNote(
        model.supportedToMonth?.[score],
        120,
        'later values (up to 10 years) are extrapolated with a parametric model.'
      )}
      tooltipShiftFrom={110}
      tooltipFollowsSlider
    />
  )
}

export default Risk
