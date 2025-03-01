import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { use, useEffect } from 'react'
import { navigate, resetAndNavigate } from '../utils/NavigationUtil'

const SplashScreen = () => {

  useEffect(() => {
    setTimeout(() => {
      resetAndNavigate("SetUsernameScreen");
    }, 700)
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.logoText}>Chat App</Text>
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10
  }
})