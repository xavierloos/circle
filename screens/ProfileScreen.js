import React, { useLayoutEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const ProfileScreen = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "CIRCLE: Profile",
      headerStyle: { backgroundColor: "#D50000" },
      headerTitleStyle: { color: "white" },
      headerTintColor: "white",
    })
  }, [])

  return (
    <View>
      <Text>Profile screen</Text>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})
