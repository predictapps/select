import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Calculate from '../screens/Calculate'
import Prediction from '../screens/Prediction'
import BottomTabNavigator from './BottomTabNavigator'
import NotFoundScreen from '../screens/NotFoundScreen'
import { RootStackParamList } from './types'
import P1 from '../screens/P1'
import P2 from '../screens/P2'
import P3 from '../screens/P3'
import P4 from '../screens/P4'
import P5 from '../screens/P5'
import P6 from '../screens/P6'
import P7 from '../screens/P7'
import RiskInfo from '../screens/RiskInfo'
import CosyInfo from '../screens/CosyInfo'
import EarlyEEG from '../screens/EarlyEEG'
import RegionalSlowing from '../screens/RegionalSlowing'
import EpileptiformActivity from '../screens/EpileptiformActivity'

const Stack = createNativeStackNavigator<RootStackParamList>()

const RootNavigator = () => (
  <Stack.Navigator>
    <Stack.Group screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Calculate" component={Calculate} />
      <Stack.Screen name="P1" component={P1} />
      <Stack.Screen name="P2" component={P2} />
      <Stack.Screen name="P3" component={P3} />
      <Stack.Screen name="P4" component={P4} />
      <Stack.Screen name="P5" component={P5} />
      <Stack.Screen name="P6" component={P6} />
      <Stack.Screen name="P7" component={P7} />
      <Stack.Screen name="EarlyEEG" component={EarlyEEG} />
      <Stack.Screen name="RegionalSlowing" component={RegionalSlowing} />
      <Stack.Screen
        name="EpileptiformActivity"
        component={EpileptiformActivity}
      />
      <Stack.Screen name="RiskInfo" component={RiskInfo} />
      <Stack.Screen name="CosyInfo" component={CosyInfo} />
      <Stack.Screen
        name="Prediction"
        component={Prediction}
        // iOS 26+ swipes back from anywhere by default, which hijacks the slider
        options={{ fullScreenGestureEnabled: false }}
      />
      <Stack.Screen name="BottomTab" component={BottomTabNavigator} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} />
    </Stack.Group>
  </Stack.Navigator>
)

export default RootNavigator
