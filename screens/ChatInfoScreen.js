import React, { useLayoutEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon } from 'react-native-elements'
import { auth, db } from '../firebase'

const ChatInfoScreen = ({ navigation, route }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "CIRCLE: Info",
      headerStyle: { backgroundColor: "#D50000" },
      headerTitleStyle: { color: "white" },
      headerTintColor: "white",
    })
  }, [])
  return (
    <View>
      <View>
        <Icon style={styles.icon}
          name='user'
          type='font-awesome'
          color='#D50000' /><Text style={styles.text}>{route.params.chatName}</Text>
      </View>
    </View>
  )
}
export default ChatInfoScreen
const styles = StyleSheet.create({})
