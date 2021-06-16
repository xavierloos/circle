import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const ChatScreen = ({ navigation, route }) => {
  console.log(route.params)
  return (
    <View>
      <Text>{route.params.chatName}</Text>
    </View>
  )
}

export default ChatScreen

const styles = StyleSheet.create({})
