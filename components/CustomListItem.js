import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Touchable } from 'react-native'
import { ListItem, Avatar, Card, Image, Text, Button, Icon } from "react-native-elements"
import { TouchableOpacity } from 'react-native-gesture-handler'
import { db } from "../firebase"

const CustomListItem = ({ id, chatName, enterChat }) => {
  const [lastMessage, setLastMessage] = useState([])
  useEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setLastMessage(snapshot.docs.map((doc) => doc.data()))
      );
    return unsubscribe
  })

  const messageInfo = `${lastMessage?.[0]?.displayName}: ${lastMessage?.[0]?.message}`
  return (
    <View style={styles.itemsContainer}>
      <TouchableOpacity activeOpacity={0.5} style={styles.cardTouchable} key={id} onPress={() => enterChat(id, chatName)}>
        <View style={styles.card}>
          <Image style={styles.image} source={{ uri: 'https://miro.medium.com/max/1178/1*rishAJIUgRCz_VzJV-vZuA.png' }} />
          <Text h5 style={styles.title} numberOfLines={1}>{chatName}</Text>
          <Text h6 style={styles.description} numberOfLines={2}>Long long description long description long description long long description</Text>
          <Text h6 style={styles.enter} numberOfLines={1}>Chat now</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}
export default CustomListItem

const styles = StyleSheet.create({
  itemsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "flex-end",
    flexWrap: "wrap",
  },
  cardTouchable: {
    margin: 2
  },
  card: {
    padding: 0,
    display: "flex",
    flexDirection: "column",
    width: 200,
    height: 200,
    borderRadius: 200,
    borderWidth: 4,
    borderColor: "#D50000",
    marginTop: 5,
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    backgroundColor: "#D50000",
    color: "white"
  },
  image: {
    textAlign: "center",
    width: "100%",
    height: 100,
    borderTopLeftRadius: 200,
    borderTopRightRadius: 200,
  },
  title: {
    textAlign: "center",
    textTransform: "uppercase",
    fontWeight:"900",
    color: "white",
    padding: 5
  },
  description: {
    textAlign: "justify",
    color: "white",
    marginRight: 20,
    marginLeft: 20
  },
  enter: {
    textAlign: "center",
    color: "white",
    paddingTop: 5,
  }
})
