import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ListItem, Avatar } from "react-native-elements"

const CustomListItem = ({ id, chatName, enterChat }) => {
  const [lastMessage, setLastMessage] = useState([])
  return (
    <ListItem onPress={()=>enterChat(id,chatName)} key={id} bottomDivider>
      <Avatar rounded source={{ uri: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.9LeJajtN75YM4qNKou-0ewHaHa%26pid%3DApi&f=1" }} />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "600" }}>{chatName}</ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail" style={{fontWeight:"400"}}>This is a chat for cooking recipies, please join if you want to learn more.</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  )
}
export default CustomListItem
const styles = StyleSheet.create({})
