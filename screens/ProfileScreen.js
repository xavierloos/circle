import React, { useLayoutEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-elements'
import { SimpleLineIcons } from "@expo/vector-icons"
import { auth, db } from '../firebase'

const ProfileScreen = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "CIRCLE: Profile",
      headerStyle: { backgroundColor: "#D50000" },
      headerTitleStyle: { color: "white" },
      headerTintColor: "white",
    })
  }, [])

  return (
    <View style={styles.container}>
      {console.log(auth?.currentUser)}
      <Avatar size={100} rounded source={{ uri: auth?.currentUser?.photoURL }} />
      <View style={styles.infoContainer}>
        <SimpleLineIcons name="user" size={20} color="white" style={{ marginRight: 5 }} /><Text style={styles.text}>{auth?.currentUser?.displayName}</Text>
      </View>

      <Text style={styles.text}>{auth?.currentUser?.email}</Text>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: "white"
  },
  infoContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: 'baseline',
    justifyContent: 'center',
  },
  text: {
    fontWeight: "600",
    fontSize: 18,
    marginTop: 20
  },
})
