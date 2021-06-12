import React, { useLayoutEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const AddChatScreen = ({ navigation }) => {

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add a new chat",
      headerBackTitle: "Cancel",
    });
  }, [navigation])

  return (
    <View>
      <Text>Add Chat Screen</Text>
    </View>
  )
}

export default AddChatScreen

const styles = StyleSheet.create({})
