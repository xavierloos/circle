import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Input } from 'react-native-elements';

const AddChatScreen = ({ navigation }) => {
  const [chatname,setChatname] = useState("")
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add a new chat",
      headerBackTitle: "Cancel",
    });
  }, [navigation])

  return (
    <View>
      <Text>Add Chat Screen</Text>
      <Input placeholder="Chat name" value={chatname} onChangeText={() => setChatname(chatname)} />
    </View>
  )
}

export default AddChatScreen
const styles = StyleSheet.create({})
