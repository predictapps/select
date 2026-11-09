import { StatusBar } from 'expo-status-bar'
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context'

import Navigation from './navigation'
import Storage from './Storage'
import Phone from './components/Phone'

const App = () => (
  <Storage>
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <Phone>
        <Navigation />
        <StatusBar style="light" />
      </Phone>
    </SafeAreaProvider>
  </Storage>
)

export default App
