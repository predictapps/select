import React from 'react'
import { Heading, IconButton, Icon, HStack } from 'native-base'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import {
  PredictionTabParamList,
  RootStackScreenProps,
} from '../navigation/types'
import Risk from '../screens/Risk'
import Cosy from '../screens/Cosy'

const BottomTab = createBottomTabNavigator<PredictionTabParamList>()

const Prediction = ({
  navigation,
  route,
}: RootStackScreenProps<'Prediction'>) => {
  const { score } = route.params
  return (
    <>
      <HStack safeAreaTop bg="primary.500" pr="50px">
        <IconButton
          icon={<Icon name="arrow-left" color="white" size="xl" />}
          onPress={() => navigation.navigate('Calculate')}
        />
        <Heading alignSelf="center" flex={1} textAlign="center" color="white">
          Score {score}
        </Heading>
      </HStack>

      <BottomTab.Navigator
        screenOptions={{
          tabBarLabelPosition: 'below-icon',
          headerShown: false,
          tabBarLabelStyle: { fontWeight: '500' },
        }}
      >
        <BottomTab.Screen
          name="Risk"
          options={{
            tabBarLabel: 'Risk of late seizures',
            tabBarIcon: ({ color }) => (
              <Icon name="brain" color={color} size="xl" />
            ),
          }}
        >
          {() => <Risk score={score} />}
        </BottomTab.Screen>
        <BottomTab.Screen
          name="Cosy"
          options={{
            tabBarLabel: 'Risks for driving',
            tabBarIcon: ({ color }) => (
              <Icon name="car-traction-control" color={color} size="xl" />
            ),
          }}
        >
          {() => <Cosy score={score} />}
        </BottomTab.Screen>
      </BottomTab.Navigator>
    </>
  )
}

export default Prediction
