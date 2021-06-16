import React, { useLayoutEffect } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Text } from "react-native-elements"
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons"
import { auth, db } from '../firebase'
import { Avatar } from 'react-native-elements'

const ChatScreen = ({ navigation, route }) => {
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
  }, [])
  return (
    <View>
      <Text>{route.params.chatName}</Text>
    </View>
  )
}

export default ChatScreen

const styles = StyleSheet.create({
  chatTitle: {
    color: "white"
  }
})
