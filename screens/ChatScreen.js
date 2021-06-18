import React, { useLayoutEffect, useState, useEffect } from 'react'
import { StyleSheet, View, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, ScrollView, TextInput, Text } from 'react-native'
import { AntDesign, SimpleLineIcons, Ionicons } from "@expo/vector-icons"
import { auth, db } from '../firebase'
import { Avatar } from 'react-native-elements'
import firebase from "firebase"

const ChatScreen = ({ navigation, route }) => {
  const [inputMessage, setInputMessage] = useState("")
  const [messages, setMessages] = useState([])

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
    Keyboard.dismiss()
    db
      .collection("chats")
      .doc(route.params.id)
      .collection("messages")
      .add(
        {
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          message: inputMessage,
          displayName: auth.currentUser.displayName,
          email: auth.currentUser.email,
          photoURL: auth.currentUser.photoURL
        }
      )
    setInputMessage("")
  }

  useLayoutEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .doc(route.params.id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot(snapshot =>
        setMessages(
          snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
          }))
        )
      )
    return unsubscribe
  }, [route])

  return (
    <SafeAreaView >
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container} keyboardVerticalOffset={90} >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <View style={styles.messageContainer}>
              <TextInput style={styles.message} placeholder="Message" value={inputMessage} onChangeText={(text) => setInputMessage(text)} onSubmitEditing={sendMessage} />
              <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                <Ionicons name="send" type="antdesign" size={30} color="#D50000" required />
              </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={{ paddingTop: 15 }}>
              {messages.map(({ id, data }) =>
                data.email === auth.currentUser.email ? (
                  <View key={id} style={styles.receiver}>
                    <Avatar position="absolute" bottom={-15} right={-10} rounded size={40} source={{ uri: data.photoURL }}
                      // WEB
                      containerStyle={{
                        position: "absolute",
                        bottom: -15,
                        right: -10
                      }}
                    />
                    <Text style={styles.receiverText}>{data.message}</Text>
                  </View>
                ) : (

                    <View key={id} style={styles.sender}>
                      <Text style={styles.senderName}>{data.displayName}</Text>
                      <Avatar position="absolute" top={-15} left={-10} rounded size={40} source={{ uri: data.photoURL }}
                        // WEB
                        containerStyle={{
                          position: "absolute",
                          top: -15,
                          left: -10
                        }} />
                      <Text style={styles.senderText}>{data.message}</Text>

                    </View>
                  )
              )}
            </ScrollView>

          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView >
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
    // height: "100%",
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
  receiver: {
    padding: 10,
    borderColor: "#D50000",
    backgroundColor: "white",
    borderWidth: 1.5,
    alignSelf: "flex-end",
    borderRadius: 15,
    marginBottom: 20,
    marginRight: 15,
    maxWidth: "80%",
    position: "relative",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2
  },
  receiverText: {
    color: "red",
    marginRight: 25,
    textAlign: "justify"
  },
  sender: {
    padding: 10,
    backgroundColor: "#D32F2F",
    alignSelf: "flex-start",
    borderRadius: 15,
    marginBottom: 20,
    marginLeft: 15,
    maxWidth: "80%",
    position: "relative"
  },
  senderText: {
    color: "white",
    marginLeft: 25,
    textAlign: "justify"
  },
  senderName: {
    position: "absolute",
    left: 22,
    top: -15,
    paddingLeft: 10,
    fontSize: 10,
    color: "#D32F2F"
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
  }
})
