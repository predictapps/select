import { useMemo } from 'react'

import PredictionView, { toPoints } from '../components/PredictionView'
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
      maxMonth={60}
      monthTicks={6}
      title="Risk of late seizures"
      infoScreen="RiskInfo"
      caption="months after stroke"
      tooltipFollowsSlider
    />
  )
}

export default Risk
