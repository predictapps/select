import { useMemo } from 'react'

import PredictionView, { toPoints } from '../components/PredictionView'
import { ModelData } from '../types'

interface CosyProps {
  model: ModelData
  score: number
}

const Cosy = ({ score, model }: CosyProps) => {
  const [values, mins, maxs, limit] = useMemo(() => {
    const maxs = toPoints(model.max[score])
    return [
      toPoints(model.value[score]),
      toPoints(model.min[score]),
      maxs,
      maxs.map(({ x }) => ({ x, y: 20 + Math.random() * 0.01 })),
    ]
  }, [score])
  return (
    <PredictionView
      values={values}
      mins={mins}
      maxs={maxs}
      limit={limit}
      maxMonth={24}
      monthTicks={5}
      title="Chance of seizures in the next year"
      infoScreen="CosyInfo"
      caption="months seizure-free after stroke"
    />
  )
}

export default Cosy
