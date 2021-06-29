import React, { useEffect, useState } from 'react'
import { StyleSheet, View, } from 'react-native'
import { ListItem, Avatar, Card, Image, Text, Button } from "react-native-elements"
import TouchableScale from 'react-native-touchable-scale'
import { color } from 'react-native-reanimated'
// import { db } from "../firebase"
// const CustomListItem = ({ id, chatName, enterChat }) => {
const CustomListItem = () => {
  const [lastMessage, setLastMessage] = useState([])
  // useEffect(() => {
  //   const unsubscribe = db
  //     .collection("chats")
  //     .doc(id)
  //     .collection("messages")
  //     .orderBy("timestamp", "desc")
  //     .onSnapshot((snapshot) =>
  //       setLastMessage(snapshot.docs.map((doc) => doc.data()))
  //     );
  //   return unsubscribe
  // })

  const messageInfo = `${lastMessage?.[0]?.displayName}: ${lastMessage?.[0]?.message}`
  return (
    // <ListItem key={id} onPress={() => enterChat(id, chatName)} key={id} bottomDivider>
    //   <Avatar rounded source={{ uri: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.9LeJajtN75YM4qNKou-0ewHaHa%26pid%3DApi&f=1" }} />
    //   <ListItem.Content>
    //     <ListItem.Title style={{ fontWeight: "600" }}>{chatName}</ListItem.Title>
    //     <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail" style={{ fontWeight: "400" }}>
    //       {(typeof lastMessage[0]?.displayName === 'undefined') ? 'No messages yet' : "messageInfo"}
    //     </ListItem.Subtitle>
    //   </ListItem.Content>
    // </ListItem>
    <View style={styles.itemsContainer}>
      <View style={styles.card}>
        {/* <View> */}
        <Image
          style={styles.image}
          resizeMode="cover"
          source={{ uri: 'https://miro.medium.com/max/1178/1*rishAJIUgRCz_VzJV-vZuA.png' }}
        />
        <Text h4>Title</Text>
        {/* </View> */}
        <Text>
          <Text style={styles.name}>Javier</Text>
        </Text>
      </View>
      <View style={styles.card}>
        {/* <View> */}
        <Image
          style={styles.image}
          resizeMode="cover"
          source={{ uri: 'https://miro.medium.com/max/1178/1*rishAJIUgRCz_VzJV-vZuA.png' }}
        />
        <Text h4>Title</Text>
        {/* </View> */}
        <Text>
          <Text style={styles.name}>Javier</Text>
        </Text>
      </View>
      <View style={styles.card}>
        {/* <View> */}
        <Image
          style={styles.image}
          resizeMode="cover"
          source={{ uri: 'https://miro.medium.com/max/1178/1*rishAJIUgRCz_VzJV-vZuA.png' }}
        />
        <Text h4>Title</Text>
        {/* </View> */}
        <Text>
          <Text style={styles.name}>Javier</Text>
        </Text>
      </View>
      {/* <ListItem
        Component={TouchableScale}
        friction={90} //
        tension={100} // These props are passed to the parent component (here TouchableScale)
        activeScale={0.95} //
        style={styles.item}>
        <Avatar rounded source={{ uri: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.9LeJajtN75YM4qNKou-0ewHaHa%26pid%3DApi&f=1" }} />
        <ListItem.Content>
          <ListItem.Title style={{ fontWeight: "600" }}>hello</ListItem.Title>
          <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail" style={{ fontWeight: "400" }}>
            description
      </ListItem.Subtitle>
        </ListItem.Content>
        <Button title="Join" />
      </ListItem>
      <ListItem style={styles.item}>
        <Avatar rounded source={{ uri: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.9LeJajtN75YM4qNKou-0ewHaHa%26pid%3DApi&f=1" }} containerStyle={styles.avatar} />
        <ListItem.Content>
          <ListItem.Title style={{ fontWeight: "600" }}>hello</ListItem.Title>
          <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail" style={{ fontWeight: "400" }}>
            description with long description
      </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
      <ListItem style={styles.item}>
        <Avatar rounded source={{ uri: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.9LeJajtN75YM4qNKou-0ewHaHa%26pid%3DApi&f=1" }} containerStyle={styles.avatar} />
        <ListItem.Content>
          <ListItem.Title style={{ fontWeight: "600" }}>hello</ListItem.Title>
          <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail" style={{ fontWeight: "400" }}>
            description with long description
      </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem> */}
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
    // height: 300,
    // paddingRight: 10,
    // paddingLeft: 10
  },
  card: {
    padding: 0,
    display: "flex",
    flexDirection: "column",
    width: 150,
    height: 150,
    borderRadius: 200,
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: 10,
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    backgroundColor: "red",
    color: "white"
  },
  image: {
    width: "100%",
    height: 75,
    borderTopLeftRadius: 200,
    borderTopRightRadius: 200,
    // position: "relative"
  }
})
