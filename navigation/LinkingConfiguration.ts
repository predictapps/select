import { LinkingOptions } from '@react-navigation/native'
import * as Linking from 'expo-linking'

import { RootStackParamList } from './types'

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      Calculate: {
        path: '',
      },
      P1: {
        path: 'severity-of-stroke',
      },
      P2: {
        path: 'large-artery-atherosclerosis',
      },
      P3: {
        path: 'early-seizure',
      },
      P4: {
        path: 'cortical involvement',
      },
      P5: {
        path: 'territory-of-mca-involvement',
      },
      P6: {
        path: 'type-of-early-seizure',
      },
      P7: {
        path: 'day-of-early-seizure',
      },
      EarlyEEG: {
        path: 'early-EEG',
      },
      RegionalSlowing: {
        path: 'regional-slowing',
      },
      EpileptiformActivity: {
        path: 'epileptiform-activity',
      },
      SEEGPhenotypeInfo: {
        path: 'seeg-phenotype',
      },
      Risk: {
        path: 'risk-of-late-seizures',
      },
      Prediction: {
        path: 'prediction/:model/:score',
        screens: {
          Risk: {
            path: 'risk',
          },
          Cosy: {
            path: 'cosy',
          },
          CEEG: {
            path: 'ceeg',
          },
        },
      },
      BottomTab: {
        screens: {
          About: {
            path: 'about',
          },
          Terms: {
            path: 'terms',
          },
        },
      },
      NotFound: '*',
    },
  },
}

export default linking
