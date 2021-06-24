import React, { useLayoutEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-elements'
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
      <Text style={styles.text}>{auth?.currentUser?.displayName}</Text>
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
  text: {
    fontWeight: "600",
    fontSize: 16,
    marginTop: 20
  },
})
