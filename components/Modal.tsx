import React from 'react'
import {
  Modal as RNModal,
  Pressable,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native'

import Text from './Text'
import { colors, radius } from '../theme'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  footer: React.ReactNode
  children: React.ReactNode
}

const Modal = ({ isOpen, onClose, title, footer, children }: ModalProps) => {
  const { height } = useWindowDimensions()
  return (
    <RNModal
      transparent
      statusBarTranslucent
      navigationBarTranslucent
      animationType="fade"
      visible={isOpen}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Pressable
          accessible={false}
          onPress={onClose}
          style={[StyleSheet.absoluteFill, styles.backdrop]}
        />
        <View
          role="dialog"
          aria-modal
          style={[styles.content, { maxHeight: height - 150 }]}
        >
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
          </View>
          <ScrollView>
            <View style={styles.body}>{children}</View>
          </ScrollView>
          <View style={styles.footer}>{footer}</View>
        </View>
      </View>
    </RNModal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  backdrop: {
    backgroundColor: colors.black,
    opacity: 0.3,
  },
  content: {
    backgroundColor: colors.muted[50],
    borderRadius: radius.lg,
    elevation: 2,
    maxWidth: 380,
    overflow: 'hidden',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    width: '75%',
  },
  header: {
    borderBottomWidth: 1,
    borderColor: colors.muted[300],
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20,
  },
  body: {
    padding: 16,
  },
  footer: {
    borderColor: colors.muted[300],
    borderTopWidth: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    padding: 16,
  },
})

export default Modal
