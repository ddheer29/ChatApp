import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from './src/redux/store'
import AppNavigator from './src/navigation/AppNavigator'
import { Colors } from './src/utils/Colors'

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <AppNavigator />
      </SafeAreaView>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})