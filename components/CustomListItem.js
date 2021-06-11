import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ListItem, Avatar } from "react-native-elements"

const CustomListItem = () => {
  return (
    <ListItem>
      <Avatar rounded source={{ uri: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.9LeJajtN75YM4qNKou-0ewHaHa%26pid%3DApi&f=1" }} />
    </ListItem>
  )
}

export default CustomListItem

const styles = StyleSheet.create({})
