import { ReactNode } from 'react'
import { ScrollViewProps } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import Content from './Content'
import ScreenHeader from './ScreenHeader'

interface InfoScreenProps {
  title: string
  children: ReactNode
  style?: ScrollViewProps['style']
  centerTitle?: boolean
  // Back returns to the previous screen instead of Calculate.
  backToPrevious?: boolean
}

const InfoScreen = ({
  title,
  children,
  style,
  centerTitle,
  backToPrevious = false,
}: InfoScreenProps) => {
  const navigation = useNavigation()
  const onBack = () => {
    if (backToPrevious && navigation.canGoBack()) {
      navigation.goBack()
    } else {
      navigation.navigate('Calculate')
    }
  }
  return (
    <>
      <ScreenHeader title={title} onBack={onBack} centerTitle={centerTitle} />
      <Content style={style}>{children}</Content>
    </>
  )
}

export default InfoScreen
