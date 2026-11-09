import { Text, Rect } from 'react-native-svg'
import {
  ChartDataPoint,
  XYValue,
} from 'react-native-responsive-linechart'

const WIDTH = 60
const HEIGHT = 40

const label = {
  fill: 'white',
  fontFamily: 'Arial',
  fontWeight: 700,
  textAnchor: 'middle',
} as const

// The chart injects value and position when it renders the tooltip.
const Tooltip = ({
  value,
  position,
}: {
  value?: ChartDataPoint
  position?: XYValue
}) => {
  if (!value || !position) {
    return null
  }

  const { x, y } = position
  return (
    <>
      <Rect
        x={x - WIDTH / 2}
        y={y - HEIGHT / 2 - 34}
        rx={4}
        fill="rgba(0,0,0,.7)"
        height={HEIGHT}
        width={WIDTH}
      />
      <Text {...label} x={x} y={y - 20} fontSize={12}>
        {`Month ${value.x}`}
      </Text>
      <Text {...label} x={x} y={y - 35} fontSize={18}>
        {`${value.y.toFixed(0)}%`}
      </Text>
    </>
  )
}

export default Tooltip
