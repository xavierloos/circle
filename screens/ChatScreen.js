import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, View, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native'
import { Text } from "react-native-elements"
import { AntDesign, SimpleLineIcons, Ionicons } from "@expo/vector-icons"
import { auth, db } from '../firebase'
import { Avatar } from 'react-native-elements'
import { ScrollView, TextInput } from 'react-native-gesture-handler'

const ChatScreen = ({ navigation, route }) => {
  const [message, setMessage] = useState("")

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: "#D50000" },
      headerTitleStyle: { color: "#D50000" },
      headerTintColor: "white",
      headerBackTitleVisible: false,
      headerRight: () => (
        <View style={{ marginRight: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Text style={styles.chatTitle}>{route.params.chatName}</Text>
          <TouchableOpacity activeOpacity={0.5} style={{ marginLeft: 5 }}>
            {
              (auth?.currentUser?.photoURL === null) ? <SimpleLineIcons name="user" size={24} color="white" /> : <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
            }
          </TouchableOpacity>
        </View>
      ),
    })
  }, [navigation])

  const sendMessage = () => {

  }

  return (
    <SafeAreaView >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={90}
      >
        <>
          <ScrollView>
            {/* Chats here */}
          </ScrollView>
          <View style={styles.footer}>
            <TextInput style={styles.message} placeholder="Message" value={message} onChangeText={(text) => setMessage(text)} />
            <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
              <Ionicons name="send" type="antdesign" size={30} color="#D50000" required />
            </TouchableOpacity>
          </View>
        </>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default ChatScreen

const styles = StyleSheet.create({
  chatTitle: {
    color: "white",
    fontWeight: 'bold',
    fontSize: 17
  },
  container: {
    display: "flex",
    height: "100%",
    bottom: 0,
  },
  message: {

    height: 40,
    flex: 1,
    marginRight: 15,
    borderColor: "#D50000",
    backgroundColor: "white",
    borderWidth: 1,
    color: "#D50000",
    borderRadius: 50,
    padding: 10
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
  }
})
