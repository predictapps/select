import { NavigatorScreenParams } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Model } from '../types'

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Calculate: undefined
  P1: undefined
  P2: undefined
  P3: undefined
  P4: undefined
  P5: undefined
  P6: undefined
  P7: undefined
  EarlyEEG: undefined
  RegionalSlowing: undefined
  EpileptiformActivity: undefined
  Prediction: NavigatorScreenParams<PredictionTabParamList> & {
    model: Model
    score: number
  }
  Risk: undefined
  RiskInfo: undefined
  CosyInfo: undefined
  BottomTab: NavigatorScreenParams<BottomTabParamList>
  NotFound: undefined
}

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>

export type BottomTabParamList = {
  About: undefined
  Terms: undefined
}

export type PredictionTabParamList = {
  Risk: undefined
  Cosy: undefined
}
