import React, { useLayoutEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { auth, db } from '../firebase'

const ChatInfoScreen = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "CIRCLE: Info",
      headerStyle: { backgroundColor: "#D50000" },
      headerTitleStyle: { color: "white" },
      headerTintColor: "white",
    }) 
  }, [])
  return (
    <View>
      <Text>Chat information</Text>
    </View>
  )
}
export default ChatInfoScreen
const styles = StyleSheet.create({})
