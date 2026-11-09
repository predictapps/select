import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Icon from '../components/Icon'
import About from '../screens/About'
import Terms from '../screens/Terms'
import { BottomTabParamList } from './types'

const BottomTab = createBottomTabNavigator<BottomTabParamList>()

const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarLabelPosition: 'below-icon',
        headerShown: false,
        tabBarLabelStyle: { fontWeight: '500' },
      }}
    >
      <BottomTab.Screen
        name="About"
        component={About}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="information-outline" color={color} size="xl" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Terms"
        component={Terms}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="file-document-outline" color={color} size="xl" />
          ),
        }}
      />
    </BottomTab.Navigator>
  )
}

export default BottomTabNavigator
