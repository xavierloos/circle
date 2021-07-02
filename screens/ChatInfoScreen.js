import React, { useLayoutEffect, useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon } from 'react-native-elements'
import { auth, db } from '../firebase'

const ChatInfoScreen = ({ navigation, route, id }) => {
  const [chatInfo, setChatInfo] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "CIRCLE: Info",
      headerStyle: { backgroundColor: "#D50000" },
      headerTitleStyle: { color: "white" },
      headerTintColor: "white",
    })
  }, [])

  useLayoutEffect(() => {
    const unsubscribe = db.collection("chats").doc(route.params)
    return unsubscribe
  }, [route])

  const enterChatInfo = (id = route.params, chatCreator) => {
    navigation.navigate("Chat", {
      id: id,
      chatCreator: chatCreator,
    })
  }

  return (
    <View>
      
      {console.log(
        db.collection('chats').doc(route.params).on("value")
      )}
      {console.log(enterChatInfo)}
      <View>
        <Icon style={styles.icon}
          name='user'
          type='font-awesome'
          color='#D50000' /><Text style={styles.text}>{id}</Text>
      </View>
    </View>
  )
}
export default ChatInfoScreen
const styles = StyleSheet.create({})
