import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, View, Alert, TouchableOpacity } from 'react-native'
import { Input, Icon, Button, Text } from 'react-native-elements';
import { auth, db } from '../firebase';
import * as ImagePicker from 'expo-image-picker';

const AddChatScreen = ({ navigation }) => {
  const [chatname, setChatname] = useState("")
  const [chatDescription, setChatDescription] = useState("")

  useLayoutEffect(() => {
    navigation.setOptions({
      title: false,
      headerStyle: {
        backgroundColor: "#D50000", height: 115, borderRadius: 30, shadowColor: "#808080",
        shadowOffset: {
          width: 0,
          height: 5
        },
        shadowOpacity: 0.50,
        shadowRadius: 3.5
      },
      headerTitleStyle: { color: "white" },
      headerTintColor: "white",
      headerRight: () => (
        <View style={{ marginRight: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>

        </View>
      ),
      headerLeft: () => (
        <View style={{ marginLeft: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          {/* <TouchableOpacity activeOpacity={0.5} style={{ marginLeft: 5 }}>
            <SimpleLineIcons name="camera" size={24} color="white" />
          </TouchableOpacity> */}
          {/* <TouchableOpacity onPress={() => navigation.navigate("AddChat")} activeOpacity={0.5} style={{ marginLeft: 5 }}>
            <SimpleLineIcons name="plus" size={24} color="white" />
          </TouchableOpacity> */}
          <View>
            <Text style={styles.headerTitle}>CIRCLE</Text>
            <Text style={styles.headerSubtitle}>Add New Circle</Text>
          </View>
        </View>
      ),
    })
  }, [navigation])

  const createChat = async () => {
    await db.collection("chats").add({ chatName: chatname, chatDescription: chatDescription, chatCreator: auth?.currentUser?.displayName, })
      .then(() => {
        navigation.goBack()
      })
      .catch((e) => alert(e))
  }

  const chooseImage = async () => {
    let result = await ImagePicker.launchCameraAsync();
    if (!result.cancelled) {
      uploadImage(result.uri, "test-img")
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
        <View style={styles.inputs}>
          <Icon
            name='circle'
            type='font-awesome'
            color='#D50000'
          />
          <Input
            containerStyle={styles.input}
            placeholder="Circle name"
            value={chatname}
            onChangeText={(text) => setChatname(text)}
            color="#D50000"
            required
          />
        </View>
        <View style={styles.inputs}>
          <Icon
            name='users'
            type='font-awesome'
            color='#D50000'
          />
          <Input
            containerStyle={styles.input}
            placeholder="Description"
            value={chatDescription}
            onChangeText={(text) => setChatDescription(text)}
            onSubmitEditing={createChat}
          />
        </View>
        <View style={styles.inputs}>
          <Icon
            name='user'
            type='font-awesome'
            color='#D50000'
          />
          <Input
            disabled
            containerStyle={styles.input}
            placeholder="Description"
            value={auth?.currentUser?.displayName}
          />
        </View>
        <TouchableOpacity
          style={styles.buttonUploadImage}
          onPress={chooseImage}>
          <Text style={styles.buttonUploadImageText}>
            Upload cover image
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={!chatDescription}
          style={styles.button}
          onPress={createChat}>
          <Text style={styles.buttonText}>
            Create CIRCLE
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.optionBar}>
        <TouchableOpacity style={styles.optionTextContainer} onPress={() => navigation.navigate("Home")}>
          <Icon
            reverse
            size={25}
            name='times'
            type='font-awesome'
            color='#D50000'
          />
        </TouchableOpacity>
      </View>
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
  headerTitle: {
    fontSize: 30,
    fontWeight: "800",
    color: "white"
  },
  headerSubtitle: {
    fontSize: 25,
    fontWeight: "400",
    color: "white"
  },
  inputContainer: {
    width: "80%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: 'center'
  },
  inputs: {
    width: "90%",
    paddingTop: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center'
  },
  input: {
    width: "100%",
    textTransform: 'lowercase',
    display: "flex",
    flexDirection: "row",
    alignItems: 'center'
  },
  buttonUploadImage: {
    marginTop: 20,
    width: 300,
    borderRadius: 50,
    alignItems: "center",
    backgroundColor: "white",
    borderColor: "#D50000",
    borderWidth: 0.25,
  },
  buttonUploadImageText: {
    color: "gray",
    fontSize: 20,
    padding: 15,
    fontWeight: "300"
  },
  button: {
    marginTop: 20,
    width: 200,
    borderRadius: 50,
    alignItems: "center",
    backgroundColor: "#D50000"
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    padding: 15,
    fontWeight: "300"
  },
  creator: {
    textAlign: "center",
    color: "gray"
  },
  optionBar: {
    position: "absolute",
    elevation: 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: 'center',
    bottom: 50,
    left: 20,
    right: 20,
    padding: 10,
    backgroundColor: "transparent",
    height: 50,
    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.50,
    shadowRadius: 3.5
  },
  optionTextContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: 'center'
  },
  optionText: {
    fontWeight: "300",
    color: "#D50000"
  }

})
