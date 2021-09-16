import React, { useLayoutEffect, useState, useEffect } from 'react'
import { ScrollView, StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import CustomListItem from '../components/CustomListItem'
import { StatusBar } from 'expo-status-bar'
import { Avatar } from 'react-native-elements'
import { SimpleLineIcons } from "@expo/vector-icons"
import { auth, db } from '../firebase'

const HomeScreen = ({ navigation }) => {
  const [chats, setChats] = useState([]);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: false,
      headerStyle: { backgroundColor: "#D50000", height: 115 },
      headerTitleStyle: { color: "white" },
      headerTintColor: "white",
      headerRight: () => (
        <View style={{ marginRight: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <TouchableOpacity activeOpacity={0.5} style={{ marginLeft: 5 }} onPress={() => navigation.navigate("Profile")}>
            {
              (auth?.currentUser?.photoURL === null) ? <SimpleLineIcons name="plus" size={24} color="white" /> : <Avatar size={70} rounded source={{ uri: auth?.currentUser?.photoURL }} />
            }
          </TouchableOpacity>
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
            <Text style={styles.headerSubtitle}>Chats</Text>
          </View>
        </View>
      ),
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
    return unsubscribe
  }, [])

  const enterChat = (id, chatName, chatDescription) => {
    navigation.navigate("Chat", {
      id: id,
      chatName: chatName,
      chatDescription: chatDescription,
    })
  }

  return (
    <SafeAreaView>
      <StatusBar style="light" />
      <ScrollView style={styles.container}>
        <View style={styles.items}>
          {chats.map(({ id, data: { chatName, chatDescription } }) => (
            <CustomListItem key={id} id={id} chatName={chatName} chatDescription={chatDescription} enterChat={enterChat} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    height: "100%"
  },
  items: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "flex-end",
    flexWrap: "wrap",
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
  }
})
