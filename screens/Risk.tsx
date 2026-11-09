import React, { useEffect, useMemo, useState } from 'react'
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

interface RiskProps {
  model: ModelData
  score: number
}

const Risk: React.FC<RiskProps> = ({ score, model }) => {
  const line = React.useRef<typeof Line>(undefined)
  const [selected, setSelected] = useState(12)
  const navigation = useNavigation()
  const [values, mins, maxs] = useMemo(
    () => [
      model.value[score].map((v, i) => ({ x: i, y: v * 100 })),
      model.min[score].map((v, i) => ({ x: i, y: v * 100 })),
      model.max[score].map((v, i) => ({ x: i, y: v * 100 })),
    ],
    [score]
  )
  useEffect(() => {
    line.current?.setTooltipIndex(selected)
  }, [selected])
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
        xDomain={{ min: 0, max: 60 }}
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
          tickCount={6}
          theme={{
            labels: {
              label: {
                fontFamily: 'Arial',
              },
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
          ref={line}
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
        title="Risk of late seizures"
        onInfo={() => navigation.navigate('RiskInfo')}
        caption={`${selected} months after stroke`}
        min={min}
        max={max}
        value={value}
        month={selected}
        maxMonth={60}
        onMonthChange={setSelected}
      />
    </>
  )
}

export default Risk
