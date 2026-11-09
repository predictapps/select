import { useEffect, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import {
  Chart,
  ChartDataPoint,
  HorizontalAxis,
  Line,
  VerticalAxis,
} from 'react-native-responsive-linechart'

import PredictionPanel from './PredictionPanel'
import Tooltip from './Tooltip'
import { colors } from '../theme'

type LineRef = React.ComponentRef<typeof Line>

export const toPoints = (row: number[], scale = 1): ChartDataPoint[] =>
  row.map((y, x) => ({ x, y: y * scale }))

interface PredictionViewProps {
  values: ChartDataPoint[]
  mins: ChartDataPoint[]
  maxs: ChartDataPoint[]
  limit?: ChartDataPoint[]
  maxMonth: number
  monthTicks: number
  title: string
  infoScreen: 'RiskInfo' | 'CosyInfo'
  caption: string
  tooltipFollowsSlider?: boolean
}

const axisLabel = { label: { fontFamily: 'Arial' } }
const primary = colors.primary[500]
const confidenceTheme = {
  stroke: { color: primary, width: 2, dashArray: [5] },
}

const PredictionView = ({
  values,
  mins,
  maxs,
  limit,
  maxMonth,
  monthTicks,
  title,
  infoScreen,
  caption,
  tooltipFollowsSlider = false,
}: PredictionViewProps) => {
  const navigation = useNavigation()
  const line = useRef<LineRef>(null)
  const [selected, setSelected] = useState(12)

  useEffect(() => {
    if (tooltipFollowsSlider) {
      line.current?.setTooltipIndex(selected)
    }
  }, [selected, tooltipFollowsSlider])

  return (
    <>
      <Chart
        style={{ height: '100%', maxHeight: 300, width: '100%' }}
        padding={{ left: 40, bottom: 20, right: 20, top: 40 }}
        xDomain={{ min: 0, max: maxMonth }}
        yDomain={{ min: 0, max: 100 }}
      >
        <VerticalAxis
          tickCount={11}
          theme={{
            labels: { ...axisLabel, formatter: (v) => v.toFixed(0) + '%' },
          }}
        />
        <HorizontalAxis
          tickCount={monthTicks}
          theme={{ labels: axisLabel }}
        />
        {limit && (
          <Line
            data={limit}
            theme={{ stroke: { color: '#DD0000', width: 1 } }}
          />
        )}
        <Line data={mins} theme={confidenceTheme} />
        <Line data={maxs} theme={confidenceTheme} />
        <Line
          data={values}
          ref={line}
          initialTooltipIndex={selected}
          tooltipComponent={<Tooltip />}
          theme={{
            stroke: { color: primary, width: 4 },
            scatter: {
              default: { width: 0, height: 0, rx: 5 },
              selected: {
                width: 10,
                height: 10,
                color: colors.primary[800],
              },
            },
          }}
          onTooltipSelect={(_, i) => setSelected(i)}
        />
      </Chart>
      <PredictionPanel
        title={title}
        onInfo={() => navigation.navigate(infoScreen)}
        caption={`${selected} ${caption}`}
        min={mins[selected].y.toFixed(0)}
        max={maxs[selected].y.toFixed(0)}
        value={values[selected].y.toFixed(0)}
        month={selected}
        maxMonth={maxMonth}
        onMonthChange={setSelected}
      />
    </>
  )
}

export default PredictionView
