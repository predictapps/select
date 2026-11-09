import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import {
  PredictionTabParamList,
  RootStackScreenProps,
} from '../navigation/types'
import Icon from '../components/Icon'
import ScreenHeader from '../components/ScreenHeader'
import Risk from '../screens/Risk'
import Cosy from '../screens/Cosy'
import CEEG from '../screens/CEEG'
import { SEEGPhenotype } from '../models/cEEG'
import { Model } from '../types'

import COSY_SeLECT2 from '../models/COSY_SeLECT2'
import COSY_SeLECT_EEG from '../models/COSY_SeLECT_EEG'
import COSY_SeLECT_ASyS from '../models/COSY_SeLECT_ASyS'
import SeLECT2 from '../models/SeLECT2'
import SeLECT_EEG from '../models/SeLECT_EEG'
import SeLECT_ASyS from '../models/SeLECT_ASyS'

const modelName = {
  [Model.SeLECT2]: 'SeLECT 2.0',
  [Model.SeLECT_ASyS]: 'SeLECT-ASyS',
  [Model.SeLECT_EEG]: 'SeLECT-EEG',
}

const cosyModels = {
  [Model.SeLECT2]: COSY_SeLECT2,
  [Model.SeLECT_ASyS]: COSY_SeLECT_ASyS,
  [Model.SeLECT_EEG]: COSY_SeLECT_EEG,
}

const riskModels = {
  [Model.SeLECT2]: SeLECT2,
  [Model.SeLECT_ASyS]: SeLECT_ASyS,
  [Model.SeLECT_EEG]: SeLECT_EEG,
}

const BottomTab = createBottomTabNavigator<PredictionTabParamList>()

const Prediction = ({
  navigation,
  route,
}: RootStackScreenProps<'Prediction'>) => {
  const {
    score,
    model,
    phenotype = SEEGPhenotype.Normal,
    select20 = 0,
    regionalSlowing = 0,
    epileptiformActivity = 0,
  } = route.params
  const cosy = cosyModels[model]
  const risk = riskModels[model]
  return (
    <>
      <ScreenHeader
        title={`${modelName[model]} Score ${score}`}
        onBack={() =>
          navigation.navigate('Calculate', undefined, { pop: true })
        }
      />

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
          {() => <Risk score={score} model={risk} />}
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
          {() => <Cosy score={score} model={cosy} />}
        </BottomTab.Screen>
        {model === Model.SeLECT_EEG && (
          <BottomTab.Screen
            name="CEEG"
            options={{
              tabBarLabel: 'cEEG yield',
              tabBarIcon: ({ color }) => (
                <Icon name="pulse" color={color} size="xl" />
              ),
            }}
          >
            {() => (
              <CEEG
                phenotype={phenotype}
                select20={select20}
                regionalSlowing={regionalSlowing}
                epileptiformActivity={epileptiformActivity}
              />
            )}
          </BottomTab.Screen>
        )}
      </BottomTab.Navigator>
    </>
  )
}

export default Prediction
