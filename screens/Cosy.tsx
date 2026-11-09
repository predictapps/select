import React, { useMemo, useState } from 'react'
import {
  Chart,
  Line,
  HorizontalAxis,
  VerticalAxis,
} from 'react-native-responsive-linechart'

import { colors } from '../theme'
import { useNavigation } from '@react-navigation/native'
import { ModelData } from '../types'
import PredictionPanel from '../components/PredictionPanel'
import Tooltip from '../components/Tooltip'

const primary = colors.primary[500]
const primary800 = colors.primary[800]

interface CosyProps {
  model: ModelData
  score: number
}

const Cosy: React.FC<CosyProps> = ({ score, model }) => {
  const [selected, setSelected] = useState(12)
  const navigation = useNavigation()
  const [values, mins, maxs, limitPrivate] = useMemo(
    () => [
      model.value[score].map((v, i) => ({ x: i, y: v })),
      model.min[score].map((v, i) => ({ x: i, y: v })),
      model.max[score].map((v, i) => ({ x: i, y: v })),
      model.max[score].map((v, i) => ({
        x: i,
        y: 20 + Math.random() * 0.01,
      })),
    ],
    [score]
  )
  const min = mins[selected].y.toFixed(0)
  const max = maxs[selected].y.toFixed(0)
  const value = values[selected].y.toFixed(0)
  return (
    <>
      <Chart
        style={{
          height: '100%',
          maxHeight: 300,
          width: '100%',
        }}
        padding={{ left: 40, bottom: 20, right: 20, top: 40 }}
        xDomain={{ min: 0, max: 24 }}
        yDomain={{ min: 0, max: 100 }}
      >
        <VerticalAxis
          tickCount={11}
          theme={{
            labels: {
              label: {
                fontFamily: 'Arial',
              },
              formatter: (v) => v.toFixed(0) + '%',
            },
          }}
        />
        <HorizontalAxis
          tickCount={5}
          theme={{
            labels: {
              label: {
                fontFamily: 'Arial',
              },
            },
          }}
        />
        <Line
          data={limitPrivate}
          theme={{
            stroke: {
              color: '#DD0000',
              width: 1,
            },
          }}
        />
        <Line
          data={mins}
          theme={{
            stroke: {
              color: primary,
              width: 2,
              dashArray: [5],
            },
          }}
        />
        <Line
          data={maxs}
          theme={{
            stroke: {
              color: primary,
              width: 2,
              dashArray: [5],
            },
          }}
        />
        <Line
          data={values}
          initialTooltipIndex={selected}
          tooltipComponent={
            <Tooltip
              theme={{
                label: {
                  dy: 20,
                  fontFamily: 'Arial',
                },
                shape: {
                  dy: 34,
                  width: 60,
                  height: 40,
                  color: 'rgba(0,0,0,.7)',
                },
                formatter: ({ x, y }) =>
                  'Month ' + x + ',' + y.toFixed(0) + '%',
              }}
            />
          }
          theme={{
            stroke: { color: primary, width: 4 },
            scatter: {
              default: { width: 0, height: 0, rx: 5 },
              selected: { width: 10, height: 10, color: primary800 },
            },
          }}
          onTooltipSelect={(_, i) => setSelected(i)}
        />
      </Chart>
      <PredictionPanel
        title="Chance of seizures in the next year"
        onInfo={() => navigation.navigate('CosyInfo')}
        caption={`${selected} months seizure-free after stroke`}
        min={min}
        max={max}
        value={value}
        month={selected}
        maxMonth={24}
        onMonthChange={setSelected}
      />
    </>
  )
}

export default Cosy
