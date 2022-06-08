/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react'
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native'

import { Colors } from 'react-native/Libraries/NewAppScreen'
import { Cart, ProgressBar } from './Components'
import DeviceInfo from './Components/DeviceInfo'
import colors from './Config/colors'

const App = () => {
  const isDarkMode = useColorScheme() === 'dark'

  return (
    <SafeAreaView style={styles.fill}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView contentContainerStyle={styles.contentScroll}>
        <DeviceInfo />
        <View style={styles.divider} />
        <Cart />
        <View style={styles.divider} />
        <ProgressBar />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  contentScroll: { padding: 24 },
  fill: { flex: 1 },
  divider: {
    height: 2,
    backgroundColor: colors.neutral[600],
    marginVertical: 20,
  },
})

export default App
