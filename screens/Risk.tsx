import React, { useEffect, useMemo, useState } from 'react'
import {
  Heading,
  IconButton,
  Icon,
  HStack,
  Slider,
  VStack,
  Text,
  View,
} from 'native-base'
import {
  Chart,
  Line,
  HorizontalAxis,
  VerticalAxis,
} from 'react-native-responsive-linechart'

import { theme } from '../NativeBase'
import { useNavigation } from '@react-navigation/native'
import { ModelData } from '../types'
import Tooltip from '../components/Tooltip'

const primary = theme.colors.primary[500]
const primary800 = theme.colors.primary[800]

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
      <View mx="5" mt="3">
        <HStack alignItems="center">
          <Heading flex={1}>Risk of late seizures</Heading>
          <IconButton
            icon={<Icon name="information" />}
            onPress={() => navigation.navigate('RiskInfo')}
          />
        </HStack>
        <HStack
          borderColor="gray.400"
          borderTopWidth={0.5}
          py="1"
          alignItems="center"
        >
          <VStack flex={1}>
            <Text>{selected} months after stroke</Text>
            <Text color="muted.400">
              ({min}% - {max}%)
            </Text>
          </VStack>
          <Heading size="md">{value}%</Heading>
        </HStack>
        <HStack
          justifyContent="space-between"
          borderColor="gray.400"
          borderBottomWidth={0.5}
          borderTopWidth={0.5}
          py="3"
          alignItems="center"
        >
          <Heading size="md" fontWeight="300" pl="2">
            0
          </Heading>
          <Slider
            w="75%"
            defaultValue={selected}
            minValue={0}
            maxValue={60}
            value={selected}
            onChange={setSelected}
          >
            <Slider.Track>
              <Slider.FilledTrack />
            </Slider.Track>
            <Slider.Thumb />
          </Slider>
          <Heading size="md" fontWeight="300" pr="2">
            60
          </Heading>
        </HStack>
      </View>
    </>
  )
}

export default Risk
