import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, View, Alert } from 'react-native'
import { Input, Icon, Button } from 'react-native-elements';
import { db } from '../firebase';
import * as ImagePicker from 'expo-image-picker';

const AddChatScreen = ({ navigation }) => {
  const [chatname, setChatname] = useState("")

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "CIRCLE",
      headerStyle: { backgroundColor: "#D50000" },
      headerTitleStyle: { color: "white" },
      headerTintColor: "white",
      title: "Add a new chat",
      headerBackTitle: "Cancel",
    });
  }, [navigation])

  const createChat = async () => {
    await db.collection("chats").add({ chatName: chatname, })
      .then(() => {
        navigation.goBack()
      })
      .catch((e) => alert(e))
  }

  const chooseImage = async () => {
    let result = await ImagePicker.launchCameraAsync();
    if (!result.cancelled) {
      this.uploadImage(result.uri, "test-img")
        .then(() => {
          Alert.alert("Image uploaded")
        })
        .catch((e) => {
          Alert.alert(e)
        })
    }
  }

  const uploadImage = async (uri, imageName) => {
    const response = await fetch(uri)
    const blob = await response.blob()
    var ref = db.storage().ref().child("images/" + imageName)
    return ref.put(blob)
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Input placeholder="Chat name" value={chatname} onChangeText={(text) => setChatname(text)} leftIcon={
          <Icon name="wechat" type="antdesign" size={30} color="black" required />
        } onSubmitEditing={createChat} />
        <Button style={styles.button} onPress={chooseImage} title="Choose image" />
      </View>
      <Button disabled={!chatname} style={styles.button} onPress={createChat} title="Create chat" />
    </View>
  )
}

export default AddChatScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    width: 300
  },
  button: {
    width: 200,
    marginTop: 10,
  }
})
