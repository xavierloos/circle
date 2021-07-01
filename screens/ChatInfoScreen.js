import React, { useLayoutEffect, useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon } from 'react-native-elements'
import { auth, db } from '../firebase'

const ChatInfoScreen = ({ navigation, route, chatName }) => {
  const [chats, setChats] = useState([]);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "CIRCLE: Info",
      headerStyle: { backgroundColor: "#D50000" },
      headerTitleStyle: { color: "white" },
      headerTintColor: "white",
    })
  }, [])
  useEffect(() => {
    const unsubscribe = db.collection("chats").onSnapshot((snapshot) =>
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    )

    // return unsubscribe
  }, [])
  return (
    <View>
      {console.log("THIS")}
      {console.log(chatName)}
      {console.log(route)}
      <View>
        <Icon style={styles.icon}
          name='user'
          type='font-awesome'
          color='#D50000' /><Text style={styles.text}>{chatName}</Text>
      </View>
    </View>
  )
}
export default ChatInfoScreen
const styles = StyleSheet.create({})
