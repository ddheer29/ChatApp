import { StyleSheet, Text, View } from 'react-native'
import React, { use, useEffect } from 'react'
import { navigate } from '../utils/NavigationUtil'

const SplashScreen = () => {

  useEffect(() => {
    setTimeout(() => {
      navigate("SetUsernameScreen");
    }, 3000)
  }, [])

  return (
    <View>
      <Text>Chat App</Text>
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({})